import os
from dotenv import load_dotenv
from pymongo import MongoClient
from ast import literal_eval
import pandas as pd

# Constants
IMAGE_FILE_COLUMN_NAME = "image_file"
DESCRIPTION_COLUMN_NAME = "description"
AUTHOR_COLUMN_NAME = "author"
TITLE_COLUMN_NAME = "title"
TECHNIQUE_COLUMN_NAME = "technique"
TYPE_COLUMN_NAME = "type"
TIMEFRAME_COLUMN_NAME = "timeframe"
VECTOR_COLUMN_NAME = "vector"

# Directories
current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(current_dir)

# Load environment file
load_dotenv(os.path.join(parent_dir, ".env"), override=True)

# MongoDB credentials
mongo_host = "mongodb+srv://<mongoDbUserName>:<mongoDbPassword>@legorobot-mongo.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000&tlsInsecure=true" #os.getenv("MONGO_HOST")
mongo_user = "<mongoDbUserName>" #os.getenv("MONGO_USER")
mongo_password = "<mongoDbPassword>" #os.getenv("MONGO_PASSWORD")
mongo_database_name = "legorobot" #os.getenv("MONGO_DB_NAME")
collection_name = "legoimage" #os.getenv("MONGO_COLLECTION_NAME")

# Dataset's folder
dataset_folder = os.path.join(parent_dir, "dataset")
dataset_filepath = os.path.join(dataset_folder, "dataset_embeddings.csv")


def main():
    # Connect to MongoDB
    client = MongoClient(host=mongo_host)
    db = client[mongo_database_name]
    collection = db['exampleCollection']

    # # Drop collection if exists
    collection.drop()

    # Prepare data
    docs = [
        {
            "name": "Eugenia Lopez", 
            "bio": "Eugenia is the CEO of AdvenureWorks.", 
            "vectorContent": [0.51, 0.12, 0.23],
        },
        {
            "name": "Cameron Baker", 
            "bio": "Cameron Baker CFO of AdvenureWorks.", 
            "vectorContent": [0.55, 0.89, 0.44],
        },
        {
            "name": "Jessie Irwin", 
            "bio": "Jessie Irwin is the former CEO of AdventureWorks and now the director of the Our Planet initiative.", 
            "vectorContent": [0.13, 0.92, 0.85],
        },
        {
            "name": "Rory Nguyen", 
            "bio": "Rory Nguyen is the founder of AdventureWorks and the president of the Our Planet initiative.", 
            "vectorContent": [0.91, 0.76, 0.83],
        },
                {
            "name": "Eugenia Lopez", 
            "bio": "Eugenia is the CEO of AdvenureWorks.", 
            "vectorContent": [0.51, 0.12, 0.23],
        },
        {
            "name": "Cameron Baker", 
            "bio": "Cameron Baker CFO of AdvenureWorks.", 
            "vectorContent": [0.55, 0.89, 0.44],
        },
        {
            "name": "Jessie Irwin", 
            "bio": "Jessie Irwin is the former CEO of AdventureWorks and now the director of the Our Planet initiative.", 
            "vectorContent": [0.13, 0.92, 0.85],
        },
        {
            "name": "Rory Nguyen", 
            "bio": "Rory Nguyen is the founder of AdventureWorks and the president of the Our Planet initiative.", 
            "vectorContent": [0.91, 0.76, 0.83],
        },
                {
            "name": "Eugenia Lopez", 
            "bio": "Eugenia is the CEO of AdvenureWorks.", 
            "vectorContent": [0.51, 0.12, 0.23],
        },
        {
            "name": "Cameron Baker", 
            "bio": "Cameron Baker CFO of AdvenureWorks.", 
            "vectorContent": [0.55, 0.89, 0.44],
        },
        {
            "name": "Jessie Irwin", 
            "bio": "Jessie Irwin is the former CEO of AdventureWorks and now the director of the Our Planet initiative.", 
            "vectorContent": [0.13, 0.92, 0.85],
        },
        {
            "name": "Rory Nguyen", 
            "bio": "Rory Nguyen is the founder of AdventureWorks and the president of the Our Planet initiative.", 
            "vectorContent": [0.91, 0.76, 0.83],
        },
    ]

    # Insert
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)
    result = collection.insert_many(docs)

    db.command({
    'createIndexes': 'exampleCollection',
    'indexes': [
        {
        'name': 'vsexample',
        'key': {
            "vectorContent": "cosmosSearch"
        },
        'cosmosSearchOptions': {
            'kind': 'vector-ivf',
            'numLists': 100,
            'similarity': 'COS',
            'dimensions': 3
        }
        }
    ]
    })


    # Define the query vector
    queryVector = [-0.52, 0.28, 0.12]

    # Define the aggregate query
    query = [
        {
            "$search": {
                "cosmosSearch": {
                    "vector": queryVector,
                    "path": "vectorContent",
                    "k": 3
                },
                "returnStoredSource": True
            }
        }
    ]

    # Execute the aggregate query
    results = collection.aggregate(query)

    # Print the results
    for result in results:
        print(result)

        
    # print("Saving data to MongoDB...")
    # from ast import literal_eval
    # data = pd.read_csv(dataset_filepath,index_col=False,sep='\t')
    # #data = data.drop('Unnamed: 0', axis=1)
    # data.vector = data.vector.apply(literal_eval)

    # for i in range(len(data)):
    #     doc_to_upload = data.loc[i].to_dict()
    #     collection.insert_one(doc_to_upload)
        
    # #print("Document", i , "inserted successfully.")

    # # Fetch all documents from collection
    # num_records = collection.count_documents({})
    # print(f"Number of records in the collection: {num_records}")

    # db.command({
    #     'createIndexes': 'legoimage',
    #     'indexes': [
    #         {
    #         'name': 'vsearch_image',
    #         'key': {
    #             "vector": "cosmosSearch"
    #         },
    #         'cosmosSearchOptions': {
    #             'kind': 'vector-ivf',
    #             'numLists': 800,
    #             'similarity': 'COS',
    #             'dimensions': 1024
    #         }
    #         }
    #     ]
    #     })


    print("Done!")

if __name__ == "__main__":
    main()

