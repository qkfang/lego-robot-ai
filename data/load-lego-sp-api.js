require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

async function main() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('legoaichat');

        // legoapi

        // Read data from lego-sp-api.json
        const data = fs.readFileSync('./doc/lego-sp-api.json', 'utf8');
        const specJson = JSON.parse(data);
        
        const newJsonList = [];
        specJson.forEach(module => {
            module.SubModules.forEach(submodule => {
                submodule.Functions.forEach(func => {
                    const newJsonObject = {
                        Module_Name: module.Module_Name,
                        Module_Description: module.Module_Description,
                        SubModule_Name: submodule.SubModule_Name,
                        SubModule_Description: submodule.SubModule_Description,
                        Function_Name: func.name,
                        Function: func,
                    };
                    newJsonList.push(newJsonObject);
                });
            });
        });
        

        const newJsonString = JSON.stringify(newJsonList, null, 2);
        console.log(newJsonString);

        const legoapis = db.collection('lego_sp_api');
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