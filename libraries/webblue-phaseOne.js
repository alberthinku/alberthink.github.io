//of index js code
var connected = false;
var services_discovered = false;
var selected_device;
var connected_server;
//service UUID
ACCELEROMETER_SERVICE = 'e95d0753-251d-470a-a062-fa1922dfa9a8';
LED_SERVICE = 'e95dd91d-251d-470a-a062-fa1922dfa9a8';
DEVICE_INFORMATION_SERVICE = '0000180a-0000-1000-8000-00805f9b34fb';

//presence of services and characteristics
var has_accelerometer_service = false;
var has_accelerometer_data = false;

var has_led_service = false;
var has_led_matrix_state = false;

var has_device_information_service = false;
var has_model_name_string = false;

//Characteristic UUIDS
ACCELEROMETER_DATA = 'e95dca4b-251d-470a-a062-fa1922dfa9a8';
LED_MATRIX_STATE = 'e95d7b77-251d-470a-a062-fa1922dfa9a8';
MODEL_NUMBER_STRING = '00002a24-0000-1000-8000-00805f9b34fb';

//cached characteristics
var accelerometer_data;
var led_matrix_state;
var model_number_string;

var notification_enabled = false;



// /**
// * Define the variables that we're going to use
// */

// // Refresh rate (in milliseconds - 1000 per second)
// //
// // *** This is not actually used on this page because     ***
// // *** setTimeout() is not used - requestAnimationFrame() ***
// // *** is used instead which handles the timing for you   ***
// var delayCount = 1;
// var samplesCount = 0;

// // Number of points shown on the chart
// var points = 100;

// // Make a data array of null values
// for (var i = 0, data = []; i < points; ++i) {
//     data[i] = null;
// }

// // A shortcut reference to the global RGraph object
// var RG = RGraph;

// // A shortcut reference to the global Math object
// var ma = Math;

// // The maximum Y value on the chart
// var max = 2.0;

// // The minimum Y value on the chart
// var min = -2.0;

// // Halfway between the minimum and maximum
// var num = (((max - min) / 2) + min);
// //var num_X = num_Y = num_Z = num;

// // Generate the labels that are spread across the X axis.
// var labels = ['20s', '18s', '16s', '14s', '12s', '10s', '8s', '6s', '4s', '2s', '0s'];

// // The increment/decrement of each iteration
// var delta = 0.1;

// /**
// * Draw the chart. On subsequent draws this chart is updated with new data and
// * redrawn. This is faster than creating a whole new object and drawing that.
// */
// var obj_X = new RGraph.Line({
//     id: 'cvs',
//     data: data,
//     options: {
//         marginLeft: 35,
//         yaxisScaleMax: max,
//         yaxisScaleMin: min,
//         tickmarksStyle: null,
//         linewidth: 1,
//         shadow: null,
//         backgroundGridVlines: false,
//         backgroundGridBorder: false,
//         backgroundGridColor: '#eee',
//         color: 'black',
//         xaxisTickmarksCount: 5,
//         axesColor: '#666',
//         textColor: '#666',
//         textSize: 14,
//         colors: ['red'],
//         xaxisLabels: labels,
//         xaxis: false
//     }
// }).draw();

// var obj_Y = new RGraph.Line({
//     id: 'cvs',
//     data: data,
//     options: {
//         marginLeft: 35,
//         yaxisScaleMax: max,
//         yaxisScaleMin: min,
//         tickmarksStyle: null,
//         linewidth: 1,
//         shadow: null,
//         backgroundGridVlines: false,
//         backgroundGridBorder: false,
//         backgroundGridColor: '#eee',
//         color: 'black',
//         xaxisTickmarksCount: 5,
//         axesColor: '#666',
//         textColor: '#666',
//         textSize: 14,
//         colors: ['green'],
//         xaxisLabels: labels,
//         xaxis: false
//     }
// }).draw();

// var obj_Z = new RGraph.Line({
//     id: 'cvs',
//     data: data,
//     options: {
//         marginLeft: 35,
//         yaxisScaleMax: max,
//         yaxisScaleMin: min,
//         tickmarksStyle: null,
//         linewidth: 1,
//         shadow: null,
//         backgroundGridVlines: false,
//         backgroundGridBorder: false,
//         backgroundGridColor: '#eee',
//         color: 'black',
//         xaxisTickmarksCount: 5,
//         axesColor: '#666',
//         textColor: '#666',
//         textSize: 14,
//         colors: ['blue'],
//         xaxisLabels: labels,
//         xaxis: false
//     }
// }).draw();

// /**
// * This is the main draw function that is called multiple times per
// * second to update the chart with new data. It:
// * 
// * 1. Clears the canvas so that it's ready to be drawn on again
// * 2. Removes a piece of data from the rear of the Line chart internal data
// *    variable
// * 3. Adds a new piece of data to the end of the same array
// * 4. Draws the chart again
// */
// function draw(num_X, num_Y, num_Z) {
//     // Clear (NOT reset) the canvas
//     RG.clear(obj_X.canvas);
//     RG.clear(obj_Y.canvas);
//     RG.clear(obj_Z.canvas);

