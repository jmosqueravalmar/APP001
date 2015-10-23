document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    //navigator.notification.alert(navigator.device.capture);
    navigator.splashscreen.hide();
    captureApp = new captureApp();
    captureApp.run();
}

function captureApp() {
}

window.audio = kendo.observable({
 seleccionar: function() {
     var that = this;
     navigator.device.capture.captureAudio(function(capturedFiles) {
         //navigator.notification.alert(capturedFiles);
         //captureSuccess.apply(that, arguments);
         
        var apiKey = "Mosi1tOaeZ84K0L1";
    	var el = new Everlive(apiKey);
         
          var options = {
            fileName: 'audio.3gpp',
            mimeType: 'audio/3gpp'
         };
         
        el.files.upload(capturedFiles[0].localURL ,options)
        .then(function() {
            var media = document.getElementById("media");
			media.innerHTML = "";
            media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[0].fullPath + '</p>'


            window.plugins.toast.showShortCenter("Upload");
        }, function(err) {
            window.plugins.toast.showShortCenter(err);
        });
     }, function() {
         navigator.notification.alert("Problemas con el APP");
     }, {limit:1});

  },
  descargar: function() {
      var apiKey2 = "Mosi1tOaeZ84K0L1";
   	  var el2 = new Everlive(apiKey2);
      
	var fileToDownload = '49fdb290-7681-11e5-b8f2-37fba7e59af4';
    var pathOnDevice = 'file:/storage/emulated/0/audio.3gpp';
    el2.files.download(fileToDownload, pathOnDevice)
    .then(function() {
        navigator.notification.alert("correcto");
    }, function(err) {
        navigator.notification.alert("Problemas con el APP");
    	});
    }
    
    });



