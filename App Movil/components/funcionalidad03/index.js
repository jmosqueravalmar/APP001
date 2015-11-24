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
            url: "http://www.ausa.com.pe/appmovil_test01/Tareas/listar",
            dataType: "json",
            type: "post",
            data: {
                txtid: 101
            }
        }
    },
    schema: {
        model: {
            fields: {
                tar_dat_fchcreacion: {
                    type: "date"
                },
                tar_dat_fchlimite: {
                    type: "date"
                },
                tar_int_prioridad: {
                    type: "string"
                }
            }
        }
    },
    pageSize: 10
});
//Cargar dsTareas
function getTareas() {
    if (!$("#tareas").data("kendoGrid")) {
        document.addEventListener("deviceready", onDeviceReady, false);
    };

    $("#tareas").kendoGrid({
        dataSource: dsTareas,
        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        selectable: "row",
        change: selectGrid,
        filterMenuInit: filterMenu,
        columns: [{
                field: "tipotarea",
                title: "Nombre de Tarea",
                width: "360px",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contiene",
                            eq: "Es igual a",
                            neq: "No es igual a"
                        }
                    },
                    messages: {
                        info: "Filtrar por: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            },
            {
                field: "Usuario",
                title: "Cliente",
                width: "150px",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contiene",
                            eq: "Es igual a",
                            neq: "No es igual a"
                        }
                    },
                    messages: {
                        info: "Filtrar por: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            },
            {
                field: "tar_dat_fchcreacion",
                title: "F. Creación",
                template: "#= kendo.toString(kendo.parseDate(tar_dat_fchcreacion, 'dd-MM-yyyy'), 'dd/MM/yyyy') #",
                width: "120px",
                filterable: {
                    messages: {
                        info: "Rango de fechas: "
                    }
                }
            },
            {
                field: "tar_dat_fchlimite",
                title: "F. Limite",
                template: "#= kendo.toString(kendo.parseDate(tar_dat_fchlimite, 'dd-MM-yyyy'), 'dd/MM/yyyy') #",
                width: "120px",
                filterable: {
                    messages: {
                        info: "Rango de fechas: ",
                    }
                }
            },
            {
                field: "tar_int_estado",
                title: "Estado",
                //template: '#if(tar_int_estado==1){#<span class="k-icon k-i-unlock"></span>Pendiente#}else{#<span class="k-icon k-i-lock"></span>Cerrado#}#',
                template: '#if(tar_int_estado==1){#Pendiente#}else{#Cerrado#}#',
                width: "100px",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contiene",
                            eq: "Es igual a",
                            neq: "No es igual a"
                        }
                    }
                }
            },
            {
                field: "tar_int_prioridad",
                title: "Prioridad",
                template: '#if(tar_int_prioridad==1){#<span class = "glyphicon glyphicon-arrow-down text-success" aria-hidden = "true" ></span>Baja#}else{if(tar_int_prioridad==3){#<span class="glyphicon glyphicon-arrow-up text-danger" aria-hidden="true"></span>Alta#}else{#<span class = "glyphicon glyphicon glyphicon-arrow-right text-warning" aria-hidden="true"></span>Media#}}#',
                width: "110px",
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contiene"
                        }
                    }
                }
            }],

        dataBound: function (e) {
            var items = this._data;
            var rows = e.sender.tbody.children();
            for (var i = 0; i < rows.length; i++) {
                var row = $(rows[i]);
                var f1 = kendo.parseDate(items[i].tar_dat_fchlimite, 'dd-MM-yyyy');
                var f2 = kendo.parseDate(items[i].tar_dat_fchcreacion, 'dd-MM-yyyy');
                var diff = new Date(f1 - f2);
                var days = diff / 1000 / 60 / 60 / 24;
                if (days < 2) {
                    row.addClass("danger");
                } else if (days >= 2 && days < 7) {
                    row.addClass("warning");
                } else {
                    row.addClass("default");
                }
            }
        }
    });

    function filterMenu(e) {
        if (e.field == "tar_dat_fchcreacion" || e.field == "tar_dat_fchlimite") {
            var beginOperator = e.container.find("[data-role=dropdownlist]:eq(0)").data("kendoDropDownList");
            beginOperator.value("gte");
            beginOperator.trigger("change");

            var endOperator = e.container.find("[data-role=dropdownlist]:eq(2)").data("kendoDropDownList");
            endOperator.value("lte");
            endOperator.trigger("change");
            //debugger;
            e.container.find(".k-dropdown").hide();
        }
        if (e.field == "tar_int_estado") {
            //e.container.find("k-widget.k-dropdown.k-header").css("display", "none");
            // Change the text field to a dropdownlist in the Role filter menu.
            e.container.find(".k-textbox:first")
                //.removeClass("k-textbox")
                .kendoDropDownList({
                    dataSource: new kendo.data.DataSource({
                        data: [
                            {
                                title: "Pendiente",
                                value: 1
                            },
                            {
                                title: "Cerrado",
                                value: 0
                            }
                                ]
                    }),
                    dataTextField: "title",
                    dataValueField: "value"
                });
        }
        if (e.field == "tar_int_prioridad") {
            //e.container.find("k-widget.k-dropdown.k-header").css("display", "none");
            // Change the text field to a dropdownlist in the Role filter menu.
            e.container.find(".k-textbox:first")
                //.removeClass("k-textbox")
                .kendoDropDownList({
                    dataSource: new kendo.data.DataSource({
                        data: [
                            {
                                title: "Alta",
                                value: 3
                            },
                            {
                                title: "Media",
                                value: 2
                            },
                            {
                                title: "Baja",
                                value: 1
                            }
                                ]
                    }),
                    dataTextField: "title",
                    dataValueField: "value"
                });
        }
    };
}

