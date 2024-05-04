require('dotenv').config();
const { MongoClient } = require('mongodb');
const { AgentExecutor } = require("langchain/agents");
const { OpenAIFunctionsAgentOutputParser } = require("langchain/agents/openai/output_parser");
const { formatToOpenAIFunctionMessages } = require("langchain/agents/format_scratchpad");
const { DynamicTool } = require("@langchain/core/tools");
const { RunnableSequence } = require("@langchain/core/runnables");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const { MessagesPlaceholder, ChatPromptTemplate } = require("@langchain/core/prompts");
const { convertToOpenAIFunction } = require("@langchain/core/utils/function_calling");
const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
const { AzureCosmosDBVectorStore } = require("@langchain/community/vectorstores/azure_cosmosdb");
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const fs = require('node:fs');

class CosmicWorksAIAgent {
    constructor() {
        // set up the MongoDB client
        this.dbClient = new MongoClient(process.env.AZURE_COSMOSDB_CONNECTION_STRING);
        // set up the Azure Cosmos DB vector store
        const azureCosmosDBConfigApi = {
            client: this.dbClient,
            databaseName: "legorobot",
            collectionName: "legoapi",
            indexName: "VectorSearchIndex",
            embeddingKey: "contentVector",
            textKey: "_id"
        }
        this.vectorStoreApi = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigApi);

