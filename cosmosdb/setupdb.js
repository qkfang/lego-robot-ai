require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('legorobot');

        // legoapi
        {
            const legoapis = db.collection('legoapi');
            await legoapis.deleteMany({});
            const legoapisToInsert = [
                {
                    _id: "1",
                    name: "motor_pair.pair",
                    description: 'Creates a new motor_pair instance in a motor_pair id slot',
                    signature: 'pair(motor_pair_id, leftMotorPort, rightMotorPort)',
                    parameter:
                        `
motor_pair_id	Integer (0-2)	PAIR_1 -- 0, PAIR_2 -- 1, PAIR_3 -- 2
leftMotorPort	Integer	Integer representing port on hub.
rightMotorPort	Integer	Integer representing port on hub.
`,
                    python_code:
                        `
import motor_pair
import runloop
from hub import port

async def main():
    motor_pair.pair(motor_pair.PAIR1, port.A, port.B)
    
runloop.run(main())
`
                },
                {
                    _id: "2",
                    name: "motor_pair.move",
                    description: 'Moves the motor pair in a specified direction',
                    signature: 'move(motor_pair_id, steering, velocity, acceleration)',
                    parameter:
                        `
motor_pair_id	Integer (0-2)	PAIR_1 -- 0, PAIR_2 -- 1, PAIR_3 -- 2
steering	Integer(-100 to 100)	Steering value/direction
velocity	Integer	Optional: velocity of motors
acceleration	Integer	Optional: acceleration of motors
`,
                    python_code:
                        `
import motor_pair, time
import runloop
import motor_pair

async def main():

    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight
    motor_pair.move(motor_pair.PAIR_1, 0)

    # run for 1 seconds
    time.sleep(1)

    # stop motors
    motor_pair.stop(motor_pair.PAIR_1)

runloop.run(main())
`
                },
                {
                    _id: "3",
                    name: "motor_pair.move_for_degrees",
                    description: 'Moves motor_pair a specified number of degrees with a steeing factor',
                    signature: 'move_for_degrees(motor_pair_id, degrees, steering_factor, acceleration)',
                    parameter:
                        `
motor_pair_id	Integer (0-2)	PAIR_1 -- 0, PAIR_2 -- 1, PAIR_3 -- 2
degrees	Integer	Number of degrees to turn motors
steering_factor	Integer(-100 to 100)	Direction to steer motor_pair
acceleration	Integer	Unknown
`,
                    python_code:
                        `
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity for 90 degrees 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 90, 0)

    # Move straight at a 280 velocity for 1000 degrees 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 1000, 0, velocity=280)

    # Move straight at a 280 velocity for 555 degrees with a slow deceleration 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 555, 0, velocity=280, deceleration=10)

runloop.run(main())
`
                },
                {
                    _id: "4",
                    name: "motor_pair.stop",
                    description: 'Stops a motor_pair',
                    signature: 'stop(motor_pair_id)',
                    parameter:
                        `
motor_pair_id	Integer (0-2)	PAIR_1 -- 0, PAIR_2 -- 1, PAIR_3 -- 2
`,
                    python_code:
                        `
import motor_pair
import runloop

async def main():
    # stop motors
    motor_pair.stop(PAIR_1)
    
runloop.run(main())
`
                },
                {
                    _id: "5",
                    name: "motor_pair.tank_move_for_degrees",
                    description: 'Turns motors a specified number of degrees. Deceleration and acceleration are optional parameters.',
                    signature: 'tank_move_for_degrees(motor_pair_id, degrees, leftMotorSpeed, rightMotorSpeed)',
                    parameter:
                        `
motor_pair_id	Integer (0-2)	PAIR_1 -- 0, PAIR_2 -- 1, PAIR_3 -- 2
degrees	Integer	Degrees to turn motors
leftMotorSpeed	Integer	Speed of Motor 1
rightMotorSpeed	Integer	Speed of Motor 2
`,
                    python_code:
                        `
import motor_pair
import runloop
from hub import port

async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # move forward 360 degrees at 100 speed for both wheels
    motor_pair.tank_move_for_degrees(motor_pair.PAIR_1, 360, 100, 100)
    
runloop.run(main())
`
                },
                {
                    _id: "1000",
                    description: 'spin motor for 360 degrees to turn right',
                    python_code:
                        `
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # spin motor for 360 degrees to turn right
    motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 360, 100, -100)

runloop.run(main())
`
                },
                {
                    _id: "1002",
                    description: 'pin motor for 360 degrees to turn left',
                    python_code:
                        `
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # spin motor for 360 degrees to turn left
    motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 360, -100, 100)

runloop.run(main())
`
                }
            ]
            const result = await legoapis.bulkWrite(
                legoapisToInsert.map((api) => ({
                    insertOne: {
                        document: api
                    }
                }))
            );
            console.log("Bulk write operation result:", result);
        }
        // // legoapi
        // {
        //     const legosnippets = db.collection('legosnippet');
        //     await legosnippets.deleteMany({});
        //     const legosnippetsToInsert = [

        //     ]
        //     const result = await legosnippets.bulkWrite(
        //         legosnippetsToInsert.map((api) => ({
        //             insertOne: {
        //                 document: api
        //             }
        //         }))
        //     );
        //     console.log("Bulk write operation result:", result);
        // }


    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

function cleanData(obj) {
    cleaned = Object.fromEntries(
        Object.entries(obj).filter(([key, _]) => !key.startsWith('_'))
    );
    //rename id field to _id
    cleaned["_id"] = cleaned["id"];
    delete cleaned["id"];
    return cleaned;
}

main().catch(console.error);