function viewFormTarea() {
    window.location.href = "#accionTarea";
    $('#formAdd')[0].reset();
    getSelectTipoTarea("add");
    getSelectCliente("add");
    $('#divBtnAdd').show();
    $('#divBtnAccion').hide();
}

function getSelectTipoTarea(accion) {
    $("#txtidtt").kendoDropDownList({
        dataSource: {
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Tareas/tipoListar",
                    dataType: "json"
                }
            }
        },
        dataTextField: "tiptar_str_nombre",
        dataValueField: "tiptar_int_id"
    });

    if (accion == "add") {

    } else {
        var dropdownlist = $("#txtidtt").data("kendoDropDownList");
        dropdownlist.value(accion);
    };
}

function getSelectCliente(accion) {
    if (!$("#txtidc").data("kendoMultiSelect")) {
        $("#txtidc").kendoMultiSelect({
            dataSource: {
                transport: {
                    read: {
                        url: "http://www.ausa.com.pe/appmovil_test01/Clientes/cartera/305",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "ClienteID",
                        fields: {
                            ClienteID: {
                                editable: false,
                                nullable: true,
                                type: "number"
                            },
                            ClienteRazonSocial: {
                                type: "string"
                            }
                        }
                    }
                },
                // Filtro de prueba para desarrollo --- Eliminar en produccion!!!
                filter: {
                    field: "ClienteRazonSocial",
                    operator: "startswith",
                    value: "EX"
                }

            },
            dataTextField: "ClienteRazonSocial",
            dataValueField: "ClienteID",
            filter: "contains"
        });
    }

    var values = [];
    if (accion == "add") {

    } else {
        var dsTareaCliente = null;
        dsTareaCliente = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Relaciones/clistar",
                    dataType: "json",
                    type: "post",
                    data: {
                        txtid: accion
                    }
                }
            }
        });

        dsTareaCliente.fetch(function () {
            var data = dsTareaCliente.data();
            for (var i = 0; i < dsTareaCliente.total(); i++) {
                var TareaCliente = data[i];
                values.push(TareaCliente.cli_int_id);
            };
            var multiselect = $("#txtidc").data("kendoMultiSelect");
            multiselect.value(values);
        });
    }
}