//     // Generate a random number between -5 and 5 and add it to the num
//     // variable. Adding a small change instead of generating a whole new
//     // value results in a gentler change.
//     //num += RG.random(-1 * delta, delta);

//     // Limit the num variable to minimum - maximum
//     //    num = ma.max(min, num);
//     //    num = ma.min(max, num);

//     // Remove a number from the front of the data array
//     obj_X.original_data[0].shift();
//     obj_Y.original_data[0].shift();
//     obj_Z.original_data[0].shift();

//     // Add the new number on to end of the data array
//     obj_X.original_data[0].push(num_X);
//     obj_Y.original_data[0].push(num_Y);
//     obj_Z.original_data[0].push(num_Z);

//     // Draw the chart
//     obj_X.draw();
//     obj_Y.draw();
//     obj_Z.draw();

//     // Call this function again after the delay (using requestAnimationFrame()
//     // NOT setTimeout() ). This function is a compatibility wrapper around
//     // requestAnimationFrame()
//     //RG.Effects.updateCanvas(draw);
// }

// //draw();

// //processing notifications
// function onAccelerometerData(event) {
//     console.log("onAccelerometerData");
//     buffer = event.target.value.buffer;
//     dataview = new DataView(buffer);
//     // X = dataview.getUint16(0, true) / 1000;
//     // Y = dataview.getUint16(2, true) / 1000;
//     // Z = dataview.getUint16(4, true) / 1000;
//     X = dataview.getInt16(0, true) / 1000;
//     Y = dataview.getInt16(2, true) / 1000;
//     Z = dataview.getInt16(4, true) / 1000;
//     console.log("X = " + X + ", Y = " + Y + ", Z = " + Z);
//     document.getElementById("accelerometer_data").innerHTML = "X = " + X + ", Y = " + Y + ", Z = " + Z;
//     //draw();
//     samplesCount++;
//     if (samplesCount == delayCount) {
//         // num_X = X;
//         // num_Y = Y;
//         // num_Z = Z;
//         samplesCount = 0;
//         RG.Effects.updateCanvas(draw(X, Y, Z));
//     }
//     //RG.Effects.updateCanvas(draw);
// }

function setNotificationStatus(status) {
    notification_enabled = status;
    document.getElementById('status_notifications').innerHTML = status;
}

function setConnectedStatus(status) {
    connected = status;
    document.getElementById('status_connected').innerHTML = status;
    if (status == true) {
        document.getElementById('btn_scan').innerHTML = "Disconnect";
    } else {
        document.getElementById('btn_scan').innerHTML = "Discover Devices";
    }
}
function setDiscoveryStatus(status) {
    services_discovered = status;
    document.getElementById('status_discovered').innerHTML = status;
}

function discoverDevicesOrDisconnect() {
    console.log("discoverDevicesOrDisconnect");
    if (!connected) {
        discoverDevices();
    } else {
        selected_device.gatt.disconnect();
        resetUI();
    }
}

function discoverDevices() {
    console.log("discoverDevices");

    var options = {
        //acceptAllDevices: true
        filters: [{ namePrefix: 'BBC' }],
        optionalServices: [DEVICE_INFORMATION_SERVICE, ACCELEROMETER_SERVICE, LED_SERVICE]
    }

    navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log('> Name:           ' + device.name);
            console.log('> Id:             ' + device.id);
            console.log('> Connected:      ' + device.gatt.connected);
            selected_device = device;
            console.log(selected_device);
            connect();// this function will connect to the device
        })
        .catch(error => {
            alert('ERROR: ' + error);
            console.log('ERROR: ' + error);
        });

}
function readModelNumber() {
    console.log("readModelNumber");
    //state validation
    if (!connected) {
        alert("Error: Discover and connect to a device before using this function");
        return;
    }
    if (!services_discovered) {
        alert("Error: Service discovery has not yet completed");
        return;
    }
    if (!has_device_information_service) {
        alert("Error: The connected device does not contain the device information service");
        return;
    }
    model_number_string.readValue()
        .then(value => {
            data = new Uint8Array(value.buffer);
            model_number_string = new TextDecoder("utf-8").decode(data);
            console.log(model_number_string);
            document.getElementById("model_number").innerHTML = model_number_string;
        })
        .catch(error => {
            console.log('Error: ' + error);
            alert('Error: ' + error);
            return;
        })
}

