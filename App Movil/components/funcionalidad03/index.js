'use strict';
app.funcionalidad03 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});

// START_CUSTOM_CODE_funcionalidad03 

var ListTareas = new kendo.data.DataSource({
    /*data: [
        {
            id: 1,
            idTTarea: 10,
            nombre: "Tarea Nro 1",
            cliente: "Cliente 1",
            fcreacion: "01/10/2015",
            flimite: "01/10/2015",
            estado: "pendiente",
            prioridad: "alto"
        }],*/
    transport: {
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Tareas/list/101",
            dataType: "json"
        }
    },
    schema: {
        data: function (data) {
            return data;
        }
    },
    pageSize: 8
});

var DetallTareas = new kendo.data.DataSource({
    data: [
        {
            idTTarea: 1,
            nombre: "Tipo de Tarea Nro 1",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 2,
            nombre: "Tipo de Tarea Nro 2",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 3,
            nombre: "Tipo de Tarea Nro 3",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 4,
            nombre: "Tipo de Tarea Nro 4",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 5,
            nombre: "Tipo de Tarea Nro 5",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 6,
            nombre: "Tipo de Tarea Nro 6",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 7,
            nombre: "Tipo de Tarea Nro 7",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 8,
            nombre: "Tipo de Tarea Nro 8",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 9,
            nombre: "Tipo de Tarea Nro 9",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 10,
            nombre: "Tipo de Tarea Nro 10",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 11,
            nombre: "Tipo de Tarea Nro 11",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 12,
            nombre: "Tipo de Tarea Nro 12",
            fcreacion: "01/10/2015"
        },
        {
            idTTarea: 13,
            nombre: "Tipo de Tarea Nro 13",
            fcreacion: "01/10/2015"
        }
                        ]
});


//Carga JavaScript 1st


function cargaEmpleados() {

    $("#tareas").kendoGrid({
            dataSource: ListTareas,
            height: 250,
            filterable: true,
            sortable: true,
            scrollable: false,
            pageable: true,
            selectable: "row",
            change: eventoClick,
            columns: [
                {
                    field: "tiptar_str_descripcion",                    
                    title: "Nombre de Tarea",
                    width: "360px"
            },
                {
                    field: "Usuario",
                    title: "Cliente",
                    width: "150px"
            },
                {
                    field: "tar_dat_fchcreacion",
                    title: "F. Creación",
                    template: "#= kendo.toString(kendo.parseDate(tar_dat_fchcreacion, 'dd-MM-yyyy'), 'MM/dd/yyyy') #",
                    width: "50px"
            }, {
                    field: "tar_dat_fchlimite",
                    title: "F. Limite",
                    template: "#= kendo.toString(kendo.parseDate(tar_dat_fchlimite, 'dd-MM-yyyy'), 'MM/dd/yyyy') #",
                    width: "50px"
            }, {
                    field: "tar_int_estado",
                    title: "Estado",
                	template: '#if(tar_int_estado==1){#<span class="k-icon k-i-unlock"></span>Pendiente#}else{#<span class="k-icon k-i-lock"></span>Cerrado#}#'
            }, {
                    field: "tar_int_prioridad",
                    title: "Prioridad",
                    template: '#if(tar_int_prioridad==1){#<span class = "glyphicon glyphicon-arrow-down text-success" aria-hidden = "true" ></span>Baja#}else{if(tar_int_prioridad==3){#<span class="glyphicon glyphicon-arrow-up text-danger" aria-hidden="true"></span>Alta#}else{#<span class = "glyphicon glyphicon glyphicon-arrow-right text-warning" aria-hidden="true"></span>Media#}}#',
     				width: "50px"
            }
            ]
    });
}

function viewFormTarea() {
    window.location.href = "#addTarea";
}
//Función Agregar Nueva Tarea
function addTarea() { 
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

function eventoClick() {
    var seleccion = $(".k-state-selected").select();
    var idTar = this.dataItem(seleccion).id;
    var idTTa = this.dataItem(seleccion).idTTarea;
    /*console.log("id tarea -> " + idTar);
    console.log("id tipo -> " + idTTa);*/

    window.location.href = "#detalleTarea?id=" + idTar + "&id2=" + idTTa;
}

window.llamada = function (e) {
    var seleccionado = e.view.params.id;
    var seleccionado2 = e.view.params.id2;
    console.log("id tarea -> " + seleccionado);
    console.log("id tipo -> " + seleccionado2);

    DetallTareas.filter({
        field: "idTTarea",
        operator: "eq",
        value: parseInt(seleccionado)
    });

    $("#detalle2").kendoListView({
        dataSource: DetallTareas,
        template: kendo.template($("#tema002").html())
    });

    var filtro = new kendo.data.DataSource({
        data: ListTareas
    });

    filtro.filter({
        field: "id",
        operator: "eq",
        value: parseInt(seleccionado2)
    });

    $("#detalle3").kendoListView({
        dataSource: ListTareas,
        template: kendo.template($("#tema003").html())
    });


}

// END_CUSTOM_CODE_funcionalidad03