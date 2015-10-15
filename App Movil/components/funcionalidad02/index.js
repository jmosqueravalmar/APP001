document.addEventListener("deviceready", onDeviceReady, false);
 

function onDeviceReady() {
    navigator.notification.alert(navigator.device.capture);
    navigator.splashscreen.hide();
    captureApp = new captureApp();
    captureApp.run();
    //navigator.notification.alert("entro");
}

function captureApp() {
}

//captureApp.prototype = {
  //  navigator.notification.alert("entro");
//}


   window.audio = kendo.observable({
     seleccionar: function() {
         //navigator.notification.alert("entro");
         var that = this;
         navigator.device.capture.captureAudio(function() {
         //that._captureSuccess.apply(that, arguments);
                var i,
                media = document.getElementById("media");
                media.innerHTML = "";
                for (i=0;i < capturedFiles.length;i+=1) {
                    media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
                }
           
         }, function() {
             navigator.notification.alert("Problemas con el APP");
         }, {limit:1});

      }
    });

