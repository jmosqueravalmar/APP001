'use strict';

app.funcionalidad02 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_funcionalidad02

     window.app.funcionalidad02 = kendo.observable({
     seleccionar: function() {
         
         var valor = $( "#size option:selected" ).text();
	             
         navigator.notification.alert(valor);
         window.location.href = "#lista";
      }
    });


// END_CUSTOM_CODE_funcionalidad02