        const azureCosmosDBConfigSnippet = {
            client: this.dbClient,
            databaseName: "legorobot",
            collectionName: "legosnippet",
            indexName: "VectorSearchIndex",
            embeddingKey: "contentVector",
            textKey: "_id"
        }
        this.vectorStoreSnippet = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigSnippet);


        const azureCosmosDBConfigInfo = {
            client: this.dbClient,
            databaseName: "legorobot",
            collectionName: "legoinfo",
            indexName: "VectorSearchIndex",
            embeddingKey: "contentVector",
            textKey: "_id"
        }
        this.vectorStoreInfo = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigInfo);

        
        const azureCosmosDBConfigImage = {
            client: this.dbClient,
            databaseName: "legorobot",
            collectionName: "legoimage",
            indexName: "VectorSearchIndex",
            embeddingKey: "contentVector",
            textKey: "_id"
        }
        this.vectorStoreImage = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigImage);



        // set up the OpenAI chat model
        // https://js.langchain.com/docs/integrations/chat/azure
        this.chatModel = new ChatOpenAI({
            temperature: 0,
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
            azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
            azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
        });

        // initialize the chat history
        this.chatHistory = [];

        // initialize the agent executor
        (async () => {
            this.agentExecutor = await this.buildAgentExecutor();
        })();
    }

    async formatDocuments(docs) {
        // Prepares the product list for the system prompt.  
        let strDocs = "";
        for (let index = 0; index < docs.length; index++) {
            let doc = docs[index];
            let docFormatted = { "_id": doc.pageContent };
            Object.assign(docFormatted, doc.metadata);

            // Build the product document without the contentVector and tags
            if ("contentVector" in docFormatted) {
                delete docFormatted["contentVector"];
            }
            if ("tags" in docFormatted) {
                delete docFormatted["tags"];
            }

            // Add the formatted product document to the list
            strDocs += JSON.stringify(docFormatted, null, '\t');

            // Add a comma and newline after each item except the last
            if (index < docs.length - 1) {
                strDocs += ",\n";
            }
        }
        // Add two newlines after the last item
        strDocs += "\n\n";
        return strDocs;
    }

    async buildAgentExecutor() {
        // A system prompt describes the responsibilities, instructions, and persona of the AI.
        // Note the variable placeholders for the list of products and the incoming question are not included.
        // An agent system prompt contains only the persona and instructions for the AI.
        const systemMessage = `
            You are a helpful, fun and friendly code assistent for Lego robot. You are designed to answer questions about Lego Spike Prime 3 and write python code functions for Spke Prime 3.
            Only answer questions related to the information provided in the list below that are represented in JSON format.
            If you are writing python code blow, ALWAYS include async def main() and runloop.run(main()) in python code.
            Never use pybrick library or ev3 library.
            Do not output more than 2 code block in one answer.
            If you are asked a question that is not in the list, respond with "I don't know."
            List of information:     
        `;
        // Create vector store retriever chain to retrieve documents and formats them as a string for the prompt.
        const retrieverChainApi = this.vectorStoreApi.asRetriever().pipe(this.formatDocuments);
        const retrieverChainSnippet = this.vectorStoreSnippet.asRetriever().pipe(this.formatDocuments);
        const retrieverChainInfo = this.vectorStoreInfo.asRetriever().pipe(this.formatDocuments);

        // Define tools for the agent can use, the description is important this is what the AI will 
        // use to decide which tool to use.

        // A tool that retrieves product information from Cosmic Works based on the user's question.
        const legoApiRetrieverTool = new DynamicTool({
            name: "api_retriever_tool",
            description: `Must always use this tool for any python code request. Searches Lego python API information for similar python function definitions based on the question. 
                    Returns the python function API information in JSON format.`,
            func: async (input) => await retrieverChainApi.invoke(input),
            verbose: true
        });

        const legoSnippetRetrieverTool = new DynamicTool({
            name: "snippet_lookup_tool",
            description: `Must always use this tool for any python code. Searches Lego python code examples for similar python function definitions based on the question. Returns the python code blocks in JSON format.`,
            func: async (input) => await retrieverChainSnippet.invoke(input),
            verbose: true
        });

        const legoInfoRetrieverTool = new DynamicTool({
            name: "info_lookup_tool",
            description: `Searches information about Lego robot based on the question. Returns general information about Lego related details in JSON format.`,
            func: async (input) => await retrieverChainInfo.invoke(input),
            verbose: true
        });

        // A tool that will lookup a product by its SKU. Note that this is not a vector store lookup.
        // const productLookupTool = new DynamicTool({
        //     name: "snippet_lookup_tool",
        //     description: `Searches Lego python code sample information for required robot actions.
        //             Returns an example code snippet in JSON format.`,
        //     func: async (input) => {
        //         const db = this.dbClient.db("cosmic_works");
        //         const products = db.collection("products");
        //         const doc = await products.findOne({ "sku": input });
        //         if (doc) {
        //             //remove the contentVector property to save on tokens
        //             delete doc.contentVector;
        //         }
        //         return doc ? JSON.stringify(doc, null, '\t') : null;
        //     },
        // });

        // Generate OpenAI function metadata to provide to the LLM
        // The LLM will use this metadata to decide which tool to use based on the description.
        const tools = [legoApiRetrieverTool, legoSnippetRetrieverTool, legoInfoRetrieverTool];
        const modelWithFunctions = this.chatModel.bind({
            functions: tools.map((tool) => convertToOpenAIFunction(tool)),
        });

        // OpenAI function calling is fine-tuned for tool using therefore you don't need to provide instruction.
        // All that is required is that there be two variables: `input` and `agent_scratchpad`.
        // Input represents the user prompt and agent_scratchpad acts as a log of tool invocations and outputs.
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemMessage],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
            new MessagesPlaceholder("agent_scratchpad")
        ]);

        // Define the agent and executor
        // An agent is a type of chain that reasons over the input prompt and has the ability
        // to decide which function(s) (tools) to use and parses the output of the functions.
        const runnableAgent = RunnableSequence.from([
            {
                input: (i) => i.input,
                agent_scratchpad: (i) => formatToOpenAIFunctionMessages(i.steps),
                chat_history: (i) => i.chat_history
            },
            prompt,
            modelWithFunctions,
            new OpenAIFunctionsAgentOutputParser(),
        ]);

        // An agent executor can be thought of as a runtime, it orchestrates the actions of the agent
        // until completed. This can be the result of a single or multiple actions (one can feed into the next).
        // Note: If you wish to see verbose output of the tool usage of the agent, 
        //       set returnIntermediateSteps to true
        const executor = AgentExecutor.fromAgentAndTools({
            agent: runnableAgent,
            tools,
            returnIntermediateSteps: true,
            verbose: true
        });

        return executor;
    }

    // Helper function that executes the agent with user input and returns the string output
    async executeAgent(input) {
        let returnValue = "";
        try {
            await this.dbClient.connect();
            // Invoke the agent with the user input
            const result = await this.agentExecutor.invoke({ input: input, chat_history: this.chatHistory });

            this.chatHistory.push(new HumanMessage(input));
            this.chatHistory.push(new AIMessage(result.output));

            // Output the intermediate steps of the agent if returnIntermediateSteps is set to true
            if (this.agentExecutor.returnIntermediateSteps) {
                console.log(JSON.stringify(result.intermediateSteps, null, 2));
            }
            // Return the final response from the agent
            returnValue = result.output;
        } finally {
            await this.dbClient.close();
        }
        return returnValue;
    }


    async getVector() {
        let vectorDocs = [];

        // const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
        // const embeddings = await client.getEmbeddings(deploymentName, prompt);

        const content = fs.readFileSync('/usr/src/app/cosmic_works/85-6541.png');
        var vector = '';
        await fetch("https://eastus.api.cognitive.microsoft.com/computervision/retrieval:vectorizeImage?api-version=2023-02-01-preview&modelVersion=latest", {
            method: 'POST',
            body: content,
            headers: {'Content-Type': 'application/octet-stream', "Ocp-Apim-Subscription-Key": "8cef4d9630194f16a6d95ca27ce23a9a"} })
            .then((result) => result.text())
            .then((data) => {
                vector = JSON.parse(data)
                // string `{"text":"hello world"}`
            })
   
        //  // search for similar products
        //  const vectorDocsWithScore = await this.vectorStoreImage.similaritySearchWithScore(
        //     vector.vector,
        //     2
        // );

        // // filter by scoreLimit
        // for (let [doc, score] of vectorDocsWithScore) {
        //     if (score <= 1) {
        //         doc['similarityScore'] = score;
        //         vectorDocs.push(doc);
        //     }
        // }

            
        this.client = new MongoClient(process.env.AZURE_COSMOSDB_CONNECTION_STRING);
        await this.client.connect();
        
        const db = this.client.db("legorobot"); 
        const collection = db.collection("legoimage"); 
        console.log(vector.vector); 
        // Query for similar documents.
        const documents = collection.aggregate([{"$search": {"cosmosSearch": {"vector": vector.vector,"path": "vector","k": 2},
        "returnStoredSource": "true" }}
        ,{"$project": {"image_file":1,"author":1,"title":1,"vector":1,"description":1}
         }]);      
        
         
        await documents.forEach(doc => console.log(doc)); 
        return '';
    };

};


module.exports = CosmicWorksAIAgent;
