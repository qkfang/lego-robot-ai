const express = require('express');
const cors = require('cors')
var multer  = require('multer'); 
const upload = multer({ dest: 'uploads/' })
const swagger = require('./swagger');
const legoAgent = require('./lego_robot/lego_robot_ai_agent');
const taskApi = require('./lego_robot/lego_robot_task_api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: "1821462",
  key: "f1586bf9908b2073cda6",
  secret: "a3d4276606cc1d157ce8",
  cluster: "us2",
  encrypted  : true,
});
const channel = 'tasks';



const app = express();
app.use(express.json());
app.use(cors()); // enable all CORS requests
app.use(multer({dest:__dirname+'\\uploads\\'}).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', taskApi);

let agentInstancesMap = new Map();

app.get('/', (req, res) => {
    res.send({ "status": "ready" });
});

app.post('/chat', async (req, res) => {
    let agent = {};
    let prompt = req.body.prompt;
    let session_id = req.body.session_id;

    if (agentInstancesMap.has(session_id)) {
        agent = agentInstancesMap.get(session_id);
    } else {
        agent = new legoAgent();
        agentInstancesMap.set(session_id, agent);
    }

    let result = await agent.executeAgent(prompt);
    res.send({ message: result });
});

app.post('/image', async (req, res) => {
    // console.log(req)
    let agent = {};

    agent = new legoAgent();
    let result = await agent.getVector(req.files[0].path);
    res.send({ message: result });
});

swagger(app)


// parse out hosting port from cmd arguments if passed in
// otherwise default to port 4242
var port = (() => {
    const { argv } = require('node:process');
    var port = 4242; // default
    if (argv){
        argv.forEach((v, i) => {
            if (v && (v.toLowerCase().startsWith('port=')))
            {
                port = v.substring(5);
            }
        });
    }
    return port;
})();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

mongoose.connect(process.env.AZURE_COSMOSDB_RU_CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    
    const taskCollection = db.collection('tasks');
    const changeStream = taskCollection.watch(
      [
          { 
              $match: { 
                  $and: [
                      { "operationType": { $in: ["insert", "update", "replace"] } }
                  ]
              }
          },
          { $project: { "_id": 1, "fullDocument": 1, "ns": 1, "documentKey": 1} }
      ],
      { fullDocument: "updateLookup" });
  
      
    changeStream.on('change', (change) => {
      console.log(change);
        
      // if(change.operationType === 'insert') {
        console.log('push insert');
        const task = change.fullDocument;
        pusher.trigger(
          channel,
          'inserted', 
          {
            id: task._id,
            task: task.task,
          }
        ); 
      // } else if(change.operationType === 'delete') {
      //   console.log('push change');
      //   pusher.trigger(
      //     channel,
      //     'deleted', 
      //     change.documentKey._id
      //   );
      // }
    });
})  