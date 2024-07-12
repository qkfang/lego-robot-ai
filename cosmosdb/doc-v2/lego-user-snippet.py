####
# spin motor for 360 degrees to turn right
##--
from hub import port
import runloop
import motor_pair


async def main():
    # Pair motors on port A and B
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # spin motor for 360 degrees to turn right
    motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 360, 100, -100)


runloop.run(main())


####
# spin motor for 360 degrees to turn left
##--
from hub import port
import runloop
import motor_pair


async def main():
    # Pair motors on port A and B
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # spin motor for 360 degrees to turn left
    motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 360, -100, 100)


runloop.run(main())


####
# read gyro sensor's yaw degree
##--
from hub import port
import runloop
import motor_pair

async def main():
    yaw_degree = round(motion_sensor.tilt_angles()[0] / 10, 3) * -1
    print("Yaw Degree:", yaw_degree)


runloop.run(main())


####
# Move the robot 10 centimeters forward
##--
from hub import port
import runloop, motor_pair, sys

# cm, this is a constant for your robot
WHEEL_CIRCUMFERENCE = 17.5

# input must be in the same unit as WHEEL_CIRCUMFERENCE
def degreesForDistance(distance_cm):
    # Add multiplier for gear ratio if needed
    return int((distance_cm / WHEEL_CIRCUMFERENCE) * 360)

async def main():
    # Drive Base 1
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, degreesForDistance(40), 0)
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, degreesForDistance(-40), 0)
    sys.exit("Finished")


runloop.run(main())


####
# Move the robot 10 centimeters forward
##--
from hub import port
import runloop, motor_pair, sys

# cm, this is a constant for your robot
WHEEL_CIRCUMFERENCE = 17.5

# input must be in the same unit as WHEEL_CIRCUMFERENCE
def degreesForDistance(distance_cm):
    # Add multiplier for gear ratio if needed
    return int((distance_cm / WHEEL_CIRCUMFERENCE) * 360)

async def main():
    # Drive Base 1
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, degreesForDistance(10), 0)
    sys.exit("Finished")

runloop.run(main())



####
# LINE FOLLOWER
##--
from hub import port
import motor, motor_pair, color_sensor, runloop, sys
# Constants for Drive Base 1
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
# Follow the right side of black line (Black-White edge).
# To follow a White-Black edge, change the error condition to (reflection - 50). 
async def pid_line_follow_forever():
    integral = 0
    lastError = 0
    while (True):
        # Compute the error. 
        error = 50 - color_sensor.reflection(port.E)
        P_fix = error * 0.5
        integral = integral + error
        I_fix = integral * 0.001
        derivative = error - lastError
        lastError = error
        D_fix = derivative * 1
        # clamp the correction from -100 to 100 because SP3 doesn’t seem to do it internally.
        correction = min(100, max(-100, int(P_fix + I_fix + D_fix)))
        # use the correction as the steering
        motor_pair.move(motor_pair.PAIR_1, correction, velocity = 300)
async def main():
    await pid_line_follow_forever()
runloop.run(main())



####
# GYRO MOVE STRAIGHT
##--

from hub import port, motion_sensor
import runloop, motor_pair
async def main():
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
    # Reset the yaw angle and wait for it to stabilize
    motion_sensor.reset_yaw(0)
    await runloop.until(motion_sensor.stable)
    while True:
        # compute the error in degrees. See Turning with Gyro for explanation.
        error = motion_sensor.tilt_angles()[0] * -0.1
        # correction is an integer which is the negative of the error
        correction = int(error * -2)
        # apply steering to correct the error
        motor_pair.move(motor_pair.PAIR_1, correction, velocity=200)

runloop.run(main())



####
# PROPORTIONAL LINE FOLLOWER
##--
from hub import port
import motor, motor_pair, color_sensor, runloop, sys
# Constants for Drive Base 1
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
# Follow the right side of black line (Black-White edge).
# To follow a White-Black edge, change the error condition to (reflection - 50)
async def line_follow_forever():
    while (True):
        # Compute the error
        error = 50 - color_sensor.reflection(port.E)
        # Compute the correction by multiplying the error 
        # by a Constant of Proportionality
        correction = int(error * 0.5)
        motor_pair.move(motor_pair.PAIR_1, correction, velocity = 300)
async def main():
    await line_follow_forever()
runloop.run(main())



####
# USING CONCURRENT FUNCTIONS
##--
from hub import port
import motor, color_sensor, runloop, sys

async def all_done():
    return (motor.velocity(port.C) is 0 and motor.velocity(port.D) is 0)
# Function to move motor until the sensor in front of it senses black
# Parameters:
# motor_port: The port of the motor
# sensor_port: port of the color sensor in front of the motor
# direction: 1 for clockwise, -1 for counterclockwise
async def move_until_black(motor_port, color_port, direction):
    motor.run(motor_port, 200 * direction)
    while color_sensor.reflection(color_port) > 50:
        await runloop.sleep_ms(50)
    motor.stop(motor_port)
async def main():
    # create two async functions to send to the runloop
    a = move_until_black(port.C, port.A, -1)
    b = move_until_black(port.D, port.B, 1)
    # run both the functions together
    runloop.run(*[a,b])
    # wait until both motors have stopped
    await runloop.until(all_done)
    sys.exit("Stopping")
runloop.run(main())




####
# MOVE UNTIL LINE
##--
from hub import port
import motor, color_sensor, runloop, sys

async def main():
    # Start the motors
    motor.run(port.C, -200)
    motor.run(port.D, 200)
    foundC = False
    foundD = False
    # wait for color sensors to detect black and stop motors
    while (not foundC or not foundD):
        if(color_sensor.reflection(port.A) < 50):
            motor.stop(port.C)
            foundC = True
        if(color_sensor.reflection(port.B) < 50):
            motor.stop(port.D)
            foundD = True
    sys.exit("Stopping")
    
runloop.run(main()) 
