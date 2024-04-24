## API Modules

### App

The `app` module is used communicate between hub and app

#### Sub Modules

#### Bargraph

The `bargraph` module is used make bar graphs in the SPIKE App

To use the `bargraph` module simply import the module like so:

```
from app import bargraph
```

`bargraph` details

##### Functions

##### change

change(color: int, value: float) -> None

###### Parameters

- - -

###### color: int

A color from the `color` module

###### value: float

The value

##### clear\_all

clear\_all() -> None

###### Parameters

- - -

##### get\_value

get\_value(color: int) -> Awaitable

###### Parameters

- - -

###### color: int

A color from the `color` module

##### hide

hide() -> None

###### Parameters

- - -

##### set\_value

set\_value(color: int, value: float) -> None

###### Parameters

- - -

###### color: int

A color from the `color` module

###### value: float

The value

##### show

show(fullscreen: bool) -> None

###### Parameters

- - -

###### fullscreen: bool

Show in full screen

#### Display

The `display` module is used show images in the SPIKE App

To use the `display` module simply import the module like so:

```
from app import display
```

`display` details

##### Functions

##### hide

hide() -> None

###### Parameters

- - -

##### image

image(image: int) -> None

###### Parameters

- - -

###### image: int

The id of the image to show. The range of available images is 1 to 21. There are consts on the `display` module for these

##### show

show(fullscreen: bool) -> None

###### Parameters

- - -

###### fullscreen: bool

Show in full screen

##### text

text(text: str) -> None

###### Parameters

- - -

###### text: str

The text to display

##### Constants

- - -

##### app.display Constants

**IMAGE\_ROBOT\_1** = 1

**IMAGE\_ROBOT\_2** = 2

**IMAGE\_ROBOT\_3** = 3

**IMAGE\_ROBOT\_4** = 4

**IMAGE\_ROBOT\_5** = 5

**IMAGE\_HUB\_1** = 6

**IMAGE\_HUB\_2** = 7

**IMAGE\_HUB\_3** = 8

**IMAGE\_HUB\_4** = 9

**IMAGE\_AMUSEMENT\_PARK** = 10

**IMAGE\_BEACH** = 11

**IMAGE\_HAUNTED\_HOUSE** = 12

**IMAGE\_CARNIVAL** = 13

**IMAGE\_BOOKSHELF** = 14

**IMAGE\_PLAYGROUND** = 15

**IMAGE\_MOON** = 16

**IMAGE\_CAVE** = 17

**IMAGE\_OCEAN** = 18

**IMAGE\_POLAR\_BEAR** = 19

**IMAGE\_PARK** = 20

**IMAGE\_RANDOM** = 21

#### Linegraph

The `linegraph` module is used make line graphs in the SPIKE App

To use the `linegraph` module simply import the module like so:

```
from app import linegraph
```

`linegraph` details

##### Functions

##### clear

clear(color: int) -> None

###### Parameters

- - -

###### color: int

A color from the `color` module

##### clear\_all

clear\_all() -> None

###### Parameters

- - -

##### get\_average

get\_average(color: int) -> Awaitable

###### Parameters

- - -

###### color: int

A color from the `color` module

##### get\_last

get\_last(color: int) -> Awaitable

###### Parameters

- - -

###### color: int

A color from the `color` module

##### get\_max

get\_max(color: int) -> Awaitable

###### Parameters

- - -

###### color: int

A color from the `color` module

##### get\_min

get\_min(color: int) -> Awaitable

###### Parameters

- - -

###### color: int

A color from the `color` module

##### hide

hide() -> None

###### Parameters

- - -

##### plot

plot(color: int, x: float, y: float) -> None

###### Parameters

- - -

###### color: int

A color from the `color` module

###### x: float

The X value

###### y: float

The Y value

##### show

show(fullscreen: bool) -> None

###### Parameters

- - -

###### fullscreen: bool

Show in full screen

#### Music

The `music` module is used make music in the SPIKE App

To use the `music` module simply import the module like so:

```
from app import music
```

`music` details

##### Functions

##### play\_drum

play\_drum(drum: int) -> None

###### Parameters

- - -

###### drum: int

The drum name. See all available values in the app.sound module.

##### play\_instrument

play\_instrument(instrument: int, note: int, duration: int) -> None

###### Parameters

- - -

###### instrument: int

The instrument name. See all available values in the app.music module.

###### note: int

The midi note to play (0-130)

###### duration: int

The duration in milliseconds

##### Constants

- - -

##### app.music Constants

**DRUM\_BASS** = 2

**DRUM\_BONGO** = 13

**DRUM\_CABASA** = 15

**DRUM\_CLAVES** = 9

**DRUM\_CLOSED\_HI\_HAT** = 6

**DRUM\_CONGA** = 14

**DRUM\_COWBELL** = 11

**DRUM\_CRASH\_CYMBAL** = 4

**DRUM\_CUICA** = 18

**DRUM\_GUIRO** = 16

**DRUM\_HAND\_CLAP** = 8

**DRUM\_OPEN\_HI\_HAT** = 5

**DRUM\_SIDE\_STICK** = 3

**DRUM\_SNARE** = 1

**DRUM\_TAMBOURINE** = 7

**DRUM\_TRIANGLE** = 12

**DRUM\_VIBRASLAP** = 17

**DRUM\_WOOD\_BLOCK** = 10

**INSTRUMENT\_BASS** = 6

**INSTRUMENT\_BASSOON** = 14

**INSTRUMENT\_CELLO** = 8

**INSTRUMENT\_CHOIR** = 15

**INSTRUMENT\_CLARINET** = 10

**INSTRUMENT\_ELECTRIC\_GUITAR** = 5

