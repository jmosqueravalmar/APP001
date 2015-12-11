'use strict';
app.funcionalidad05 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});

//getOperaciones -> cargamos el grid tareas
function getOperacion() {
    $("#operaciones").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Listar",
                    dataType: "json",
                    type: "post",
                    data: {
                        txtdespachador: 126,
                        txtcliente: 0,
                        txtorden: 0,
                        txtalmacen: 0,
                        txtestado: 9
                    }
                }
            },
            //schema -> para mantener los filtror y para el formato date
            schema: {
                model: {
                    fields: {
                        FechaCreacionOperacion: {
                            type: "date"
                        }
                    }
                }
            },
            pageSize: 10
        },
        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        selectable: "row",
        change: selectGridOperac,
        filterMenuInit: filterMenu, //llamamos a la función de configuración de los filtros
        columns: [{
                field: "NumOperacion",
                title: "Nro",
                width: "40px",
                filterable: false
            },
            {
                field: "ClienteAlias",
                title: "Cliente",
                width: "120px",
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
                        info: "Filtrar por Cliente: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            }, {
                field: "Almacen",
                title: "Almacén",
                width: "120px",
                filterable: false
            }, {
                field: "Orden",
                title: "#Órden",
                width: "120px",
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
                        info: "Filtrar por Órden: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            }, {
                field: "Operacion",
                title: "Operación",
                width: "120px",
                filterable: false
            }, {
                field: "Estado",
                title: "Tiempo",
                width: "120px",
                filterable: false
            }, {
                field: "Estado",
                title: "Estado",
                width: "120px",
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
                        info: "Filtrar por estado: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            }, {
                field: "FechaCreacionOperacion",
                title: "F. Creación",
                width: "120px",
                filterable: {
                    messages: {
                        info: "Rango de creación: "
                    }
                },
                format: "{0:MM/dd/yyyy}"
            }
                 ],
        //dataBound -> para pintar la fila rojo (si es menor 2 dias), naranja (si es menor a 7 dias) y blanco (mayor a 7 dias) 
        dataBound: function (e) {
            var items = this._data;
            var rows = e.sender.tbody.children();
        }

    });


    function filterMenu(e) {
        if (e.field == "FechaCreacionOperacion") {
            var beginOperator = e.container.find("[data-role=dropdownlist]:eq(0)").data("kendoDropDownList");
            beginOperator.value("gte");
            beginOperator.trigger("change");

            var endOperator = e.container.find("[data-role=dropdownlist]:eq(2)").data("kendoDropDownList");
            endOperator.value("lte");
            endOperator.trigger("change");
            e.container.find(".k-dropdown").hide()
        }
    };


    // Definimos el modal de confirmación aquí
    $("#dialog").kendoWindow({
        title: "Confirmación",
        scrollable: false,
        modal: true,
        visible: false
    });
}

//selectGrid-> Si se selecciona una fila del grid
function selectGridOperac() {
    window.location.href = "#accionOperacion";
    $("#btnOpcion1").attr("disabled", "disabled");
    $("#btnOpcion2").attr("disabled", "disabled");
    $("#btnOpcion3").attr("disabled", "disabled");
    $("#btnOpcion7").attr("disabled", "disabled");

    //EFECTOS kendo.fx($("#accionOperacion")).zoom("in").play();
    var seleccion = $(".k-state-selected").select();

    var Orden = this.dataItem(seleccion).Orden;
    var FechaInicio = this.dataItem(seleccion).FechaInicio;
    var HoraInicio = this.dataItem(seleccion).HoraInicio;
    var HoraFin = this.dataItem(seleccion).HoraFin;
    var Operacion = this.dataItem(seleccion).Operacion;
    var Estado = this.dataItem(seleccion).Estado;
    var OperacionID = this.dataItem(seleccion).OperacionID;
    var NumOperacion = 0;
    var dsDetOperaciones = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Detalle/" + this.dataItem(seleccion).NumOperacion, //226667
                dataType: "json",
                type: "get"
            }
        }
    });

    $("#det-op").kendoListView({
        dataSource: dsDetOperaciones,
        template: kendo.template($("#tempOP").html())
    });
    $("#HoraInicio").text((HoraInicio == null ? "-" : HoraInicio));
    $("#HoraFin").text((HoraFin == null ? "-" : HoraFin));
    $("#FechaInicio").text((FechaInicio == null ? "-" : FechaInicio));
    $("#Orden").text(Orden);
    $("#Operacion").text(Operacion);
    $("#Estado").text(Estado);

    dsDetOperaciones.fetch(function () {
        var data = this.data();
        NumOperacion = data[0].NumOperacion;
        btnBotoneras(OperacionID,NumOperacion);
    });

}

