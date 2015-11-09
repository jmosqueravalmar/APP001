'use strict';

app.PruebaTareas = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
});

function adminTareas() {
    window.location.href = "#addTipoTarea";
}

function addTipoTarea() {
    var valido = true;
    $('#txtnombre, #txtdescripcion, #txtuserid').parent().parent().removeClass("has-error");
    if ($('#txtnombre').val() == "") {
        $('#txtnombre').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtdescripcion').val() == "") {
        $('#txtdescripcion').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtuserid').val() == "") {
        $('#txtuserid').parent().parent().addClass("has-error");
        valido = false;
    }
    valido && $.ajax({
        type: "POST",
        url: 'http://www.ausa.com.pe/appmovil_test01/Tareas/tipoinsertdos',
        data: {
            txtnombre: $('#txtnombre').val(),
            txtdescripcion: $('#txtdescripcion').val(),
            txtuserid: 111
        },
        async: false,
        success: function (datos) {
            if (datos.replace(/^\s+/g, '').replace(/\s+$/g, '') == '[{"Ejecucion":0}]') {// Lo que devuelve el servidor
                var notificationElement = $("#notification");
                notificationElement.kendoNotification();
                var notificationWidget = notificationElement.data("kendoNotification");
                notificationWidget.show("Se agregó nuevo tipo de tarea", "success");
            } else {
                var notificationElement = $("#notification");
                notificationElement.kendoNotification();
                var notificationWidget = notificationElement.data("kendoNotification");
                notificationWidget.show("No se pudo agregar el tipo de tarea", "error");
            }
        },
        error: function () {
            var notificationElement = $("#notification");
            notificationElement.kendoNotification();
            var notificationWidget = notificationElement.data("kendoNotification");
            notificationWidget.show("No se puede establecer la conexión al servicio", "warning");
        }
    });
}