**INSTRUMENT\_ELECTRIC\_PIANO** = 2

**INSTRUMENT\_FLUTE** = 12

**INSTRUMENT\_GUITAR** = 4

**INSTRUMENT\_MARIMBA** = 19

**INSTRUMENT\_MUSIC\_BOX** = 17

**INSTRUMENT\_ORGAN** = 3

**INSTRUMENT\_PIANO** = 1

**INSTRUMENT\_PIZZICATO** = 7

**INSTRUMENT\_SAXOPHONE** = 11

**INSTRUMENT\_STEEL\_DRUM** = 18

**INSTRUMENT\_SYNTH\_LEAD** = 20

**INSTRUMENT\_SYNTH\_PAD** = 21

**INSTRUMENT\_TROMBONE** = 9

**INSTRUMENT\_VIBRAPHONE** = 16

**INSTRUMENT\_WOODEN\_FLUTE** = 13

#### Sound

The `sound` module is used play sounds in the SPIKE App

To use the `sound` module simply import the module like so:

```
from app import sound
```

`sound` details

##### Functions

##### play

play(sound\_name: str, volume: int = 100, pitch: int = 0, pan: int = 0) -> Awaitable

Play a sound in the SPIKE App

###### Parameters

- - -

###### sound\_name: str

The sound name as seen in the Word Blocks sound extension

###### volume: int

The volume (0-100)

###### pitch: int

The pitch of the sound

###### pan: int

The pan effect determines which speaker is emitting the sound, with "-100" being only the left speaker, "0" being normal, and "100" being only the right speaker.

##### set\_attributes

set\_attributes(volume: int, pitch: int, pan: int) -> None

###### Parameters

- - -

###### volume: int

The volume (0-100)

###### pitch: int

The pitch of the sound

###### pan: int

The pan effect determines which speaker is emitting the sound, with "-100" being only the left speaker, "0" being normal, and "100" being only the right speaker.

##### stop

stop() -> None

###### Parameters

- - -

### Color

The `color` module contains all the color constants to use with the `color_matrix`, `color_sensor` and `light` modules.

To use the Color module add the following import statement to your project:

```
import color
```

#### Constants

- - -

#### color Constants

**BLACK** = 0

**MAGENTA** = 1

**PURPLE** = 2

**BLUE** = 3

**AZURE** = 4

**TURQUOISE** = 5

**GREEN** = 6

**YELLOW** = 7

**ORANGE** = 8

**RED** = 9

**WHITE** = 10

**UNKNOWN** = -1

### Color Matrix

To use the Color Matrix module add the following import statement to your project:

```
import color_matrix
```

All functions in the module should be called inside the `color_matrix` module as a prefix like so:

```
color_matrix.set_pixel(port.A, 1, 1, (color.BLUE, 10))
```

#### Functions

#### clear

clear(port: int) -> None

Turn off all pixels on a Color Matrix

```
from hub import port
import color_matrix

color_matrix.clear(port.A)
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### get\_pixel

get\_pixel(port: int, x: int, y: int) -> tuple\[int, int\]

Retrieve a specific pixel represented as a tuple containing the color and intensity

```
from hub import port
import color_matrix

# Print the color and intensity of the 0,0 pixel on the Color Matrix connected to port A 
print(color_matrix.get_pixel(port.A, 0, 0))
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### x: int

The X value (0 - 2)

##### y: int

The Y value, range (0 - 2)

#### set\_pixel

set\_pixel(port: int, x: int, y: int, pixel: tuple\[color: int, intensity: int\]) -> None

Change a single pixel on a Color Matrix

```
from hub import port
import color
import color_matrix

# Change the color of the 0,0 pixel on the Color Matrix connected to port A 
color_matrix.set_pixel(port.A, 0, 0, (color.RED, 10))

# Print the color of the 0,0 pixel on the Color Matrix connected to port A 
print(color_matrix.get_pixel(port.A, 0, 0)[0])
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### x: int

The X value (0 - 2)

##### y: int

The Y value, range (0 - 2)

##### pixel: tuple\[color: int, intensity: int\]

Tuple containing color and intensity, meaning how bright to light up the pixel

#### show

show(port: int, pixels: list\[tuple\[int, int\]\]) -> None

Change all pixels at once on a Color Matrix

```
from hub import port
import color
import color_matrix

# Update all pixels on Color Matrix using the show function 

# Create a list with 18 items (color and intensity pairs) 
pixels = [(color.BLUE, 10)] * 9 

# Update all pixels to show same color and intensity 
color_matrix.show(port.A, pixels)
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### pixels: list\[tuple\[int, int\]\]

A list containing color and intensity value tuples for all 9 pixels.

### Color Sensor

The `color_sensor` module enables you to write code that reacts to specific colors or the intensity of the reflected light.

To use the Color Sensor module add the following import statement to your project:

```
import color_sensor
```

All functions in the module should be called inside the `color_sensor` module as a prefix like so:

```
color_sensor.reflection(port.A)
```

The Color Sensor can recognize the following colors:

Red  
Green  
Blue  
Magenta  
Yellow  
Orange  
Azure  
Black  
White

#### Functions

#### color

color(port: int) -> int

Returns the color value of the detected color. Use the `color` module to map the color value to a specific color.

