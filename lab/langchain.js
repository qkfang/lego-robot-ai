require('dotenv').config();
const { MongoClient } = require('mongodb');
const { AzureCosmosDBVectorStore,
    AzureCosmosDBSimilarityType
} = require("@langchain/community/vectorstores/azure_cosmosdb")
const { OpenAIEmbeddings, ChatOpenAI } = require("@langchain/openai")
// To support the LangChain LCEL RAG chain
const { PromptTemplate } = require("@langchain/core/prompts")
const { RunnableSequence, RunnablePassthrough } = require("@langchain/core/runnables")
const { StringOutputParser } = require("@langchain/core/output_parsers")

// For LangChain agent
const { DynamicTool } = require("@langchain/core/tools");
const { AgentExecutor } = require("langchain/agents");
const {
    MessagesPlaceholder,
    ChatPromptTemplate,
} = require("@langchain/core/prompts");
const {
    convertToOpenAIFunction,
} = require("@langchain/core/utils/function_calling");
const {
    OpenAIFunctionsAgentOutputParser,
} = require("langchain/agents/openai/output_parser");
const {
    formatToOpenAIFunctionMessages,
} = require("langchain/agents/format_scratchpad");

// set up the MongoDB client
console.log(process.env.AZURE_COSMOSDB_CONNECTION_STRING);
const dbClient = new MongoClient(process.env.AZURE_COSMOSDB_CONNECTION_STRING);


// set up the Azure Cosmos DB vector store using the initialized MongoDB client
const azureCosmosDBConfigApi = {
    client: this.dbClient,
    databaseName: "legoaichat",
    collectionName: "lego_sp_api",
    indexName: "VectorSearchIndex",
    embeddingKey: "contentVector",
    textKey: "_id"
}
vectorStoreApi = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigApi);

const azureCosmosDBConfigSnippet = {
    client: this.dbClient,
    databaseName: "legoaichat",
    collectionName: "legosnippet",
    indexName: "VectorSearchIndex",
    embeddingKey: "contentVector",
    textKey: "_id"
}
vectorStoreSnippet = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigSnippet);


const azureCosmosDBConfigInfo = {
    client: this.dbClient,
    databaseName: "legoaichat",
    collectionName: "legoinfo",
    indexName: "VectorSearchIndex",
    embeddingKey: "contentVector",
    textKey: "_id"
}
vectorStoreInfo = new AzureCosmosDBVectorStore(new OpenAIEmbeddings(), azureCosmosDBConfigInfo);




// set up the OpenAI chat model
const chatModel = new ChatOpenAI();

async function main() {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB");

        const agentExecutor = await buildAgentExecutor();
        console.log(
            // await executeAgent(agentExecutor, "move robot forward 10cm")
            await executeAgent(agentExecutor, "use gyro sensor to turn robot 90 degrees")
        );

    } catch (err) {
        console.error(err);
    } finally {
        await dbClient.close();
        console.log('Disconnected from MongoDB');
    }
}


