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
function getOperaciones() {
    $("#operaciones").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Listar",
                    dataType: "json",
                    type: "post",
                    data: {
                        txtdespachador: 3091,
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
            }
        },
        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        selectable: "row",
        change: selectGridOperaciones,
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
                 ]
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
}

//selectGrid-> Si se selecciona una fila del grid
function selectGridOperaciones() {
    var datos = [{
        "tipoOrden": "Impo",
        "fechaCreacion": "27/10/2015",
        "idOperacion": 2,
        "cliente": "Cliente 2",
        "despachador": "Despachador2",
        "almacen": "2",
        "numOrden": 10604,
        "tipoCarga": "Contenedor Refrierado",
        "numMatricula": "$UDU 181500",
        "cantidad": "8 unidades",
        "tiempoTranscurrido": "00:00:00",
        "fechaInicio": "00/00/0000",
        "actividad": "Aforo",
        "horaInicio": "00:00:00",
        "horaFin": "00:00:00",
        "estado": "Pendiente",
        "detalle": "Según el tipo de operación se dispondrá de distintos botones para su seguimiento en el detalle de la operación"
    }]
    window.location.href = "#accionOperacion";
    //EFECTOS kendo.fx($("#accionOperacion")).zoom("in").play();
    var seleccion = $(".k-state-selected").select();
    //dsOperaciones -> obtenemos la lista de tareas
    var dsOperaciones = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Detalle/" + this.dataItem(seleccion).NumOperacion, //226667
                dataType: "json",
                type: "get"
            }
        }
    });
    var Orden = this.dataItem(seleccion).Orden;
    var OperacionID = this.dataItem(seleccion).OperacionID;
    var FechaInicio = this.dataItem(seleccion).FechaInicio;
    var HoraInicio = this.dataItem(seleccion).HoraInicio;
    var Operacion = this.dataItem(seleccion).Operacion;
    var Estado = this.dataItem(seleccion).Estado;

    dsOperaciones.fetch(function () {
        $("#det-op").kendoListView({
            dataSource: dsOperaciones,
            template: kendo.template($("#tempOP").html())
        });
        $("#OperacionID").text(OperacionID);
        $("#Orden").text(Orden);
        $("#FechaInicio").text(FechaInicio);
        $("#HoraInicio").text(HoraInicio);
        $("#Operacion").text(Operacion);
        $("#Estado").text(Estado);
    });

}

function cambioClase() {
    var fontSize = parseInt($(".font-cuerpo").css("font-size"));
    fontSize = fontSize + 1 + "px";
    $('.font-cuerpo').css({
        'font-size': fontSize
    });
}