```
import color_sensor
from hub import port
import color

if color_sensor.color(port.A) is color.RED:
    print("Red detected")
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### reflection

reflection(port: int) -> int

Retrieves the intensity of the reflected light (0-100%).

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### rgbi

rgbi(port: int) -> tuple\[int, int, int, int\]

Retrieves the overall color intensity and intensity of red, green and blue.

Returns tuple\[red: int, green: int, blue: int, intensity: int\]

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

### Device

The `device` module enables you to write code to get information about devices plugged into the hub.

To use the Device module add the following import statement to your project:

```
import device
```

All functions in the module should be called inside the `device` module as a prefix like so:

```
device.device_id(port.A)
```

#### Functions

#### data

data(port: int) -> tuple\[int\]

Retrieve the raw LPF-2 data from a device.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### id

id(port: int) -> int

Retrieve the device id of a device. Each device has an id based on its type.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### get\_duty\_cycle

get\_duty\_cycle(port: int) -> int

Retrieve the duty cycle for a device. Returned values is in range 0 to 10000

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### ready

ready(port: int) -> bool

When a device is attached to the hub it might take a short amount of time before it's ready to accept requests.  
Use `ready` to test for the readiness of the attached devices.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### set\_duty\_cycle

set\_duty\_cycle(port: int, duty\_cycle: int) -> None

Set the duty cycle on a device. Range 0 to 10000

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### duty\_cycle: int

The PWM value (0-10000)

### Distance Sensor

The `distance_sensor` module enables you to write code that reacts to specific distances or light up the Distance Sensor in different ways.

To use the Distance Sensor module add the following import statement to your project:

```
import distance_sensor
```

All functions in the module should be called inside the `distance_sensor` module as a prefix like so:

```
distance_sensor.distance(port.A)
```

#### Functions

#### clear

clear(port: int) -> None

Turns off all the lights in the Distance Sensor connected to `port`.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### distance

distance(port: int) -> int

Retrieve the distance in millimeters captured by the Distance Sensor connected to `port`. If the Distance Sensor cannot read a valid distance it will return -1.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### get\_pixel

get\_pixel(port: int, x: int, y: int) -> int

Retrieve the intensity of a specific light on the Distance Sensor connected to `port`.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### x: int

The X value (0 - 3)

##### y: int

The Y value, range (0 - 3)

#### set\_pixel

set\_pixel(port: int, x: int, y: int, intensity: int) -> None

Changes the intensity of a specific light on the Distance Sensor connected to `port`.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### x: int

The X value (0 - 3)

##### y: int

The Y value, range (0 - 3)

##### intensity: int

How bright to light up the pixel

#### show

show(port: int, pixels: list\[int\]) -> None

Change all the lights at the same time.

```
from hub import port
import distance_sensor

# Update all pixels on Distance Sensor using the show function 

# Create a list with 4 identical intensity values 
pixels = [100] * 4 

# Update all pixels to show same intensity 
distance_sensor.show(port.A, pixels)
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### pixels: bytes

A list containing intensity values for all 4 pixels.

### Force Sensor

The `force_sensor` module contains all functions and constants to use the Force Sensor.

To use the Force Sensor module add the following import statement to your project:

```
import force_sensor
```

All functions in the module should be called inside the `force_sensor` module as a prefix like so:

```
force_sensor.force(port.A)
```

#### Functions

#### force

force(port: int) -> int

Retrieves the measured force as decinewton. Values range from 0 to 100

```
from hub import port
import force_sensor


print(force_sensor.force(port.A))
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### pressed

pressed(port: int) -> bool

Tests whether the button on the sensor is pressed. Returns true if the force sensor connected to port is pressed.

```
from hub import port
import force_sensor


print(force_sensor.pressed(port.A))
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### raw

raw(port: int) -> int

Returns the raw, uncalibrated force value of the force sensor connected on port `port`

```
from hub import port
import force_sensor


print(force_sensor.raw(port.A))
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

### Hub

#### Sub Modules

#### Button

To use the Button module add the following import statement to your project:

```
from hub import button
```

All functions in the module should be called inside the `button` module as a prefix like so:

```
button.pressed(button.LEFT)
```

##### Functions

##### pressed

int pressed(button: int) -> int

This module allows you to react to buttons being pressed on the hub. You must first import the `button` module to use the buttons.

```
from hub import button

left_button_press_duration = 0

# Wait for the left button to be pressed 
while not button.pressed(button.LEFT):
    pass

# As long as the left button is being pressed, update the `left_button_press_duration` variable 
while button.pressed(button.LEFT):
    left_button_press_duration = button.pressed(button.LEFT)

print("Left button was pressed for " + str(left_button_press_duration) + " milliseconds")
```

###### Parameters

- - -

###### button: int

A button from the `button` submodule in the `hub` module

##### Constants

- - -

##### hub.button Constants

**LEFT** = 1  
Left button next to the power button on the SPIKE Prime hub  
**RIGHT** = 2  
Right button next to the power button on the SPIKE Prime hub

#### Light

The `light` module includes functions to change the color of the light on the SPIKE Prime hub.

To use the Light module add the following import statement to your project:

```
from hub import light
```

All functions in the module should be called inside the `light` module as a prefix like so:

```
light.color(color.RED)
```

##### Functions

##### color

color(light: int, color: int) -> None

Change the color of a light on the hub.

```
from hub import light
import color

# Change the light to red 
light.color(light.POWER, color.RED)
```

###### Parameters

- - -

###### light: int

The light on the hub

###### color: int

A color from the `color` module

##### Constants

- - -

##### hub.light Constants

**POWER** = 0  
The power button. On SPIKE Prime it's the button between the left and right buttons.  
**CONNECT** = 1  
The light around the Bluetooth connect button on SPIKE Prime.

#### Light Matrix

To use the Light Matrix module add the following import statement to your project:

```
from hub import light_matrix
```

All functions in the module should be called inside the `light_matrix` module as a prefix like so:

```
light_matrix.write("Hello World")
```

##### Functions

##### clear

clear() -> None

Switches off all of the pixels on the Light Matrix.

```
from hub import light_matrix
import time
# Update pixels to show an image on Light Matrix, and then turn them off using the clear function 