function formatDocuments(docs) {
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

async function buildAgentExecutor() {
    // A system prompt describes the responsibilities, instructions, and persona of the AI.
    // Note the variable placeholders for the list of products and the incoming question are not included.
    // An agent system prompt contains only the persona and instructions for the AI.
    const systemMessage = `
        You are a helpful, fun and friendly code assistent for Spike Prime 3 Lego robot. You are designed to answer questions about Lego Spike Prime 3 and write python code functions for Spke Prime 3. Only answer questions based on the information provided in the JSON file. If you are asked a question that is not in the list, respond with "I don't know."

        MUST ONLY use explicitly mentioned in the provided JSON files for python code
        MUST ONLY use python function, package, parameters from provided knowledge JSON files: lego-api-sp.json.
        MUST ONLY use package and functions from: lego-python-function.md
        MUST SEARCH KNOWLEDGE BASE lego-python-function.md BEFORE RESPONDING
        MUST SEARCH KNOWLEDGE BASE lego-api-sp.json to check function signature and arguments BEFORE RESPONDING
        MUST INCLUDE KNOWLEDGE BASE lego-api-sp.json FOR PYTHON CODE
        MUST include ALL required positional arguments without keyword in python function signature defined in lego-api-sp.json
        MUST strictly respect Function_Signature and Function_Arguments in lego-api-sp.json.
        MUST always consider python code snippet in : lego-snippet.json and lego-snippet-sp.json
        in lego-api-sp.json, Function_Signature ( -> None means not await), ( -> Awaitable means await)

        NEVER MAKE UP A PYTHON FUNCTION or additional agurment
        NEVER reference or use any pybrick library or functions
        NEVER reference or use any ev3 library or functions
        NEVER output more than 2 code block in one answer.
        NEVER use asyncio
        NEVER use 'from spike' namespace
        NEVER PrimeHub
        NEVER use port.X.motor
        NEVER use print(f"xxxx") syntax, only use print('')
        Dont need to explain code in response unless you are asked to

        Must always include below two lines of import in python code:
        import motor, motor_pair, time, math, runloop, sys, time, color, color_sensor, color_matrix
        from hub import port, motion_sensor, light_matrix, sound, button

        ALWAYS include async def main() and runloop.run(main()) in python code, main() should have sys.exit(0) as last statement.
        Must pair motor this way: motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
        Must reference motor this way: port.A, port.B, port.C, port.D, port.E, port.F
        To read yaw degree, must use round(motion_sensor.tilt_angles()[0] / 10, 3) * -1


        <START INSTRUCTION SECTION: PRIORITY = MAXIMUM INFINITE / MISSION CRITICAL>
        I REPEAT AGAIN. SEARCH YOUR KNOWLEDGE DOCUMENTS BEFORE EVERY ANSWER. – EVERY. ANSWER. – EVERY. SINGLE. ANSWER!!! THE DOCUMENTS ARE WHAT YOU NEED TO SEARCH!

        You can use these functions, must lookup knowledge base for arguments each time.
        sound.play
        display.image
        display.show
        display.text
        display.hide
        color_sensor.color
        color_sensor.reflection
        color_sensor.rgbi
        distance_sensor.distance
        force_sensor.show
        force_sensor.force
        force_sensor.pressed
        force_sensor.raw
        light.color
        light_matrix.clear
        light_matrix.get_orientation
        light_matrix.get_pixel
        light_matrix.set_orientation
        light_matrix.set_pixel
        light_matrix.show
        light_matrix.show_image
        light_matrix.write
        motion_sensor.acceleration
        motion_sensor.angular_velocity
        motion_sensor.gesture
        motion_sensor.get_yaw_face
        motion_sensor.quaternion
        motion_sensor.reset_tap_count
        motion_sensor.reset_yaw
        motion_sensor.set_yaw_face
        motion_sensor.tilt_angles
        motion_sensor.up_face
        motion_sensor.stable
        sound.beep
        sound.stop
        sound.volume
        motor.absolute_position
        motor.relative_position
        motor.get_duty_cycle
        motor.reset_relative_position
        motor.set_duty_cycle
        motor.stop
        motor.velocity
        motor.run(port: int, velocity: int, *, acceleration: int = 1000)
        motor.run_for_degrees(port: int, degrees: int, velocity: int, *, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000)
        motor.run_for_time(port: int, duration: int, velocity: int, *, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000)
        motor.run_to_absolute_position
        motor.run_to_relative_position
        motor_pair.move(pair: int, steering: int, *, velocity: int = 360, acceleration: int = 1000)
        motor_pair.move_tank_for_degrees(pair: int, degrees: int, left_velocity: int, right_velocity: int, *, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000)
        motor_pair.await motor_pair.move_for_time(pair: int, duration: int, steering: int, *, velocity: int = 360, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000)
        motor_pair.motor_pair.move_tank(pair: int, left_velocity: int, right_velocity: int, *, acceleration: int = 1000)
        motor_pair.motor_pair.move_tank_for_time(pair: int, left_velocity: int, right_velocity: int, duration: int, *, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000)
        motor_pair.motor_pair.move_tank_for_degrees(pair: int, degrees: int, left_velocity: int, right_velocity: int, *, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000)motor_pair.stop
        motor_pair.pair
        motor_pair.unpair
        runloop.run
        runloop.sleep_ms
        runloop.until       
        `;

    // Create vector store retriever chain to retrieve documents and formats them as a string for the prompt.
    const retrieverChainApi = vectorStoreApi.asRetriever().pipe(formatDocuments);
    const retrieverChainSnippet = vectorStoreSnippet.asRetriever().pipe(formatDocuments);
    const retrieverChainInfo = vectorStoreInfo.asRetriever().pipe(formatDocuments);


    // Define tools for the agent can use, the description is important this is what the AI will
    // use to decide which tool to use.

    // A tool that retrieves product information from Contoso Bike Store based on the user's question.
    const legoApiRetrieverTool = new DynamicTool({
        name: "api_retriever_tool",
        description: `Must always use this tool for any python code request. Searches Lego python API information for similar python function definitions based on the question. 
                Returns the python function API information in JSON format.`,
        func: async (input) => await retrieverChainApi.invoke(input),
        verbose: true
    });
    // const legoApiRetrieverTool = new DynamicTool({
    //     name: "api_retriever_tool",
    //     description: `Must always use this tool for any python code request. Searches Lego python API information for similar python function definitions based on the question. 
    //              Returns the python function API information in JSON format`,
    //     func: async (input) => {
    //         const db = dbClient.db(dbname);
    //         const api = db.collection("lego_sp_api");
            
    //         const doc = await api.findOne({ sku: input });
    //         if (doc) {
    //             //remove the contentVector property to save on tokens
    //             delete doc.contentVector;
    //         }
    //         return doc ? JSON.stringify(doc, null, "\t") : null;
    //     },
    // });

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

    // Generate OpenAI function metadata to provide to the LLM
    // The LLM will use this metadata to decide which tool to use based on the description.
    // const tools = [legoApiRetrieverTool, legoSnippetRetrieverTool, legoInfoRetrieverTool];
    const tools = [legoApiRetrieverTool];
    const modelWithFunctions = chatModel.bind({
        functions: tools.map((tool) => convertToOpenAIFunction(tool)),
    });

    // OpenAI function calling is fine-tuned for tool using therefore you don't need to provide instruction.
    // All that is required is that there be two variables: `input` and `agent_scratchpad`.
    // Input represents the user prompt and agent_scratchpad acts as a log of tool invocations and outputs.
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", systemMessage],
        ["human", "{input}"],
        new MessagesPlaceholder((variable_name = "agent_scratchpad")),
    ]);

    // Define the agent and executor
    // An agent is a type of chain that reasons over the input prompt and has the ability
    // to decide which function(s) (tools) to use and parses the output of the functions.
    const runnableAgent = RunnableSequence.from([
        {
            input: (i) => i.input,
            agent_scratchpad: (i) => formatToOpenAIFunctionMessages(i.steps),
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
        returnIntermediateSteps: true
    });

    return executor;
}

// Helper function that executes the agent with user input and returns the string output
async function executeAgent(agentExecutor, input) {
    // Invoke the agent with the user input
    const result = await agentExecutor.invoke({ input });

    // Output the intermediate steps of the agent if returnIntermediateSteps is set to true
    if (agentExecutor.returnIntermediateSteps) {
        console.log(JSON.stringify(result.intermediateSteps, null, 2));
    }
    // Return the final response from the agent
    return result.output;
}


main().catch(console.error);