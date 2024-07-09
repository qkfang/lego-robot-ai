# from app import bargraph
## bargraph.change(color: int, value: float) -> None

## bargraph.clear_all() -> None

## bargraph.get_value(color: int) -> Awaitable

## bargraph.hide() -> None

## bargraph.set_value(color: int, value: float) -> None

## bargraph.show(fullscreen: bool) -> None


# from app import display

## display.hide() -> None

## display.image(image: int) -> None

## display.show(fullscreen: bool) -> None

## display.text(text: str) -> None

## app.display Constants
IMAGE_ROBOT_1 = 1 IMAGE_ROBOT_2 = 2 IMAGE_ROBOT_3 = 3 IMAGE_ROBOT_4 = 4 IMAGE_ROBOT_5 = 5 IMAGE_HUB_1 = 6 IMAGE_HUB_2 = 7 IMAGE_HUB_3 = 8 IMAGE_HUB_4 = 9 IMAGE_AMUSEMENT_PARK = 10 IMAGE_BEACH = 11 IMAGE_HAUNTED_HOUSE = 12 IMAGE_CARNIVAL = 13 IMAGE_BOOKSHELF = 14 IMAGE_PLAYGROUND = 15 IMAGE_MOON = 16 IMAGE_CAVE = 17 IMAGE_OCEAN = 18 IMAGE_POLAR_BEAR = 19 IMAGE_PARK = 20 IMAGE_RANDOM = 21


# from app import music
## music.play_drum(drum: int) -> None

## music.play_instrument(instrument: int, note: int, duration: int) -> None

## app.music Constants
DRUM_BASS = 2 DRUM_BONGO = 13 DRUM_CABASA = 15 DRUM_CLAVES = 9 DRUM_CLOSED_HI_HAT = 6 DRUM_CONGA = 14 DRUM_COWBELL = 11 DRUM_CRASH_CYMBAL = 4 DRUM_CUICA = 18 DRUM_GUIRO = 16 DRUM_HAND_CLAP = 8 DRUM_OPEN_HI_HAT = 5 DRUM_SIDE_STICK = 3 DRUM_SNARE = 1 DRUM_TAMBOURINE = 7 DRUM_TRIANGLE = 12 DRUM_VIBRASLAP = 17 DRUM_WOOD_BLOCK = 10 INSTRUMENT_BASS = 6 INSTRUMENT_BASSOON = 14 INSTRUMENT_CELLO = 8 INSTRUMENT_CHOIR = 15 INSTRUMENT_CLARINET = 10 INSTRUMENT_ELECTRIC_GUITAR = 5 INSTRUMENT_ELECTRIC_PIANO = 2 INSTRUMENT_FLUTE = 12 INSTRUMENT_GUITAR = 4 INSTRUMENT_MARIMBA = 19 INSTRUMENT_MUSIC_BOX = 17 INSTRUMENT_ORGAN = 3 INSTRUMENT_PIANO = 1 INSTRUMENT_PIZZICATO = 7 INSTRUMENT_SAXOPHONE = 11 INSTRUMENT_STEEL_DRUM = 18 INSTRUMENT_SYNTH_LEAD = 20 INSTRUMENT_SYNTH_PAD = 21 INSTRUMENT_TROMBONE = 9 INSTRUMENT_VIBRAPHONE = 16 INSTRUMENT_WOODEN_FLUTE = 13


# from app import sound
## sound.play(sound_name: str, volume: int = 100, pitch: int = 0, pan: int = 0) -> Awaitable
Play a sound in the SPIKE App
## sound.set_attributes(volume: int, pitch: int, pan: int) -> None

## sound.stop() -> None


# import color
## color Constants
### color.BLACK = 0
### color.MAGENTA = 1
### color.PURPLE = 2
### color.BLUE = 3
### color.AZURE = 4
### color.TURQUOISE = 5
### color.GREEN = 6
### color.YELLOW = 7
### color.ORANGE = 8
### color.RED = 9
### color.WHITE = 10
### color.UNKNOWN = -1


