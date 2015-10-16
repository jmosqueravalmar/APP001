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
            window.plugins.toast.showShortCenter("Upload");
        }, function(err) {
            window.plugins.toast.showShortCenter(err);
        });
     }, function() {
         navigator.notification.alert("Problemas con el APP");
     }, {limit:1});

  }
});


function otro(capturedFiles) {
    navigator.notification.alert("entro 22222");
        //var options = {
            //fileName: 'audio.3gpp',
            //mimeType: 'audio/3gpp'
         //};
         
        //el.files.upload(capturedFiles[0].fullPath ,options)
        //.then(function() {
            //window.plugins.toast.showShortCenter("Upload");
        //}, function(err) {
            //window.plugins.toast.showShortCenter(err);
        //});
}