//Función Agregar. Editar y Eliminar Tarea
function accionTarea(accion) {
    var valido = true;
    $('#txtidc, #txtuserid, #txtidtt, #txtorden, #txtobserv, #txtdetalle, #txtflimite').parent().parent().removeClass("has-error");
    $('.k-multiselect-wrap.k-floatwrap').css("border-color", "#ccc");
    var txtidc = $("#txtidc").data("kendoMultiSelect");
    if (txtidc.value() == "") {
        $('#txtidc').parent().parent().addClass("has-error");
        $('.k-multiselect-wrap.k-floatwrap').css("border-width", "1px");
        $('.k-multiselect-wrap.k-floatwrap').css("border-color", "#a94442");
        valido = false;
    }
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

    /* Eliminar este console log en producción

    console.log($('#txtidc').val());
    console.log($('#txtidtt option:selected').val());
    console.log($('#txtorden').val());
    console.log($('#txtobserv').val());
    console.log($('#txtdetalle').val());
    console.log($('input:radio[name=txtprioridad]:checked').val());
    console.log($('#txtflimite').val() + " 00:00:00");
    console.log(valido);*/

    valido && $.ajax({
        type: "POST",
        url: 'http://www.ausa.com.pe/appmovil_test01/Tareas/' + accion,
        data: {
            txtuserid: 101,
            txtid: $('#txtid').val(),
            txtidtt: $('#txtidtt option:selected').val(),
            txtorden: $('#txtorden').val(),
            txtobserv: $('#txtobserv').val(),
            txtdetalle: $('#txtdetalle').val(),
            txtprioridad: $('input:radio[name=txtprioridad]:checked').val(),
            txtflimite: $('#txtflimite').val() + " 00:00:00"
        },
        async: false,
        success: function (datos) {
            var data = [];
            data = JSON.parse(datos);
            var txtidc = $('#txtidc').val();
            if (data[0].Column1 > 0) { //Si intertado es mayor que cero  

                for (var i = 0; i < $('#txtidc').val().length; i++) {
                    $.ajax({ // INSERT
                        type: "post",
                        url: 'http://www.ausa.com.pe/appmovil_test01/Relaciones/cinsert',
                        data: {
                            txtid: data[0].Column1,
                            txtidc: txtidc[i]
                        },
                        async: false,
                        error: function () {
                            var notificationElement = $("#notification");
                            notificationElement.kendoNotification();
                            var notificationWidget = notificationElement.data("kendoNotification");
                            notificationWidget.show("No se puede establecer la conexión al servicio", "warning");
                            valido = false;
                        }
                    });
                };
                if (valido) {
                    var notificationElement = $("#notification");
                    notificationElement.kendoNotification();
                    var notificationWidget = notificationElement.data("kendoNotification");
                    notificationWidget.show((accion == "insert" ? "Se agregó la nueva tarea" : "Se editó la nueva tarea"), "success");

                    var grid = $("#tareas").data("kendoGrid");
                    grid.dataSource.read();
                    window.location.href = "#tareas1";
                };
                return;
            }

            if ($('#txtid').val() > 0) { //Es edición  
                var dsTareaCliente = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "http://www.ausa.com.pe/appmovil_test01/Relaciones/clistar",
                            dataType: "json",
                            type: "post",
                            data: {
                                txtid: $('#txtid').val()
                            }
                        }
                    }
                });
                dsTareaCliente.fetch(function () {
                    var data = dsTareaCliente.data();
                    for (var i = 0; i < dsTareaCliente.total(); i++) {
                        var TareaCliente = data[i];
                        $.ajax({ // DELETE
                            type: "POST",
                            url: 'http://www.ausa.com.pe/appmovil_test01/Relaciones/cdelete',
                            data: {
                                txtidt: $('#txtid').val(),
                                txtidc: TareaCliente.cli_int_id
                            },
                            async: false,
                            success: function (datos) {

                            },
                            error: function () {
                                var notificationElement = $("#notification");
                                notificationElement.kendoNotification();
                                var notificationWidget = notificationElement.data("kendoNotification");
                                notificationWidget.show("No se puede establecer la conexión al servicio", "warning");
                                valido = false;
                            }
                        });
                    };

                    for (var i = 0; i < $('#txtidc').val().length; i++) {
                        $.ajax({ // INSERT
                            type: "POST",
                            url: 'http://www.ausa.com.pe/appmovil_test01/Relaciones/cinsert',
                            data: {
                                txtid: $('#txtid').val(),
                                txtidc: txtidc[i]
                            },
                            async: false,
                            error: function () {
                                var notificationElement = $("#notification");
                                notificationElement.kendoNotification();
                                var notificationWidget = notificationElement.data("kendoNotification");
                                notificationWidget.show("No se puede establecer la conexión al servicio", "warning");
                                valido = false;
                            }
                        });
                    };

                });


                if (valido) {
                    var notificationElement = $("#notification");
                    notificationElement.kendoNotification();
                    var notificationWidget = notificationElement.data("kendoNotification");
                    switch (accion) {
                        case "insert":
                            notificationWidget.show("Se agregó la nueva tarea", "success");
                            break;
                        default:
                            notificationWidget.show((accion == "delete" ? "Se eliminó la nueva tarea" : "Se editó la nueva tarea"), "success");
                    }
                    var grid = $("#tareas").data("kendoGrid");
                    grid.dataSource.read();
                    window.location.href = "#tareas1";
                };
            };
        },
        error: function () {
            var notificationElement = $("#notification");
            notificationElement.kendoNotification();
            var notificationWidget = notificationElement.data("kendoNotification");
            notificationWidget.show("No se puede establecer la conexión al servicio", "warning");
        }
    });
}