# import color_matrix
## color_matrix.clear(port: int) -> None
Turn off all pixels on a Color Matrix
## color_matrix.get_pixel(port: int, x: int, y: int) -> tuple[int, int]
Retrieve a specific pixel represented as a tuple containing the color and intensity
## color_matrix.set_pixel(port: int, x: int, y: int, pixel: tuple[color: int, intensity: int]) -> None
Change a single pixel on a Color Matrix
## color_matrix.show(port: int, pixels: list[tuple[int, int]]) -> None
Change all pixels at once on a Color Matrix


# import color_sensor
## color_sensor.color(port: int) -> int
Returns the color value of the detected color. Use the color module to map the color value to a specific color.
## color_sensor.reflection(port: int) -> int
Retrieves the intensity of the reflected light (0-100%).
## color_sensor.rgbi(port: int) -> tuple[int, int, int, int]
Retrieve the raw LPF-2 data from a device.


# import device
## device.data(port: int) -> tuple[int]
Retrieve the raw LPF-2 data from a device.
## device.id(port: int) -> int
Retrieve the device id of a device. Each device has an id based on its type.
## device.get_duty_cycle(port: int) -> int
Retrieve the duty cycle for a device. Returned values is in range 0 to 10000
## device.ready(port: int) -> bool
When a device is attached to the hub it might take a short amount of time before it's ready to accept requests. Use ready to test for the readiness of the attached devices.
## device.set_duty_cycle(port: int, duty_cycle: int) -> None
Set the duty cycle on a device. Range 0 to 10000


# import distance_sensor
## distance_sensor.clear(port: int) -> None
Turns off all the lights in the Distance Sensor connected to port.
## distance_sensor.distance(port: int) -> int
Retrieve the distance in millimeters captured by the Distance Sensor connected to port. If the Distance Sensor cannot read a valid distance it will return -1.
## distance_sensor.get_pixel(port: int, x: int, y: int) -> int
Retrieve the intensity of a specific light on the Distance Sensor connected to port.
## distance_sensor.set_pixel(port: int, x: int, y: int, intensity: int) -> None
Changes the intensity of a specific light on the Distance Sensor connected to port.


# import force_sensor
## force_sensor.show(port: int, pixels: list[int]) -> None
Change all the lights at the same time.
## force_sensor.force(port: int) -> int
Retrieves the measured force as decinewton. Values range from 0 to 100
## force_sensor.pressed(port: int) -> bool
Tests whether the button on the sensor is pressed. Returns true if the force sensor connected to port is pressed.
## force_sensor.raw(port: int) -> int
Returns the raw, uncalibrated force value of the force sensor connected on port port


# from hub import button
## int button.pressed(button: int) -> int
This module allows you to react to buttons being pressed on the hub. You must first import the  button module to use the buttons.
## hub.button Constants
### button.LEFT = 1 
Left button next to the power button on the SPIKE Prime hub 
### button.RIGHT = 2
Right button next to the power button on the SPIKE Prime hub


# from hub import light
## light.color(light: int, color: int) -> None
Change the color of a light on the hub.
## hub.light Constants
### light.POWER = 0
The power button. On SPIKE Prime it's the button between the left and right buttons. 
### light.CONNECT = 1 
The light around the Bluetooth connect  button on SPIKE Prime.