function randomLEDs() {
    console.log("randomLEDs");
    //state validation
    if (!connected) {
        alert("Error: Discover and connect to a device befofe using this function");
        return;
    }
    if (!services_discovered) {
        alert("Error: Service discovery has not yet completed");
        return;
    }
    if (!has_led_service) {
        alert("Error: The connected device does not contatin the LED service");
        return;
    }
    if (!has_led_matrix_state) {
        alert("Error: The connected device does not contain the LED matrix state characteristic");
        return;
    }
    var led_array = [0, 0, 0, 0, 0];
    led_array[0] = Math.floor(Math.random() * 32);
    led_array[1] = Math.floor(Math.random() * 32);
    led_array[2] = Math.floor(Math.random() * 32);
    led_array[3] = Math.floor(Math.random() * 32);
    led_array[4] = Math.floor(Math.random() * 32);

    var led_matrix_data = new Uint8Array(led_array);

    led_matrix_state.writeValue(led_matrix_data.buffer)
        .then(_ => {
            console.log('LED matrix state changed');
        })
        .catch(error => {
            console.log('Error: ' + error);
            alert('Error: ' + error);
            return;
        });
}

function toggleAccelerometerNotifications() {
    console.log("toggleAccelerometerNotifications");
    //state validation
    if (!connected) {
        alert("Error: Discover and connect to a device before using this function");
        return;
    }
    if (!services_discovered) {
        alert("Error: Service discovery has not yet completed");
        return;
    }
    if (!has_accelerometer_service) {
        alert("Error: The connected device does not contain the accelerometer service");
        return;
    }
    if (!has_accelerometer_data) {
        alert("Error: The connected device does not contain the accelerometer data characteristic");
        return;
    }

    //enable or disable notification
    if (!notification_enabled) {
        accelerometer_data.startNotifications()
            .then(_ => {
                console.log('accelerometer notification started');
                setNotificationStatus(true);
                //when a noticiation for a characteristic is received, an event if fired with the characteristic value attached to it
                //below is to register a funcction to handle this event
                accelerometer_data.addEventListener('characteristicvaluechanged', onAccelerometerData);
            })
            .catch(error => {
                console.log('Error: ' + error);
                alert('Error: ' + error);
                return;
            });
    } else {
        accelerometer_data.stopNotifications()
            .then(_ => {
                console.log('accelerometer notificaitons stopped');
                setNotificationStatus(false);
                //remove this event listener when we unsubscribe
                accelerometer_data.removeEventListener('characteristicvaluechanged', onAccelerometerData);
            })
            .catch(error => {
                console.log('Could not stop accelerometer_data notifications: ' + error);
            });
    }
}



function connect() {
    if (connected == false) {
        console.log('connecting');
        selected_device.gatt.connect().then(
            function (server) {
                console.log('Connected to ' + server.device.id);
                console.log('connected = ' + server.connected);
                setConnectedStatus(true);
                connected_server = server;
                selected_device.addEventListener(
                    'gattserverdisconnected',
                    onDisconnected);
                discoverSvcsAndChars();
            },
            function (error) {
                console.log('ERROR: could not connect -' + error);
                alert('ERROR: could not connect -' + error);
                setConnectedStatus(false);
            }
        );
    }
}

function onDisconnected() {
    console.log("onDisconnected");
    resetUI();
}

function resetUI() {
    setConnectedStatus(false);
    setDiscoveryStatus(false);
    setNotificationStatus(false);
    document.getElementById('model_number').innerHTML = "";
    document.getElementById('accelerometer_data').innerHTML = "";

}

function discoverSvcsAndChars() {
    console.log("discoverSvcsAndChars server=" + connected_server);
    connected_server.getPrimaryServices()
        .then(services => {
            has_accelerometer_service = false;
            has_led_service = false;
            has_device_information_service = false;

            services_discovered = 0;
            service_count = services.length;
            console.log("Got" + service_count + " services");

            services.forEach(service => {
                if (service.uuid == ACCELEROMETER_SERVICE) {
                    has_accelerometer_service = true;
                }
                if (service.uuid == LED_SERVICE) {
                    has_led_service = true;
                }
                if (service.uuid == DEVICE_INFORMATION_SERVICE) {
                    has_device_information_service = true;
                }
                console.log('getting Characteristics for service' + service.uuid);
                service.getCharacteristics().then(characteriscs => {
                    console.log('> Service: ' + service.uuid);
                    services_discovered++;
                    characteriscs_discovered = 0;
                    characterisc_count = characteriscs.length;
                    characteriscs.forEach(characterisc => {
                        characteriscs_discovered++;
                        console.log('>> Characteristic: ' + characterisc.uuid);
                        if (characterisc.uuid == ACCELEROMETER_DATA) {
                            accelerometer_data = characterisc;
                            has_accelerometer_data = true;
                        }
                        if (characterisc.uuid == LED_MATRIX_STATE) {
                            led_matrix_state = characterisc;
                            has_led_matrix_state = true;
                        }
                        if (characterisc.uuid == MODEL_NUMBER_STRING) {
                            model_number_string = characterisc;
                            has_model_name_string = true;
                        }
                        if (services_discovered = service_count && characteriscs_discovered == characterisc_count) {
                            console.log("FINISHED DISCOVERY");
                            setDiscoveryStatus(true);
                        }
                    });
                });
            });
        });
}