# Show a small heart 
light_matrix.show_image(2)

# Wait for two seconds 
time.sleep_ms(2000)

# Switch off the heart 
light_matrix.clear()
```

###### Parameters

- - -

##### get\_orientation

get\_orientation() -> int

Retrieve the current orientation of the Light Matrix.  
Can be used with the following constants: `orientation.UP`, `orientation.LEFT`, `orientation.RIGHT`, `orientation.DOWN`

###### Parameters

- - -

##### get\_pixel

get\_pixel(x: int, y: int) -> int

Retrieve the intensity of a specific pixel on the Light Matrix.

```
from hub import light_matrix

# Show a heart 
light_matrix.show_image(1)

# Print the value of the center pixel's intensity 
print(light_matrix.get_pixel(2, 2))
```

###### Parameters

- - -

###### x: int

The X value, range (0 - 4)

###### y: int

The Y value, range (0 - 4)

##### set\_orientation

set\_orientation(top: int) -> int

Change the orientation of the Light Matrix. All subsequent calls will use the new orientation.  
Can be used with the following constants: `orientation.UP`, `orientation.LEFT`, `orientation.RIGHT`, `orientation.DOWN`

###### Parameters

- - -

###### top: int

The side of the hub to be the top

##### set\_pixel

set\_pixel(x: int, y: int, intensity: int) -> None

Sets the brightness of one pixel (one of the 25 LEDs) on the Light Matrix.

```
from hub import light_matrix
# Turn on the pixel in the center of the hub 
light_matrix.set_pixel(2, 2, 100)
```

###### Parameters

- - -

###### x: int

The X value, range (0 - 4)

###### y: int

The Y value, range (0 - 4)

###### intensity: int

How bright to light up the pixel

##### show

show(pixels: list\[int\]) -> None

Change all the lights at the same time.

```
from hub import light_matrix
# Update all pixels on Light Matrix using the show function 

# Create a list with 25 identical intensity values 
pixels = [100] * 25 

# Update all pixels to show same intensity 
light_matrix.show(pixels)
```

###### Parameters

- - -

###### pixels: Iterable

A list containing light intensity values for all 25 pixels.

##### show\_image

show\_image(image: int) -> None

Display one of the built in images on the display.

```
from hub import light_matrix
# Update pixels to show an image on Light Matrix using the show_image function 