# from hub import light_matrix
## light_matrix.clear() -> None
Switches off all of the pixels on the Light Matrix.
## light_matrix.get_orientation() -> int
Retrieve the current orientation of the Light Matrix.  Can be used with the following  constants: orientation.UP, orientation.LEFT,  orientation.RIGHT, orientation.DOWN
## light_matrix.get_pixel(x: int, y: int) -> int
Retrieve the intensity of a specific pixel on the Light Matrix.
## light_matrix.set_orientation(top: int) -> int
Change the orientation of the Light Matrix. All subsequent calls will use the new  orientation.  Can be used with the following constants: orientation.UP,  orientation.LEFT, orientation.RIGHT, orientation.DOWN
## light_matrix.set_pixel(x: int, y: int, intensity: int) -> None
Sets the brightness of one pixel (one of the 25 LEDs) on the Light Matrix.
## light_matrix.show(pixels: list[int]) -> None
Change all the lights at the same time.
## light_matrix.show_image(image: int) -> None
Display one of the built in images on the display.
## light_matrix.write(text: str, intensity: int = 100, time_per_character: int = 500) -> Awaitable
Displays text on the Light Matrix, one letter at a time, scrolling from right to left except if  there is a single character to show which will not scroll
## hub.light_matrix Constants
IMAGE_HEART = 1 IMAGE_HEART_SMALL = 2 IMAGE_HAPPY = 3 IMAGE_SMILE = 4 IMAGE_SAD = 5 IMAGE_CONFUSED = 6 IMAGE_ANGRY = 7 IMAGE_ASLEEP = 8 IMAGE_SURPRISED = 9 IMAGE_SILLY = 10 IMAGE_FABULOUS = 11 IMAGE_MEH = 12 IMAGE_YES = 13 IMAGE_NO = 14 IMAGE_CLOCK12 = 15 IMAGE_CLOCK1 = 16 IMAGE_CLOCK2 = 17 IMAGE_CLOCK3 = 18 IMAGE_CLOCK4 = 19 IMAGE_CLOCK5 = 20 IMAGE_CLOCK6 = 21 IMAGE_CLOCK7 = 22 IMAGE_CLOCK8 = 23 IMAGE_CLOCK9 = 24 IMAGE_CLOCK10 = 25 IMAGE_CLOCK11 = 26 IMAGE_ARROW_N = 27 IMAGE_ARROW_NE = 28 IMAGE_ARROW_E = 29 IMAGE_ARROW_SE = 30 IMAGE_ARROW_S = 31 IMAGE_ARROW_SW = 32 IMAGE_ARROW_W = 33 IMAGE_ARROW_NW = 34 IMAGE_GO_RIGHT = 35 IMAGE_GO_LEFT = 36 IMAGE_GO_UP = 37 IMAGE_GO_DOWN = 38 IMAGE_TRIANGLE = 39 IMAGE_TRIANGLE_LEFT = 40 IMAGE_CHESSBOARD = 41 IMAGE_DIAMOND = 42 IMAGE_DIAMOND_SMALL = 43 IMAGE_SQUARE = 44 IMAGE_SQUARE_SMALL = 45 IMAGE_RABBIT = 46 IMAGE_COW = 47 IMAGE_MUSIC_CROTCHET = 48 IMAGE_MUSIC_QUAVER = 49 IMAGE_


# from hub import motion_sensor
## motion_sensor.acceleration(raw_unfiltered: bool) -> tuple[int, int, int]
Returns a tuple containing x, y & z acceleration values as integers. The values are mili G,  so 1 / 1000 G
## motion_sensor.angular_velocity(raw_unfiltered: bool) -> tuple[int, int, int]
Returns a tuple containing x, y & z angular velocity values as integers. The values are  decidegrees per second
## motion_sensor.gesture() -> int
Returns the gesture recognized. Possible values are: motion_sensor.TAPPED motion_sensor.DOUBLE_TAPPED motion_sensor.SHAKEN motion_sensor.FALLING motion_sensor.UNKNOWN
## motion_sensor.get_yaw_face() -> int
Retrieve the face of the hub that yaw is relative to. If you put the hub on a flat surface  with the face returned pointing up, when you rotate the hub only the yaw will  update motion_sensor.TOP The SPIKE Prime hub face with the USB charging  port. motion_sensor.FRONT The SPIKE Prime hub face with the Light  Matrix. motion_sensor.RIGHT The right side of the SPIKE Prime hub when facing  the front hub face. motion_sensor.BOTTOM The side of the SPIKE Prime hub where  the battery is. motion_sensor.BACK The SPIKE Prime hub face where the speaker  is. motion_sensor.LEFT The left side of the SPIKE Prime hub when facing the  front hub face.
## motion_sensor.quaternion() -> tuple[float, float, float, float]
Returns the hub orientation quaternion as a tuple[w: float, x: float, y: float, z: float].
## motion_sensor.reset_tap_count() -> None
Reset the tap count returned by the tap_count function
## motion_sensor.reset_yaw(angle: int) -> None
Change the yaw angle offset. The angle set will be the new yaw value.
## motion_sensor.set_yaw_face(up: int) -> bool
Change what hub face is used as the yaw face.If you put the hub on a flat surface with this face  pointing up, when you rotate the hub only the yaw will update
## motion_sensor.stable() -> bool
Whether or not the hub is resting flat.
## motion_sensor.tap_count() -> int
Returns the number of taps recognized since the program started or last time  motion_sensor.reset_tap_count() was called.
## motion_sensor.tilt_angles() -> tuple[int, int, int]
Returns a tuple containing yaw pitch and roll values as integers. Values are decidegrees
## motion_sensor.up_face() -> int
Returns the Hub face that is currently facing up motion_sensor.TOP The SPIKE  Prime hub face with the USB charging port. motion_sensor.FRONT The SPIKE Prime  hub face with the Light Matrix. motion_sensor.RIGHT The right side of the SPIKE  Prime hub when facing the front hub face. motion_sensor.BOTTOM The side of the  SPIKE Prime hub where the battery is. motion_sensor.BACK The SPIKE Prime hub  face where the speaker is. motion_sensor.LEFT The left side of the SPIKE Prime  hub when facing the front hub face.
## hub.motion_sensor Constants
### motion_sensor.TAPPED = 0 
### motion_sensor.DOUBLE_TAPPED = 1 
### motion_sensor.SHAKEN = 2 
### motion_sensor.FALLING = 3 
### motion_sensor.UNKNOWN = -1 
### motion_sensor.TOP = 0 
The SPIKE Prime hub face with the Light  Matrix. 
### motion_sensor.FRONT = 1
The SPIKE Prime hub face where the speaker is. 
### motion_sensor.RIGHT = 2
The right side of the SPIKE Prime hub when facing the front hub face. 
### motion_sensor.BOTTOM = 3
The side of the SPIKE Prime hub where the battery is. 
### motion_sensor.BACK = 4
The SPIKE Prime hub face with the USB charging  port.
### motion_sensor.LEFT = 5
The left side of the SPIKE Prime hub when facing the front  hub face.