function btnBotoneras(OperacionID,NumOperacion){
    var dsBotonera = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Opciones/" + OperacionID, //241922
                    dataType: "json",
                    type: "get"
                }
            }
        });
        dsBotonera.fetch(function () {
            var data = this.data();
            var activo = false;
            for (var i = 0; i < dsBotonera.total(); i++) {
                var opcion = data[i];
                switch (opcion.IdOpcion) {
                    case 1:
                        if (opcion.Habilitado == 1) {
                            $("#btnOpcion1").removeAttr("disabled");
                            $("#btnOpcion1").attr("class", "btn btn-primary font-boton btn-block b_color_1");
                            $("#spanBtn1").attr("class", "fa fa-unlock-alt");
                            activo = true;
                        } else {
                            $("#btnOpcion1").attr("disabled", "disabled");
                            $("#spanBtn1").attr("class", "fa fa-lock");
                            $("#btnOpcion1").attr("class", "btn btn-default font-boton btn-block");
                        }
                        $("#btnOpcion1").val(NumOperacion);
                        break;
                    case 2:
                        if (opcion.Habilitado == 1 && $("#btnOpcion1").attr("disabled") == "disabled" && activo == false) {
                            $("#btnOpcion2").removeAttr("disabled");
                            $("#btnOpcion2").attr("class", "btn btn-primary font-boton btn-block b_color_1");
                            $("#spanBtn2").attr("class", "fa fa-unlock-alt");
                            activo = true;
                        } else {
                            $("#btnOpcion2").attr("disabled", "disabled");
                            $("#spanBtn2").attr("class", "fa fa-lock");
                            $("#btnOpcion2").attr("class", "btn btn-default font-boton btn-block");
                        }
                        $("#btnOpcion2").val(NumOperacion);
                        break;
                    case 3:
                        if (opcion.Habilitado == 1 && $("#btnOpcion2").attr("disabled") == "disabled" && activo == false) {
                            $("#btnOpcion3").removeAttr("disabled");
                            $("#btnOpcion3").attr("class", "btn btn-primary font-boton btn-block b_color_1");
                            $("#spanBtn3").attr("class", "fa fa-unlock-alt");
                            activo = true;
                        } else {
                            $("#btnOpcion3").attr("disabled", "disabled");
                            $("#spanBtn3").attr("class", "fa fa-lock");
                            $("#btnOpcion3").attr("class", "btn btn-default font-boton btn-block");
                        }
                        $("#btnOpcion3").val(NumOperacion);
                        break;
                    default:
                        if (opcion.Habilitado == 1 && $("#btnOpcion3").attr("disabled") == "disabled" && activo == false) {
                            $("#btnOpcion7").removeAttr("disabled");
                            $("#btnOpcion7").attr("class", "btn btn-primary font-boton btn-block b_color_1");
                            $("#spanBtn7").attr("class", "fa fa-unlock-alt");
                            activo = true;
                        } else {
                            $("#btnOpcion7").attr("disabled", "disabled");
                            $("#spanBtn7").attr("class", "fa fa-lock");
                            $("#btnOpcion7").attr("class", "btn btn-default font-boton btn-block");
                        }
                        $("#btnOpcion7").val(NumOperacion);
                        break;
                }
            }
        });
}

function tipoFuncion(accion, NumOperacion) {
    $("#dialog").data("kendoWindow").center();
    $("#dialog").data("kendoWindow").open();
    $("#btnFuncion").attr("onclick", "f05funcion('" + accion + "'," + NumOperacion + ");");
}

function f05funcion(accion, NumOperacion) {
        //Notificaciones
        var notificationElement = $("#notification");
        notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");
        //end
        var txtidUsuario = sessionStorage.getItem("sessionUSER");
        txtidUsuario = 126;
        $.ajax({
            url: 'http://www.ausa.com.pe/appmovil_test01/Operaciones/' + accion,
            type: "post",
            data: {
                txtid: NumOperacion, //numOperacion del detalle de la operación
                txtidUsuario: txtidUsuario //id del usuario
            },
            async: false,
            success: function (datos) {
                var data = [];
                data = JSON.parse(datos);
                if (data[0].Ejecucion == 0) {
                    $('#dialog').data('kendoWindow').close();
                    $('#divBotonera').data('kendoListView').dataSource.read();
                    $('#divBotonera').data('kendoListView').refresh();
                    notificationWidget.show(accion + " realizado correctamente", "success");
                } else {
                    notificationWidget.show("No se pudo dar " + accion + "a la operación", "error");
                }
            },
            error: function () {
                notificationWidget.show("No se puede establecer la conexión al servicio", "error");
            }
        });
    }
    // function cambioClase() {
    //     var fontSize = parseInt($(".font-cuerpo").css("font-size"));
    //     fontSize = fontSize + 1 + "px";
    //     $('.font-cuerpo').css({
    //         'font-size': fontSize
    //     });
    // }