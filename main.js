let x = document.getElementById('x');
let y = document.getElementById('y');
let z = document.getElementById('z');
let activity = document.getElementById('activity');
if ( 'Accelerometer' in window ) {
  let sensor = new LinearAccelerationSensor();
  var newMeasurement = {};

  sensor.addEventListener('reading', function(e) {
  //container.innerHTML = '<div class=\"row\"><div class=\"col-sm text-center\">x: ' + e.target.x + '</div><div class=\"col-sm text-center\"> y: ' + e.target.y + '</div><div class=\"col-sm text-center\"> z: ' + e.target.z + '</div></div>';
  x.innerHTML = "x: " + e.target.x;
  y.innerHTML = "x: " + e.target.y;
  z.innerHTML = "x: " + e.target.z;
  /* 
   <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div> 
  */
  
  newMeasurement.x = e.target.x;
  newMeasurement.y = e.target.y;
  newMeasurement.z = e.target.z;

  var message = newMeasurement;
  /* Code to detect movement, uses .75 as threshold for length of Acc vector */
  var z = newMeasurement.z;
  var movement = Math.sqrt(Math.pow(newMeasurement.x, 2) + Math.pow(newMeasurement.y, 2) + Math.pow(z, 2));
  if(movement>0.75) {
	activity.innerHTML = '<div class=\"row alert alert-success text-center\"><div class=\"col-lg\"> Walking </div></div>';
  } else {
	activity.innerHTML = '<div class=\"row alert alert-info text-center\"><div class=\"col-lg\"> Standing still </div></div>';
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

  setInterval( function() {}, 1000);
  });
  sensor.start();
}
else y.innerHTML = 'Accelerometer not supported';