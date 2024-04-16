require('dotenv').config();
const { MongoClient } = require('mongodb');
const { OpenAIClient, AzureKeyCredential} = require("@azure/openai");

// set up the MongoDB client
const dbClient = new MongoClient(process.env.MONGODB_URI);

async function main() {
    try {
        await dbClient.connect();
        console.log('Connected to MongoDB');
        const db = dbClient.db('legorobot');

        // const searchResults = await vectorSearch(db, 'products', 'What products do you have that are yellow?');    
        // searchResults.forEach(printProductSearchResult);

        //RAG with vector search for the top 3 most relevant products
        // console.log(await ragWithVectorsearch(db, 'legoapi', 'how to pair porta and portd?', 3));
        
        //console.log(await ragWithVectorsearch(db, 'legoapi', 'how to move straight for 90 degrees?', 3));
        //console.log(await ragWithVectorsearch(db, 'legoapi', 'how to turn left?', 3));
        // console.log(await ragWithVectorsearch(db, 'legoapi', 'how to turn left?', 3));
        console.log(await ragWithVectorsearch(db, 'legoapi', 'how to go forward 3 cm?', 3));

    } catch (err) {
        console.error(err);
    } finally {
        await dbClient.close();
        console.log('Disconnected from MongoDB');
    }
}


// set up the Azure OpenAI client 
const embeddingsDeploymentName = "embeddings";
const completionsDeploymentName = "completions";
const aoaiClient = new OpenAIClient(process.env.AOAI_ENDPOINT, 
                    new AzureKeyCredential(process.env.AOAI_KEY));

async function generateEmbeddings(text) {
    const embeddings = await aoaiClient.getEmbeddings(embeddingsDeploymentName, text);
    // Rest period to avoid rate limiting on Azure OpenAI  
    await new Promise(resolve => setTimeout(resolve, 500));
    return embeddings.data[0].embedding;
}

async function addCollectionContentVectorField(db, collectionName) {
    const collection = db.collection(collectionName); 
    const docs = await collection.find({}).toArray();
    const bulkOperations = [];
    console.log(`Generating content vectors for ${docs.length} documents in ${collectionName} collection`);
    for (let i=0; i<docs.length; i++) {
        const doc = docs[i];
        // do not include contentVector field in the content to be embedded
        if ('contentVector' in doc) {
            delete doc['contentVector'];
        }
        const content = JSON.stringify(doc);
        const contentVector = await generateEmbeddings(content);
        bulkOperations.push({
            updateOne: {
                filter: { '_id': doc['_id'] },
                update: { '$set': { 'contentVector': contentVector } },
                upsert: true
            }
        });
        //output progress every 25 documents
        if ((i+1) % 25 === 0 || i === docs.length-1) {          
            console.log(`Generated ${i+1} content vectors of ${docs.length} in the ${collectionName} collection`);
        }
    }
    if (bulkOperations.length > 0) {
        console.log(`Persisting the generated content vectors in the ${collectionName} collection using bulkWrite upserts`);
        await collection.bulkWrite(bulkOperations);
        console.log(`Finished persisting the content vectors to the ${collectionName} collection`);
    }

    //check to see if the vector index already exists on the collection
    console.log(`Checking if vector index exists in the ${collectionName} collection`)
    const vectorIndexExists = await collection.indexExists('VectorSearchIndex');
    if (!vectorIndexExists) {
        await db.command({
            "createIndexes": collectionName,
            "indexes": [
            {
                "name": "VectorSearchIndex",
                "key": {
                "contentVector": "cosmosSearch"
                },
                "cosmosSearchOptions": {                  
                "kind": "vector-ivf",
                "numLists": 1,
                "similarity": "COS",
                "dimensions": 1536
                }
            }
            ]
        });
        console.log(`Created vector index on contentVector field on ${collectionName} collection`);
    }
    else {
        console.log(`Vector index already exists on contentVector field in the ${collectionName} collection`);
    }
}

async function ragWithVectorsearch(db, collectionName, question, numResults=3) {
    //A system prompt describes the responsibilities, instructions, and persona of the AI.
    const systemPrompt = `
        You are a helpful, fun and friendly code assistent for Lego robot
        You are designed to answer questions about Lego python functions and code.
        
        Only answer questions related to the information provided in the list of informations below that are represented
        in JSON format.
        
        If you are asked a question that is not in the list, respond with "I don't know."
        
        List of information:
    `;
    const collection = db.collection(collectionName);
    //generate vector embeddings for the incoming question
    const queryEmbedding = await generateEmbeddings(question);
    //perform vector search and return the results
    results = await vectorSearch(db, collectionName, question, numResults);
    productList = "";
    //remove contentVector from the results, create a string of the results for the prompt
    for (const result of results) {
        delete result['document']['contentVector'];
        productList += JSON.stringify(result['document']) + "\n\n";
    }

    //assemble the prompt for the large language model (LLM)
    const formattedPrompt = systemPrompt + productList;
    //prepare messages for the LLM call, TODO: if message history is desired, add them to this messages array
    const messages = [
        {
            "role": "system",
            "content": formattedPrompt
        },
        {
            "role": "user",
            "content": question
        }
    ];

    //call the Azure OpenAI model to get the completion and return the response
    const completion = await aoaiClient.getChatCompletions(completionsDeploymentName, messages);
    return completion.choices[0].message.content;
}

async function vectorSearch(db, collectionName, query, numResults = 3) {
    const collection = db.collection(collectionName);
    // generate the embedding for incoming question
    const queryEmbedding = await generateEmbeddings(query);
    
    const pipeline = [
        {
            '$search': {
                "cosmosSearch": {
                    "vector": queryEmbedding,
                    "path": "contentVector",
                    "k": numResults
                },
                "returnStoredSource": true
            }
        },
        { '$project': { 'similarityScore': { '$meta': 'searchScore' }, 'document': '$$ROOT' } }
    ];
    
    //perform vector search and return the results as an array
    const results = await collection.aggregate(pipeline).toArray();
    return results;
}

function printProductSearchResult(result) {  
    // Print the search result document in a readable format  
    console.log(`Similarity Score: ${result['similarityScore']}`);  
    console.log(`Name: ${result['document']['name']}`);  
    console.log(`Category: ${result['document']['categoryName']}`);  
    console.log(`SKU: ${result['document']['sku']}`);  
    console.log(`_id: ${result['document']['_id']}\n`);  
}

main().catch(console.error);