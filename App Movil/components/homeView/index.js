'use strict';

app.homeView = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_homeView
var txtsUsuario = "";
var txtsContrasenia = "";
var dsLogin = null;
var DSroles, DSdatos, datos, roles;

function CleanDS() {
    $("#txtsUsuario").val("");
    $("#txtsUsuario").html("");
    $("#txtsContrasenia").val("");
    $("#txtsContrasenia").html("");
}

function LoginDS() {
    /*
     * DATOS PRUEBAS
     * jlcornejo - 123
     * rmanrique - rm0112ue
     */
    txtsUsuario = $("#txtsUsuario").val();
    txtsContrasenia = $("#txtsContrasenia").val();

    var notificationElement = $("#notification");
    notificationElement.kendoNotification();
    var notificationWidget = notificationElement.data("kendoNotification");

    if (isEmpty(txtsUsuario)) {
        notificationWidget.show("Ingrese el usuario", "error");
        return;
    }

    if (isEmpty(txtsContrasenia)) {
        notificationWidget.show("Ingrese la contraseña", "error");
        return;
    }

    dsLogin = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Inicio/AutentificaUsuario",
                dataType: "json",
                type: "post",
                data: {
                    txtsUsuario: txtsUsuario,
                    txtsContrasenia: txtsContrasenia
                }
            }
        },
        schema: {
            model: {
                fields: {
                    Id: {
                        editable: false,
                        nullable: true,
                        type: "number"
                    },
                    Tipo: {
                        type: "string"
                    },
                    Ejecucion: {
                        type: "number"
                    },
                }
            }
        },
        requestEnd: function (e) {
            //console.log("dsLogin >> requestEnd");

        },
    });

    dsLogin.fetch(function () {
        var data = this.data();
        /*
         * data[0].Ejecucion --> status autenticacion
         * VALORES
         * --> 0 ERROR usuario autenticado correctamente
         * --> 1 ERROR usuario no autenticado
         */
        var resLogin = 1;
        resLogin = data[0].Ejecucion;

        if (resLogin === 0) {
            $("#MenuPrincipal").show();

            //Store UsuarioID global js var app.js file
            //UsuarioID = data[0].Id;
            var userID = data[0].Id;
			
            DSdatos = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://www.ausa.com.pe/appmovil_test01/Usuarios/Datos/" + userID,
                        dataType: "json"
                    }
                }
            });

            DSdatos.fetch(function () {
                var data = this.data();
                //console.log("Log=>"+data[0].Column1);
                datos = data[0].Column1;
                $("#NombreUsuario").html("Usuario: " + datos);
                $("#fUsuario").html("Usuario: " +datos);
            });

            $("#UsuarioSesion").val(userID);
			sessionStorage.setItem("sessionUSER",userID); 
            //console.log("user:"+sessionStorage.getItem("sessionUSER"));
            $("#fun01").show();
            $("#fun02").show();
            $("#fun03").show();

            /*
            funciones para roles y mostrar ocultar segun sea el caso
            */
			
            $("#txtsUsuario").val("");
            $("#txtsUsuario").html("");
            $("#txtsContrasenia").val("");
            $("#txtsContrasenia").html("");
			 
            window.location.href = "#AutenticacionOK";

        }

        if (resLogin === 1) {
            notificationWidget.show("Error de Autenticación", "error");
            notificationWidget.show("Usuario y/o Contraseña no son válidos", "error");
        }

    });
}

/*function cargaSesion(){
    UsuarioID = $('input:hidden[name=UsuarioSesion]').val();
}*/

function isEmpty(str) {
    return (!str || 0 === str.length);
}

// END_CUSTOM_CODE_homeView