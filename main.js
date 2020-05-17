// Create a client instance
/*client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "Sensor" + parseInt(Math.random() * 100, 10));
var statusClient = document.getElementById("statusmqtt");
statusClient.innerHTML = 'ciao';

// cloud.thingsboard.io
// broker.hivemq.com 8000

// set callback handlers 
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client 
client.connect({
	onSuccess:onConnect,
	onFailure:onNotConnected
});
*/

//var measurements = [];
var connectedMessage = document.getElementById('status');
connectedMessage.innerHTML = 'I am here';
if ( 'Accelerometer' in window ) {
	/*var i = 0;
	connectedMessage.innerHTML = 'I am here - part 2';
	while(i<20) {
		// every 20 measurements sends them
		measurements.push(telemetry());
		i++;
		if(i==19) {
			i=0;
			var msg = JSON.stringify(measurements);
			message = new Paho.MQTT.Message(msg);
			message.destinationName = "v1/devices/me/telemetry";
			client.send(message);
			connectedMessage.innerHTML = "this is what I'm sending" + msg;
			measurements = [];
		}
	} */
	//let status = document.getElementById('status');
	var newMeasurement = {};
	let sensor = new Accelerometer();
	sensor.addEventListener('onreading', function(e) {
		//status.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
		newMeasurement.x = e.target.x;
		newMeasurement.y = e.target.y;
		newMeasurement.z = e.target.z;
	});
	sensor.start();
	var message = newMeasurement;
	/* 
	
	Code to implement the moving part
	
	*/
	var msg = JSON.stringify(message);
	
	//sending data to thingsboard
    const Http = new XMLHttpRequest();
    //Cloud device link
    const url='https://demo.thingsboard.io/api/v1/VhqAq7MkHVacvSARxKLc/telemetry';
    Http.open("POST",url);
    Http.send(msg);
 
	setInterval(updateStatus, 100);
}
else connectedMessage.innerHTML = 'Accelerometer not supported';
/*
// creates a new telemetry
function telemetry() {
	//let status = document.getElementById('status');
	var newMeasurement = {};
	let sensor = new Accelerometer();
	sensor.addEventListener('onreading', function(e) {
		//status.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
		newMeasurement.x = e.target.x;
		newMeasurement.y = e.target.y;
		newMeasurement.z = e.target.z;
	});
	sensor.start();
	return newMeasurement;
}

// called when the client connects 
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	//console.log("onConnect");
	var statusmqtt = document.getElementById("statusmqtt");
	statusmqtt.innerHTML = "connect";
	client.subscribe("v1/devices/me/telemetry");
	message = new Paho.MQTT.Message("\"x\":\"0\"");
	message.destinationName = "v1/devices/me/telemetry";
	client.send(message); 
}

// called when it doesnt work
function onNotConnected() {
	var statusmqtt = document.getElementById("statusmqtt");
	statusmqtt.innerHTML = "not connected";
}

// called when the client loses its connection 
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) { 
		console.log("onConnectionLost:"+responseObject.errorMessage);
	} 
}

// called when a message arrives 
function onMessageArrived(message) {
	console.log("onMessageArrived:"+message.payloadString); 
}
*/