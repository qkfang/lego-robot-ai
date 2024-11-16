require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);


async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('legoaichat');

        // legoapi

        // Read data from lego-sp-api.json
        const data = fs.readFileSync('./doc/lego-sp-doc.json', 'utf8');
        const specJson = JSON.parse(data);
        
        const newJsonList = [];
        specJson.forEach(doc => {
            const newJsonObject = {
                text: doc.text
            };
            newJsonList.push(newJsonObject);
        });
        

        const newJsonString = JSON.stringify(newJsonList, null, 2);
        console.log(newJsonString);

        const legoapis = db.collection('lego_sp_doc');
        await legoapis.deleteMany({});

        const result = await legoapis.bulkWrite(
            newJsonList.map((api) => ({
                insertOne: {
                    document: api
                }
            }))
        );
        console.log("legoapis result:", result);


    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}


main().catch(console.error);