# from hub import sound
## sound.beep(freq: int = 440, duration: int = 500, volume: int = 100, *, attack: int = 0, decay: int = 0,  sustain: int = 100, release: int = 0, transition: int = 10, waveform: int = WAVEFORM_SINE,  channel: int = DEFAULT) -> Awaitable
Plays a beep sound from the hub
## sound.stop() -> None
Stops all noise from the hub
## sound.volume
volume(volume: int) -> None
## hub.sound Constants
### sound.ANY = -2
### DEFAULT = -1
### WAVEFORM_SINE = 1
### WAVEFORM_SAWTOOTH = 3
### WAVEFORM_SQUARE = 2
### WAVEFORM_TRIANGLE = 1


# from hub import port
## hub.port Constants
### port.A = 0
The Port that is labelled \u2018A\u2019 on the Hub.
### port.B = 1
The Port that is labelled \u2018B\u2019 on the Hub.
### port.C = 2
The Port that is\n labelled \u2018C\u2019 on the Hub.
### port.D = 3
The Port that is labelled \u2018D\u2019 on the\n Hub.
### port.E = 4
The Port that is labelled \u2018E\u2019 on the\n Hub.
### port.F = 5
The Port that is labelled \u2018F\u2019 on the Hub.
## port.device_uuid() -> str
Retrieve the device id.
## port.hardware_id() -> str
Retrieve the hardware id.
## port.power_off() -> int
Turns off the hub.
## port.temperature() -> int
Retrieve the hub temperature. Measured in decidegrees celsius (d\u00b0C) which is 1 / 10 of a degree celsius (\u00b0C)


