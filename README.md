cowboymouth
===========

Handles any stream communication with sensor gateway


### Usage

```js

var mouth = new Mouth(stream);
mouth.on('addon', function (addon) {

    // handle addon data
});
```


### Constructor

Pass in a readable and writable stream to the constructor.  This should be a serial port or ethernet stream connected
to an arduino gateway.  Used for reading and writing data to the mysensor gateway.


### Events

- `addon` - emits addon object when an addon registers itself with the gateway.  The signature is `function (addon)`
    An `addon` object has the following structure:

    ```js
    {
        "boardId": int,
        "addonId": int,
        "type": string,
    }
    ```
    
- `log` - emits when a board sends a message to log.  The signature is `function (log)`
    A `log` object has the following structure:

    ```js
    {
        "boardId": int,
        "message": string,
        "time": date
    }
    ```

- `name` - emits when a board sends the sketch name.  The signature is `function (sketch)`
    A `sketch` object has the following structure:

    ```js
    {
        "boardId": int,
        "name": string
    }
    ```

- `version` - emits when a board sends the sketch version.  The signature is `function (version)`
    A `version` object has the following structure:

    ```js
    {
        "boardId": int,
        "version": string
    }
    ```

- `battery` - emits when a board sends a battery level.  The signature is `function (battery)`
    A `battery` object has the following structure:

    ```js
    {
        "boardId": int,
        "level": float
    }
    ```

- `protocol` - emits when the gateway records the protocol type.  The signature is `function (protocol)`
- `reading` - emits when a sensor sends data to the gateway.  The signature is `function (reading)`
    A `reading` object has the following structure:

    ```js
    {
        "boardId": int,
        "addonId": int,
        "value": string/bool,
        "type": string,
        "time": date
    }
    ```

### `sendCommand(command, [callback])`

To send a command use a command object like the following:

```
{
    boardId,
    addonId,
    type,
    value
}
```



### Addon Types

An addon can be one of the following types:

* door: 'Door and window sensor',
* motion: 'Motion sensor',
* smoke: 'Smoke sensor',
* light_switch: 'Turn a light on or off',
* dimmer: 'Control a dimmer',
* window_shade: 'Open or close a window shade',
* temperature: 'Temperature sensor',
* humidity: 'Humidity sensor',
* barometer: 'Barometer sensor',
* wind: 'Wind sensor',
* rain: 'Rain sensor',
* uv: 'Ultraviolet sensor',
* weight: 'Weight sensor',
* power: 'Power sensor',
* heater: 'Control a heater',
* distance: 'Distance sensor',
* light: 'Light sensor',
* board: 'Arduino board',
* board_relay: 'Arduino relay',
* lock: 'Control a lock',
* ir: 'IR sender and receiver',
* water: 'Water sensor',
* air: 'Air sensor',
* custom: 'Any custom sensor or controller',
* dust: 'Dust sensor',
* scene: 'Control a scene'


### Addon Sensor Values

An addon sensor can be one of the following value types

* temperature
* humidity
* pressure
* weather_forecast
* rain_amount
* rain_rate
* wind_speed
* wind_gust
* wind_direction
* uv
* weight
* distance
* impedance
* armed
* movement
* watt
* kmh
* custom1
* custom2
* custom3
* custom4
* custom5
* ir_receive
* water_flow
* volume
* dust_level
* voltage
* current


An addon can be controlled with one of the following value types

* light_switch: 1 = On, 0 = Off
* dimmer: 0-100
* scene_on
* scene_off
* heater:  One of "Off", "HeatOn", "CoolOn", or "AutoChangeOver"
* heater_switch: 1 = On, 0 = Off
* light_level: 0-100
* custom1
* custom2
* custom3
* custom4
* custom5
* window_shade_up
* window_shade_down
* window_shade_stop
* ir_send
* lock: 1 = Lock, 0 = Unlock
