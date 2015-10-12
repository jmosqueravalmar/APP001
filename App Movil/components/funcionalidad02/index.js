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


    window.get = function(e) {
        var selectedContactId = e.view.params.id;
        
        alert(selectedContactId);
        
        //var options = new ContactFindOptions();
        //options.filter = e.view.params.id;
        //options.multiple = true;       
        //var fields = ["*"];   
        //navigator.contacts.find(fields, onContactDetail123Success, onError, options);
	}

    
// END_CUSTOM_CODE_funcionalidad02
