'use strict';
app.funcionalidad03 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});

//DataSorce tareas
var dsTareas = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Tareas/listar/101",
            dataType: "json"
        }
    },
    schema: {
        data: function (data) {
            return data;
        }
    },
    pageSize: 10
});
//Carga dsTareas
function getTareas() {
    $("#tareas").kendoGrid({
        dataSource: dsTareas,
        height: 250,
        filterable: true,
        sortable: true,
        scrollable: false,
        pageable: true,
        selectable: "row",
        change: selectGrid,
        columns: [
                /*{
            field: "tar_int_id",
            title: "id",
    		format: '{0:n2} %'
        	},*/
            {
                //field: "tiptar_str_nombre",
                field: "tipotarea",
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
        //DataSource del select tipo de tarea        
        var dsTipoTarea = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Tareas/tipolistar",
                    dataType: "json"
                }
            },
            schema: {
                data: function (data) {
                    return data;
                }
            }
        });

        //Cargamos select tipo de tarea con dsTipoTarea
        $("#txtidtt").kendoDropDownList({
            dataTextField: "tiptar_str_nombre",
            dataValueField: "tiptar_int_id",
            dataSource: dsTipoTarea
        });
    }
    //Función Agregar Nueva Tarea
function addTarea() {
    var valido = true;
    $('#txtuserid, #txtidtt, #txtorden, #txtobserv, #txtdetalle, #txtflimite').parent().parent().removeClass("has-error");

    if ($('#txtidtt option').size() == 0) {
        $('#txtidtt').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtorden').val() == "") {
        $('#txtorden').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtobserv').val() == "") {
        $('#txtobserv').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtdetalle').val() == "") {
        $('#txtdetalle').parent().parent().addClass("has-error");
        valido = false;
    }

    if ($('#txtflimite').val() == "") {
        $('#txtflimite').parent().parent().addClass("has-error");
        valido = false;
    }

    console.log(101);
    console.log($('#txtidtt option:selected').val());
    console.log($('#txtorden').val());
    console.log($('#txtobserv').val());
    console.log($('#txtdetalle').val());
    console.log($('input:radio[name=txtprioridad]:checked').val());
    console.log($('#txtflimite').val().replace("-", "/").replace("-", "/") + " 00:00:00");
    valido && $.ajax({
        type: "POST",
        url: 'http://www.ausa.com.pe/appmovil_test01/Tareas/insert',
        data: {
            txtuserid: 101,
            txtidtt: $('#txtidtt option:selected').val(),
            txtorden: $('#txtorden').val(),
            txtobserv: $('#txtobserv').val(),
            txtdetalle: $('#txtdetalle').val(),
            txtprioridad: $('input:radio[name=txtprioridad]:checked').val(),
            txtflimite: $('#txtflimite').val().replace("-", "/").replace("-", "/") + " 00:00:00"
        },
        async: false,
        success: function (datos) {
            if (datos.replace(/^\s+/g, '').replace(/\s+$/g, '') == '[{"Ejecucion":0}]') { // Lo que devuelve el servidor 0=insertado 1=error
                var notificationElement = $("#notification");
                notificationElement.kendoNotification();
                var notificationWidget = notificationElement.data("kendoNotification");
                notificationWidget.show("Se agregó la nueva tarea", "success");
            } else {
                var notificationElement = $("#notification");
                notificationElement.kendoNotification();
                var notificationWidget = notificationElement.data("kendoNotification");
                notificationWidget.show("No se pudo agregar la tarea", "error");
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

function selectGrid() {
    var seleccion = $(".k-state-selected").select();
    var idTar = this.dataItem(seleccion).id;
    var idTTa = this.dataItem(seleccion).idTTarea;
    /*console.log("id tarea -> " + idTar);
    console.log("id tipo -> " + idTTa);*/

    //window.location.href = "#detalleTarea?id=" + idTar + "&id2=" + idTTa;
	window.location.href = "#addTarea";
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

//Para mantener active el button-group
$(document).on("change", "input[type='radio']", function () {
    $("input[type='radio']").parent().removeClass("active")
    $(this).parent().toggleClass("active");
});
// END_CUSTOM_CODE_funcionalidad03