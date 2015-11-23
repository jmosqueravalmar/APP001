'use strict';

app.homeView = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_homeView
// END_CUSTOM_CODE_homeView

function autenticar() {

    $.soap({
        url: 'http://www.ausa.com.pe/WS_SVU/ws_svu.asmx?op=',
        method: 'nuevaAutenticacion',

        data: {
           userName: 'jlcornejo',
            password: '123'
        },

        success: function (soapResponse) {
            // do stuff with soapResponse
            // if you want to have the response as JSON use soapResponse.toJSON();
            // or soapResponse.toString() to get XML string
            alert(soapResponse.toString());
            // or soapResponse.toXML() to get XML DOM
        },
        error: function (SOAPResponse) {
            // show error
            alert("error");
        }
    });
 

}

jQuery.support.cors = true;
 