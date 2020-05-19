let status = document.getElementById('status');
let debug = document.getElementById('debug');
let activity = document.getElementById('activity');
if ( 'Accelerometer' in window ) {
  let sensor = new LinearAccelerationSensor();
  var newMeasurement = {};

  sensor.addEventListener('reading', function(e) {
  status.innerHTML = 'x: ' + e.target.x + '<br> y: ' + e.target.y + '<br> z: ' + e.target.z;
  newMeasurement.x = e.target.x;
  newMeasurement.y = e.target.y;
  newMeasurement.z = e.target.z;

  var message = newMeasurement;
  /* Code to detect movement, uses .75 as threshold for length of Acc vector */
  var z = newMeasurement.z;
  var movement = Math.sqrt(Math.pow(newMeasurement.x, 2) + Math.pow(newMeasurement.y, 2) + Math.pow(z, 2));
  if(movement>0.75) {
	activity.innerHTML = "Walking " + movement;
  } else {
	activity.innerHTML = "Standing " + movement;
  }
  var msgEdge = JSON.stringify(message);

  //sending data to thingsboard
  const Http = new XMLHttpRequest();
  // Urls where to send the data
  const urlEdge='https://demo.thingsboard.io/api/v1/HrsluvZCQW99jxuqB8Kl/telemetry';
  const urlCloud='https://demo.thingsboard.io/api/v1/6U605oGsbAImxPYCicDB/telemetry'; // Wb6jsCSm5TKljCke0sjC
  
  Http.open("POST",urlEdge);
  Http.send(msgEdge);

  var msgCloud = '{\"sensor\":\"true\",\"x\":\"' + message.x + '\",\"y\":\"' + message.y + '\",\"z\":\"' + message.z + '\"}';
  Http.open("POST",urlCloud);
  Http.send(msgCloud);

  debug.innerHTML = '<br><br>' + msgEdge;
  setInterval( function() {}, 1000);
  });
  sensor.start();
}
else status.innerHTML = 'Accelerometer not supported';