# import motor
## motor.absolute_position(port: int) -> int
Get the absolute position of a Motor
## motor.get_duty_cycle(port: int) -> int
Get the pwm of a Motor
## motor.relative_position(port: int) -> int
Get the relative position of a Motor
## motor.reset_relative_position(port: int, position: int) -> None
Change the position used as the offset when using the run_to_relative_position function.
## await motor.run(port: int, velocity: int, *, acceleration: int = 1000) -> None
Start a Motor at a constant speed
## await motor.run_for_degrees(port: int, degrees: int, velocity: int, *, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Turn a motor for a specific number of degrees When awaited returns a status of the movement that corresponds to one of the following constants: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## await motor.run_for_time(port: int, duration: int, velocity: int, *, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Run a Motor for a limited amount of time When awaited returns a status of the movement that corresponds to one of the following constants: motor.READY motor.RUNNING motor.STALLED motor.ERROR motor.DISCONNECTED
## await motor.run_to_absolute_position(port: int, position: int, velocity: int, *, direction: int = motor.SHORTEST_PATH, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Turn a motor to an absolute position. When awaited returns a status of the movement that corresponds to one of the following constants: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## await motor.run_to_relative_position(port: int, position: int, velocity: int, *, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Turn a motor to a position relative to the current position. When awaited returns a status of the movement that corresponds to one of the following constants: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## motor.set_duty_cycle(port: int, pwm: int) -> None
Start a Motor with a specific pwm
## motor.stop(port: int, *, stop: int = BRAKE) -> None
Stops a motor
## motor.velocity(port: int) -> int
Get the velocity (deg/sec) of a Motor
## motor Constants
### motor.READY = 0 
### motor.RUNNING = 1 
### motor.STALLED = 2 
### motor.CANCELLED = 3 
### motor.ERROR = 4 
### motor.DISCONNECTED = 5 
### motor.COAST = 0 
### motor.BRAKE = 1 
### motor.HOLD = 2 
### motor.CONTINUE = 3 
### motor.SMART_COAST = 4 
### motor.SMART_BRAKE = 5 
### motor.CLOCKWISE = 0 
### motor.COUNTERCLOCKWISE = 1 
### motor.SHORTEST_PATH = 2 
### motor.LONGEST_PATH = 3


# import motor_pair
## await motor_pair.move(pair: int, steering: int, *, velocity: int = 360, acceleration: int = 1000) -> None
Move a Motor Pair at a constant speed until a new command is given.
## await motor_pair.move_for_degrees(pair: int, degrees: int, steering: int, *, velocity: int = 360, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Move a Motor Pair at a constant speed for a specific number of degrees. When awaited returns a status of the movement that corresponds to one of the following constants from the motor module: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## await motor_pair.move_for_time(pair: int, duration: int, steering: int, *, velocity: int = 360, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Move a Motor Pair at a constant speed for a specific duration. When awaited returns a status of the movement that corresponds to one of the following constants from the motor module: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## motor_pair.move_tank(pair: int, left_velocity: int, right_velocity: int, *, acceleration: int = 1000) -> None
Perform a tank move on a Motor Pair at a constant speed until a new command is given.
## await motor_pair.move_tank_for_degrees(pair: int, degrees: int, left_velocity: int, right_velocity: int, *, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Perform a tank move on a Motor Pair at a constant speed until a new command is given. 
pair: int argument must use motor_pair.PAIR_1 OR motor_pair.PAIR_2 OR motor_pair.PAIR_3
When awaited returns a status of the movement that corresponds to one of the following constants from the motor module: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED.
## await motor_pair.move_tank_for_time(pair: int, left_velocity: int, right_velocity: int, duration: int, *, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable
Perform a tank move on a Motor Pair at a constant speed for a specific amount of time. When awaited returns a status of the movement that corresponds to one of the following constants from the motor module: motor.READY motor.RUNNING motor.STALLED motor.CANCELED motor.ERROR motor.DISCONNECTED
## motor_pair.pair(pair: int, left_motor: int, right_motor: int) -> None
pair two motors (left_motor & right_motor) and store the paired motors in pair. Use pair in all subsequent motor_pair related function calls.
## motor_pair.stop(pair: int, *, stop: int = motor.BRAKE) -> None
Stops a Motor Pair.
## motor_pair.unpair(pair: int) -> None
Unpair a Motor Pair.
## motor_pair Constants
### motor_pair.PAIR_1 = 0 
First Motor Pair 
### motor_pair.PAIR_2 = 1 
Second Motor Pair 
### motor_pair.PAIR_3 = 2
Third Motor Pair


# import orientation
## orientation Constants
### orientation.UP = 0 
### orientation.RIGHT = 1 
### orientation.DOWN = 2 
### orientation.LEFT = 3


# import runloop
## runloop.run(*functions: Awaitable) -> None 
Start any number of parallel async functions. This is the function you should use to create programs with a similar structure to Word Blocks.
 
## runloop.sleep_ms(duration: int) -> Awaitable
Pause the execution of the application for any amount of milliseconds.
 
## runloop.until(function: Callable[[], bool], timeout: int = 0) -> Awaitable
Returns an awaitable that will return when the condition in the function or lambda passed is True or when it times out