function addNotaVoz() {
    $("#divNotaVoz").append('<span>Audio01 <span type="xxx" class="glyphicon glyphicon-remove"></span>&nbsp&nbsp&nbsp</span>');
}

//Eliminar nota de audio
$(document).on("click", "span[type='xxx']", function () {
    $(this).parent().remove();
});



function selectGrid() {
    window.location.href = "#accionTarea";
    var seleccion = $(".k-state-selected").select();
    $('#txtid').val(this.dataItem(seleccion).tar_int_id);
    getSelectCliente(this.dataItem(seleccion).tar_int_id); // Enviamos el valor de id_tarea para que lo seleccione
    getSelectTipoTarea(this.dataItem(seleccion).tiptar_int_id); // Enviamos el valor de tiptar_int_id para que lo seleccione
    $('#txtorden').val(this.dataItem(seleccion).tar_str_orden);
    $('#txtobserv').val(this.dataItem(seleccion).tar_str_observacion);
    $('#txtdetalle').val(this.dataItem(seleccion).tar_txt_detalle);
    $("input[type='radio']").parent().removeClass("active");

    $("span[type='btnCheck']").remove();
    switch (this.dataItem(seleccion).tar_int_prioridad) {
        case "1":
            $('#txtprioridad1').toggleClass("active");
            $('#txtprioridad1').prepend('<span type="btnCheck" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
            break;
        case "2":
            $('#txtprioridad2').toggleClass("active");
            $('#txtprioridad2').prepend('<span type="btnCheck" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
            break;
        default:
            $('#txtprioridad3').prepend('<span type="btnCheck" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
            $('#txtprioridad3').toggleClass("active");
    };
    var tar_dat_fchlimite = kendo.toString(kendo.parseDate(this.dataItem(seleccion).tar_dat_fchlimite, 'dd-MM-yyyy'), 'yyyy-MM-dd');
    $('#txtflimite').val(tar_dat_fchlimite);

    $('#divBtnAdd').hide();
    $('#divBtnAccion').show();

    $('#txtidc, #txtuserid, #txtidtt, #txtorden, #txtobserv, #txtdetalle, #txtflimite').parent().parent().removeClass("has-error");
    $('.k-multiselect-wrap.k-floatwrap').css("border-color", "#ccc");
}

function addTipoTarea() {
    var valido = true;
    $('#txtnombre, #txtdescripcion').parent().parent().removeClass("has-error");
    if ($('#txtnombre').val() == "") {
        $('#txtnombre').parent().parent().addClass("has-error");
        valido = false;
    }
    if ($('#txtdescripcion').val() == "") {
        $('#txtdescripcion').parent().parent().addClass("has-error");
        valido = false;
    }
    valido && $.ajax({
        url: 'http://www.ausa.com.pe/appmovil_test01/Tareas/tipoInsert',
        type: "post",
        data: {
            txtnombre: $('#txtnombre').val(),
            txtdescripcion: $('#txtdescripcion').val(),
            txtuserid: 101
        },
        async: false,
        success: function (datos) {
            var data = [];
            data = JSON.parse(datos);
            if (data[0].Ejecucion == 0) {
                getSelectTipoTarea("add");
                var notificationElement = $("#notification");
                notificationElement.kendoNotification();
                var notificationWidget = notificationElement.data("kendoNotification");
                notificationWidget.show("Se agregó nuevo tipo de tarea", "success");
                $("#modalAddTipoTarea").data("kendoMobileModalView").close();
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


//Para mantener active el button-group
$(document).on("change", "input[type='radio']", function () {
    $("input[type='radio']").parent().removeClass("active");
    $(this).parent().toggleClass("active");
    $("span[type='btnCheck']").remove();
    $(this).parent().prepend('<span type="btnCheck" class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
});
// END_CUSTOM_CODE_funcionalidad03 17/11/2015 12.32 pm