# Show a smiling face 
light_matrix.show_image(light_matrix.IMAGE_HAPPY)
```

###### Parameters

- - -

###### image: int

The id of the image to show. The range of available images is 1 to 67. There are consts on the `light_matrix` module for these.

##### write

write(text: str, intensity: int = 100, time\_per\_character: int = 500) -> Awaitable

Displays text on the Light Matrix, one letter at a time, scrolling from right to left except if there is a single character to show which will not scroll

```
from hub import light_matrix
# White a message to the hub 
light_matrix.write("Hello, world!")
```

###### Parameters

- - -

###### text: str

The text to display

###### intensity: int

How bright to light up the pixel

###### time\_per\_character: int

How long to show each character on the display

##### Constants

- - -

##### hub.light\_matrix Constants

**IMAGE\_HEART** = 1

**IMAGE\_HEART\_SMALL** = 2

**IMAGE\_HAPPY** = 3

**IMAGE\_SMILE** = 4

**IMAGE\_SAD** = 5

**IMAGE\_CONFUSED** = 6

**IMAGE\_ANGRY** = 7

**IMAGE\_ASLEEP** = 8

**IMAGE\_SURPRISED** = 9

**IMAGE\_SILLY** = 10

**IMAGE\_FABULOUS** = 11

**IMAGE\_MEH** = 12

**IMAGE\_YES** = 13

**IMAGE\_NO** = 14

**IMAGE\_CLOCK12** = 15

**IMAGE\_CLOCK1** = 16

**IMAGE\_CLOCK2** = 17

**IMAGE\_CLOCK3** = 18

**IMAGE\_CLOCK4** = 19

**IMAGE\_CLOCK5** = 20

**IMAGE\_CLOCK6** = 21

**IMAGE\_CLOCK7** = 22

**IMAGE\_CLOCK8** = 23

**IMAGE\_CLOCK9** = 24

**IMAGE\_CLOCK10** = 25

**IMAGE\_CLOCK11** = 26

**IMAGE\_ARROW\_N** = 27

**IMAGE\_ARROW\_NE** = 28

**IMAGE\_ARROW\_E** = 29

**IMAGE\_ARROW\_SE** = 30

**IMAGE\_ARROW\_S** = 31

**IMAGE\_ARROW\_SW** = 32

**IMAGE\_ARROW\_W** = 33

**IMAGE\_ARROW\_NW** = 34

**IMAGE\_GO\_RIGHT** = 35

**IMAGE\_GO\_LEFT** = 36

**IMAGE\_GO\_UP** = 37

**IMAGE\_GO\_DOWN** = 38

**IMAGE\_TRIANGLE** = 39

**IMAGE\_TRIANGLE\_LEFT** = 40

**IMAGE\_CHESSBOARD** = 41

**IMAGE\_DIAMOND** = 42

**IMAGE\_DIAMOND\_SMALL** = 43

**IMAGE\_SQUARE** = 44

**IMAGE\_SQUARE\_SMALL** = 45

**IMAGE\_RABBIT** = 46

**IMAGE\_COW** = 47

**IMAGE\_MUSIC\_CROTCHET** = 48

**IMAGE\_MUSIC\_QUAVER** = 49

**IMAGE\_MUSIC\_QUAVERS** = 50

**IMAGE\_PITCHFORK** = 51

**IMAGE\_XMAS** = 52

**IMAGE\_PACMAN** = 53

**IMAGE\_TARGET** = 54

**IMAGE\_TSHIRT** = 55

**IMAGE\_ROLLERSKATE** = 56

**IMAGE\_DUCK** = 57

**IMAGE\_HOUSE** = 58

**IMAGE\_TORTOISE** = 59

**IMAGE\_BUTTERFLY** = 60

**IMAGE\_STICKFIGURE** = 61

**IMAGE\_GHOST** = 62

**IMAGE\_SWORD** = 63

**IMAGE\_GIRAFFE** = 64

**IMAGE\_SKULL** = 65

**IMAGE\_UMBRELLA** = 66

**IMAGE\_SNAKE** = 67

#### Motion Sensor

To use the Motion Sensor module add the following import statement to your project:

```
from hub import motion_sensor
```

All functions in the module should be called inside the `motion_sensor` module as a prefix like so:

```
motion_sensor.up_face()
```

##### Functions

##### acceleration

acceleration(raw\_unfiltered: bool) -> tuple\[int, int, int\]

Returns a tuple containing x, y & z acceleration values as integers. The values are mili G, so 1 / 1000 G

###### Parameters

- - -

###### raw\_unfiltered: bool

If we want the data back raw and unfiltered

##### angular\_velocity

angular\_velocity(raw\_unfiltered: bool) -> tuple\[int, int, int\]

Returns a tuple containing x, y & z angular velocity values as integers. The values are decidegrees per second

###### Parameters

- - -

###### raw\_unfiltered: bool

If we want the data back raw and unfiltered

##### gesture

gesture() -> int

Returns the gesture recognized.

Possible values are:

`motion_sensor.TAPPED`  
`motion_sensor.DOUBLE_TAPPED`  
`motion_sensor.SHAKEN`  
`motion_sensor.FALLING`  
`motion_sensor.UNKNOWN`

###### Parameters

- - -

##### get\_yaw\_face

get\_yaw\_face() -> int

Retrieve the face of the hub that yaw is relative to.  
If you put the hub on a flat surface with the face returned pointing up, when you rotate the hub only the yaw will update  
`motion_sensor.TOP` The SPIKE Prime hub face with the USB charging port.  
`motion_sensor.FRONT` The SPIKE Prime hub face with the Light Matrix.  
`motion_sensor.RIGHT` The right side of the SPIKE Prime hub when facing the front hub face.  
`motion_sensor.BOTTOM` The side of the SPIKE Prime hub where the battery is.  
`motion_sensor.BACK` The SPIKE Prime hub face where the speaker is.  
`motion_sensor.LEFT` The left side of the SPIKE Prime hub when facing the front hub face.

###### Parameters

- - -

##### quaternion

quaternion() -> tuple\[float, float, float, float\]

Returns the hub orientation quaternion as a tuple\[w: float, x: float, y: float, z: float\].

###### Parameters

- - -

##### reset\_tap\_count

reset\_tap\_count() -> None

Reset the tap count returned by the `tap_count` function

###### Parameters

- - -

##### reset\_yaw

reset\_yaw(angle: int) -> None

Change the yaw angle offset.  
The angle set will be the new yaw value.

###### Parameters

- - -

###### angle: int

##### set\_yaw\_face

set\_yaw\_face(up: int) -> bool

Change what hub face is used as the yaw face.If you put the hub on a flat surface with this face pointing up, when you rotate the hub only the yaw will update

###### Parameters

- - -

###### up: int

The hub face that should be set as the upwards facing hub face.  
Available values are:

`motion_sensor.TOP` The SPIKE Prime hub face with the USB charging port.  
`motion_sensor.FRONT` The SPIKE Prime hub face with the Light Matrix.  
`motion_sensor.RIGHT` The right side of the SPIKE Prime hub when facing the front hub face.  
`motion_sensor.BOTTOM` The side of the SPIKE Prime hub where the battery is.  
`motion_sensor.BACK` The SPIKE Prime hub face where the speaker is.  
`motion_sensor.LEFT` The left side of the SPIKE Prime hub when facing the front hub face.

##### stable

stable() -> bool

Whether or not the hub is resting flat.

###### Parameters

- - -

##### tap\_count

tap\_count() -> int

Returns the number of taps recognized since the program started or last time `motion_sensor.reset_tap_count()` was called.

###### Parameters

- - -

##### tilt\_angles

tilt\_angles() -> tuple\[int, int, int\]

Returns a tuple containing yaw pitch and roll values as integers. Values are decidegrees

###### Parameters

- - -

##### up\_face

up\_face() -> int

Returns the Hub face that is currently facing up  
`motion_sensor.TOP` The SPIKE Prime hub face with the USB charging port.  
`motion_sensor.FRONT` The SPIKE Prime hub face with the Light Matrix.  
`motion_sensor.RIGHT` The right side of the SPIKE Prime hub when facing the front hub face.  
`motion_sensor.BOTTOM` The side of the SPIKE Prime hub where the battery is.  
`motion_sensor.BACK` The SPIKE Prime hub face where the speaker is.  
`motion_sensor.LEFT` The left side of the SPIKE Prime hub when facing the front hub face.

###### Parameters

- - -

##### Constants

- - -

##### hub.motion\_sensor Constants

**TAPPED** = 0

**DOUBLE\_TAPPED** = 1

**SHAKEN** = 2

**FALLING** = 3

**UNKNOWN** = -1

**TOP** = 0  
The SPIKE Prime hub face with the Light Matrix.  
**FRONT** = 1  
The SPIKE Prime hub face where the speaker is.  
**RIGHT** = 2  
The right side of the SPIKE Prime hub when facing the front hub face.  
**BOTTOM** = 3  
The side of the SPIKE Prime hub where the battery is.  
**BACK** = 4  
The SPIKE Prime hub face with the USB charging port.  
**LEFT** = 5  
The left side of the SPIKE Prime hub when facing the front hub face.

#### Port

This module contains constants that enables easy access to the ports on the SPIKE Prime hub. Use the constants in all functions that takes a `port` parameter.

To use the Port module add the following import statement to your project:

```
from hub import port
```

All functions in the module should be called inside the `port` module as a prefix like so:

```
port.A
```

##### Constants

- - -

##### hub.port Constants

**A** = 0  
The Port that is labelled ‘A’ on the Hub.  
**B** = 1  
The Port that is labelled ‘B’ on the Hub.  
**C** = 2  
The Port that is labelled ‘C’ on the Hub.  
**D** = 3  
The Port that is labelled ‘D’ on the Hub.  
**E** = 4  
The Port that is labelled ‘E’ on the Hub.  
**F** = 5  
The Port that is labelled ‘F’ on the Hub.

#### Sound

To use the Sound module add the following import statement to your project:

```
from hub import sound
```

All functions in the module should be called inside the `sound` module as a prefix like so:

```
sound.stop()
```

##### Functions

##### beep

beep(freq: int = 440, duration: int = 500, volume: int = 100, \*, attack: int = 0, decay: int = 0, sustain: int = 100, release: int = 0, transition: int = 10, waveform: int = WAVEFORM\_SINE, channel: int = DEFAULT) -> Awaitable

Plays a beep sound from the hub

###### Parameters

- - -

###### freq: int

The frequency to play

###### duration: int

The duration in milliseconds

###### volume: int

The volume (0-100)

###### Optional keyword arguments:

###### attack: int

The time taken for initial run-up of level from nil to peak, beginning when the key is pressed.

###### decay: int

The time taken for the subsequent run down from the attack level to the designated sustain level.

###### sustain: int

The level during the main sequence of the sound's duration, until the key is released.

###### release: int

The time taken for the level to decay from the sustain level to zero after the key is released

###### transition: int

time in milliseconds to transition into the sound if something is already playing in the channel

###### waveform: int

The synthesized waveform. Use one of the constants in the `hub.sound` module.

###### channel: int

The desired channel to play on, options are `sound.DEFAULT` and `sound.ANY`

##### stop

stop() -> None

Stops all noise from the hub

###### Parameters

- - -

##### volume

volume(volume: int) -> None

###### Parameters

- - -

###### volume: int

The volume (0-100)

##### Constants

- - -

##### hub.sound Constants

**ANY** = -2

**DEFAULT** = -1

**WAVEFORM\_SINE** = 1

**WAVEFORM\_SAWTOOTH** = 3

**WAVEFORM\_SQUARE** = 2

**WAVEFORM\_TRIANGLE** = 1

#### Functions

#### device\_uuid

device\_uuid() -> str

Retrieve the device id.

##### Parameters

- - -

#### hardware\_id

hardware\_id() -> str

Retrieve the hardware id.

##### Parameters

- - -

#### power\_off

power\_off() -> int

Turns off the hub.

##### Parameters

- - -

#### temperature

temperature() -> int

Retrieve the hub temperature. Measured in decidegrees celsius (d°C) which is 1 / 10 of a degree celsius (°C)

##### Parameters

- - -

### Motor

To use a Motor add the following import statement to your project:

```
import motor
```

All functions in the module should be called inside the `motor` module as a prefix like so:

```
motor.run(port.A, 1000)
```

#### Functions

#### absolute\_position

absolute\_position(port: int) -> int

Get the absolute position of a Motor

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### get\_duty\_cycle

get\_duty\_cycle(port: int) -> int

Get the pwm of a Motor

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### relative\_position

relative\_position(port: int) -> int

Get the relative position of a Motor

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### reset\_relative\_position

reset\_relative\_position(port: int, position: int) -> None

Change the position used as the offset when using the `run_to_relative_position` function.

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### position: int

The degree of the motor

#### run

run(port: int, velocity: int, \*, acceleration: int = 1000) -> None

Start a Motor at a constant speed

```
from hub import port
import motor, time

