'use strict';

app.homeView = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_homeView
var txtsUsuario = "";
var txtsContrasenia = "";
var dsLogin = null;

function LoginDS(){
    /*
    * DATOS PRUEBAS
    * jlcornejo - 123
    * rmanrique - rm0112ue
    */
   	txtsUsuario = $("#txtsUsuario").val();
   	txtsContrasenia = $("#txtsContrasenia").val();
   	//console.log("fx Login2() pars >>> usr: " + txtsUsuario + " pwd: " + txtsContrasenia);
    
    var notificationElement = $("#notification");
    notificationElement.kendoNotification();
    var notificationWidget = notificationElement.data("kendoNotification");
    
    if (isEmpty(txtsUsuario)){
        notificationWidget.show("Favor ingresar el usuario", "error");
        return;
    }
    
    if (isEmpty(txtsContrasenia)){
        notificationWidget.show("Favor ingresar la contrasenia", "error");
        return;
    }

    dsLogin = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://54.213.238.161/wsAusa/Inicio/AutentificaUsuario",
                dataType: "json",
                type: "post",
                data: {
                    txtsUsuario: txtsUsuario, txtsContrasenia: txtsContrasenia
                }
            }
        },
        schema: {
            model: {
                fields: {
                    Id: { editable: false, nullable: true, type: "number" },
                    Tipo:  {type: "string"},
                    Ejecucion: {type: "number"},
                }
            }
        },
        requestEnd: function(e) {
            console.log("dsLogin >> requestEnd");

        },
    });    
    
    dsLogin.fetch(function(){
        var data = this.data();
        //console.log("Res Login2() >>> Id: " + data[0].Id + " Tipo: " + data[0].Tipo + " Ejecucion: " + data[0].Ejecucion);
        /*
        * data[0].Ejecucion --> status autenticacion
        * VALORES 
        * --> 0 ERROR usuario autenticado correttamente
        * --> 1 ERROR usuario no autenticado
        */
        var resLogin = 1;
        resLogin = data[0].Ejecucion;
        
        if (resLogin === 0){
          //notificationWidget.show("Autenticacion exitosa", "success");
          /*
          * TODO-FIX: enable dynamically the Swipe to Open fx on the drawer (data-role) element look @ tag div id="appDrawer" index.html
          * TODO-WIP: implement function menu dynamically based on user role
          */
          $("#MenuPrincipal").show();
          //Store UsuarioID global js var app.js file
          UsuarioID = data[0].Id;
          $("#NombreUsuario").html(txtsUsuario);
          $("#UsuarioID").html(UsuarioID);
          window.location.href = "#AutenticacionOK";
        }
        
        if (resLogin === 1){
          notificationWidget.show("Error de Autenticacion", "error");
          notificationWidget.show("Usuario y/o Contrasenia no correctos", "error");
        }
        
    });
}

function isEmpty(str){
    return (!str || 0 === str.length);
}

// END_CUSTOM_CODE_homeView