# Start motor 
motor.run(port.A, 1000)
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### Optional keyword arguments:

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

#### run\_for\_degrees

run\_for\_degrees(port: int, degrees: int, velocity: int, \*, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Turn a motor for a specific number of degrees  
When awaited returns a status of the movement that corresponds to one of the following constants:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### degrees: int

The number of degrees

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### run\_for\_time

run\_for\_time(port: int, duration: int, velocity: int, \*, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Run a Motor for a limited amount of time  
When awaited returns a status of the movement that corresponds to one of the following constants:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.ERROR`  
`motor.DISCONNECTED`

```
from hub import port
import runloop
import motor

async def main():
    # Run at 1000 velocity for 1 second 
    await motor.run_for_time(port.A, 1000, 1000)

    # Run at 280 velocity for 1 second 
    await motor_pair.run_for_time(port.A, 1000, 280)

    # Run at 280 velocity for 10 seconds with a slow deceleration 
    await motor_pair.run_for_time(port.A, 10000, 280, deceleration=10)

runloop.run(main())
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### duration: int

The duration in milliseconds

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### run\_to\_absolute\_position

run\_to\_absolute\_position(port: int, position: int, velocity: int, \*, direction: int = motor.SHORTEST\_PATH, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Turn a motor to an absolute position.  
When awaited returns a status of the movement that corresponds to one of the following constants:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### position: int

The degree of the motor

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### Optional keyword arguments:

##### direction: int

The direction to turn.  
Options are:

`motor.CLOCKWISE`  
`motor.COUNTERCLOCKWISE`  
`motor.SHORTEST_PATH`  
`motor.LONGEST_PATH`

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### run\_to\_relative\_position

run\_to\_relative\_position(port: int, position: int, velocity: int, \*, stop: int = BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Turn a motor to a position relative to the current position.  
When awaited returns a status of the movement that corresponds to one of the following constants:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### position: int

The degree of the motor

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### set\_duty\_cycle

set\_duty\_cycle(port: int, pwm: int) -> None

Start a Motor with a specific pwm

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### pwm: int

The PWM value (-10000-10000)

#### stop

stop(port: int, \*, stop: int = BRAKE) -> None

Stops a motor

```
from hub import port
import motor, time

# Start motor 
motor.run(port.A, 1000)

# Wait for 2 seconds 
time.sleep_ms(2000)

# Stop motor 
motor.stop(port.A)
```

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

#### velocity

velocity(port: int) -> int

Get the velocity (deg/sec) of a Motor

##### Parameters

- - -

##### port: int

A port from the `port` submodule in the `hub` module

#### Constants

- - -

#### motor Constants

**READY** = 0

**RUNNING** = 1

**STALLED** = 2

**CANCELLED** = 3

**ERROR** = 4

**DISCONNECTED** = 5

**COAST** = 0

**BRAKE** = 1

**HOLD** = 2

**CONTINUE** = 3

**SMART\_COAST** = 4

**SMART\_BRAKE** = 5

**CLOCKWISE** = 0

**COUNTERCLOCKWISE** = 1

**SHORTEST\_PATH** = 2

**LONGEST\_PATH** = 3

### Motor Pair

The `motor_pair` module is used to run motors in a synchronized fashion. This mode is optimal for creating drivebases where you'd want a pair of motors to start and stop at the same time.

To use the `motor_pair` module simply import the module like so:

```
import motor_pair
```

All functions in the module should be called inside the `motor_pair` module as a prefix like so:

```
motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
```

#### Functions

#### move

move(pair: int, steering: int, \*, velocity: int = 360, acceleration: int = 1000) -> None

Move a Motor Pair at a constant speed until a new command is given.

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    await runloop.sleep_ms(2000)

    # Move straight at default velocity 
    motor_pair.move(motor_pair.PAIR_1, 0)

    await runloop.sleep_ms(2000)

    # Move straight at a specific velocity 
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=280)

    await runloop.sleep_ms(2000)

    # Move straight at a specific velocity and acceleration 
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=280, acceleration=100)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### steering: int

The steering (-100 to 100)

##### Optional keyword arguments:

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

#### move\_for\_degrees

move\_for\_degrees(pair: int, degrees: int, steering: int, \*, velocity: int = 360, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Move a Motor Pair at a constant speed for a specific number of degrees.  
When awaited returns a status of the movement that corresponds to one of the following constants from the motor module:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity for 90 degrees 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 90, 0)

    # Move straight at a specific velocity 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 360, 0, velocity=280)

    # Move straight at a specific velocity with a slow deceleration 
    await motor_pair.move_for_degrees(motor_pair.PAIR_1, 360, 0, velocity=280, deceleration=10)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### degrees: int

The number of degrees

##### steering: int

The steering (-100 to 100)

##### Optional keyword arguments:

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### move\_for\_time

move\_for\_time(pair: int, duration: int, steering: int, \*, velocity: int = 360, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Move a Motor Pair at a constant speed for a specific duration.  
When awaited returns a status of the movement that corresponds to one of the following constants from the motor module:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity for 1 second 
    await motor_pair.move_for_time(motor_pair.PAIR_1, 1000, 0)

    # Move straight at a specific velocity for 1 second 
    await motor_pair.move_for_time(motor_pair.PAIR_1, 1000, 0, velocity=280)

    # Move straight at a specific velocity for 10 seconds with a slow deceleration 
    await motor_pair.move_for_time(motor_pair.PAIR_1, 10000, 0, velocity=280, deceleration=10)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### duration: int

The duration in milliseconds

##### steering: int

The steering (-100 to 100)

##### Optional keyword arguments:

##### velocity: int

The velocity in degrees/sec

Value ranges depends on motor type.

Small motor (essential): -660 to 660  
Medium motor: -1110 to 1110  
Large motor: -1050 to 1050

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### move\_tank

move\_tank(pair: int, left\_velocity: int, right\_velocity: int, \*, acceleration: int = 1000) -> None

Perform a tank move on a Motor Pair at a constant speed until a new command is given.

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity 
    motor_pair.move_tank(motor_pair.PAIR_1, 1000, 1000)

    await runloop.sleep_ms(2000)

    # Turn right 
    motor_pair.move_tank(motor_pair.PAIR_1, 0, 1000)

    await runloop.sleep_ms(2000)

    # Perform tank turn 
    motor_pair.move_tank(motor_pair.PAIR_1, 1000, -1000)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### left\_velocity: int

The velocity (deg/sec) of the left motor.

##### right\_velocity: int

The velocity (deg/sec) of the right motor.

##### Optional keyword arguments:

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

#### move\_tank\_for\_degrees

move\_tank\_for\_degrees(pair: int, degrees: int, left\_velocity: int, right\_velocity: int, \*, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Perform a tank move on a Motor Pair at a constant speed until a new command is given.  
When awaited returns a status of the movement that corresponds to one of the following constants from the motor module:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity for 360 degrees 
    await motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 360, 1000, 1000)

    # Turn right for 180 degrees 
    await motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 180, 0, 1000)

    # Perform tank turn for 720 degrees 
    await motor_pair.move_tank_for_degrees(motor_pair.PAIR_1, 720, 1000, -1000)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### degrees: int

The number of degrees

##### left\_velocity: int

The velocity (deg/sec) of the left motor.

##### right\_velocity: int

The velocity (deg/sec) of the right motor.

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### move\_tank\_for\_time

move\_tank\_for\_time(pair: int, left\_velocity: int, right\_velocity: int, duration: int, \*, stop: int = motor.BRAKE, acceleration: int = 1000, deceleration: int = 1000) -> Awaitable

Perform a tank move on a Motor Pair at a constant speed for a specific amount of time.  
When awaited returns a status of the movement that corresponds to one of the following constants from the motor module:

`motor.READY`  
`motor.RUNNING`  
`motor.STALLED`  
`motor.CANCELED`  
`motor.ERROR`  
`motor.DISCONNECTED`

```
from hub import port
import runloop
import motor_pair

async def main():
    # Pair motors on port A and B 
    motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)

    # Move straight at default velocity for 1 second 
    await motor_pair.move_tank_for_time(motor_pair.PAIR_1, 1000, 1000, 1000)

    # Turn right for 3 seconds 
    await motor_pair.move_tank_for_time(motor_pair.PAIR_1, 0, 1000, 3000)

    # Perform tank turn for 2 seconds 
    await motor_pair.move_tank_for_time(motor_pair.PAIR_1, 1000, -1000, 2000)

runloop.run(main())
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### duration: int

The duration in milliseconds

##### left\_velocity: int

The velocity (deg/sec) of the left motor.

##### right\_velocity: int

The velocity (deg/sec) of the right motor.

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

##### acceleration: int

The acceleration (deg/sec²) (1 - 10000)

##### deceleration: int

The deceleration (deg/sec²) (1 - 10000)

#### pair

pair(pair: int, left\_motor: int, right\_motor: int) -> None

pair two motors (`left_motor` & `right_motor`) and store the paired motors in `pair`.  
Use `pair` in all subsequent `motor_pair` related function calls.

```
import motor_pair
from hub import port

motor_pair.pair(motor_pair.PAIR_1, port.A, port.B)
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### left\_motor: int

The port of the left motor. Use the `port` submodule in the `hub` module.

##### right\_motor: int

The port of the right motor. Use the `port` submodule in the `hub` module.

#### stop

stop(pair: int, \*, stop: int = motor.BRAKE) -> None

Stops a Motor Pair.

```
import motor_pair

motor_pair.stop(motor_pair.PAIR_1)
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

##### Optional keyword arguments:

##### stop: int

The behavior of the Motor after it has stopped. Use the constants in the `motor` module.

Possible values are  
`motor.COAST` to make the motor coast until a stop  
`motor.BREAK` to brake and continue to brake after stop  
`motor.HOLD` to tell the motor to hold it's position  
`motor.CONTINUE` to tell the motor to keep running at whatever velocity it's running at until it gets another command  
`motor.SMART_COAST` to make the motor brake until stop and then coast and compensate for inaccuracies in the next command  
`motor.SMART_BRAKE` to make the motor brake and continue to brake after stop and compensate for inaccuracies in the next command

#### unpair

unpair(pair: int) -> None

Unpair a Motor Pair.

```
import motor_pair

motor_pair.unpair(motor_pair.PAIR_1)
```

##### Parameters

- - -

##### pair: int

The pair slot of the Motor Pair.

#### Constants

- - -

#### motor\_pair Constants

**PAIR\_1** = 0  
First Motor Pair  
**PAIR\_2** = 1  
Second Motor Pair  
**PAIR\_3** = 2  
Third Motor Pair

### Orientation

The `orientation` module contains all the orientation constants to use with the `light_matrix` module.

To use the orientation module add the following import statement to your project:

```
import orientation
```

#### Constants

- - -

#### orientation Constants

**UP** = 0

**RIGHT** = 1

**DOWN** = 2

**LEFT** = 3

### Runloop

The `runloop` module contains all functions and constants to use the Runloop.

To use the Runloop module add the following import statement to your project:

```
import runloop
```

All functions in the module should be called inside the `runloop` module as a prefix like so:

```
runloop.run(some_async_function())
```

#### Functions

#### run

run(\*functions: Awaitable) -> None

Start any number of parallel `async` functions. This is the function you should use to create programs with a similar structure to Word Blocks.

##### Parameters

- - -

##### \*functions: awaitable

The functions to run

#### sleep\_ms

sleep\_ms(duration: int) -> Awaitable

Pause the execution of the application for any amount of milliseconds.

```
from hub import light_matrix
import runloop

async def main():
    light_matrix.write("Hi!")
    # Wait for ten seconds 
    await runloop.sleep_ms(10000)
    light_matrix.write("Are you still here?")

runloop.run(main())
```

##### Parameters

- - -

##### duration: int

The duration in milliseconds

#### until

until(function: Callable\[\[\], bool\], timeout: int = 0) -> Awaitable

Returns an awaitable that will return when the condition in the function or lambda passed is `True` or when it times out

```
import color_sensor
import color
from hub import port
import runloop

def is_color_red():
    return color_sensor.color(port.A) is color.RED

async def main():
    # Wait until Color Sensor sees red 
    await runloop.until(is_color_red)
    print("Red!")

runloop.run(main())
```

##### Parameters

- - -

##### function: Callable\[\[\], bool\]

A callable with no parameters that returns either `True` or `False`.  
Callable is anything that can be called, so a `def` or a `lambda`

##### timeout: int

A timeout for the function in milliseconds.  
If the callable does not return `True` within the timeout, the `until` still resolves after the timeout.  
0 means no timeout, in that case it will not resolve until the callable returns `True`