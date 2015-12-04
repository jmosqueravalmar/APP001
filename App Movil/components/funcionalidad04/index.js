'use strict';
app.funcionalidad04 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});

//getOperaciones -> cargamos el grid tareas
function f04getOperaciones() {
    $("#f04operaciones").kendoGrid({
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
            schema: {
                model: {
                    fields: {
                        FechaCreacionOperacion: {
                            type: "date"
                        }
                    }
                }
            },
        },
        filterable: true,
        sortable: true,
        pageable: true,
        pageSize: 2,
        scrollable: false,
        selectable: "row",
        change: f04SelectGridOperaciones,
        filterMenuInit: filterMenu, //llamamos a la función de configuración de los filtros
        columns: [
            //COL_1 NumOperacion
            { 
                field: "NumOperacion",
                title: "Id",
                width: "40px",
                filterable: false
            },
            //COL2 Cliente
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
            },
            //COL3 Despachador
            { 
                field: "Despachador",
                title: "Despachador",
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
            },
            //COL4 Almacén
            { 
                field: "Almacen",
                title: "Almacén",
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
                        info: "Filtrar por Almacén: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            }, 
            //COL5 #Órden
            {
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
            }, 
            //COL6 Operacion
            {
                field: "Operacion",
                title: "Operación",
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
                        info: "Filtrar por Operación: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            }, 
            //COL7 Tiempo Trascurrido
            {
                field: "HoraFin",
                title: "Tiempo Trascurrido",
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
                        info: "Filtrar por Tiempo Trascurrido: ",
                        filter: "Filtrar",
                        clear: "Limpiar"
                    }
                }
            },
            //COL8 Fecha de creacion
            {
                field: "FechaCreacionOperacion",
                title: "Fecha de creacion",
                width: "120px",
                filterable: {
                    messages: {
                        info: "Rango de creación: AAA"
                    }
                },
                format: "{0:dd/MM/yyyy}"
            },
            {
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
            }
        ]
    });
    //filterMenu -> para configurar los filtros
    function filterMenu(e) {
        console.log("DFC >>> filterMenu");
        if (e.field == "FechaCreacionOperacion") {
            var beginOperator = e.container.find("[data-role=dropdownlist]:eq(0)").data("kendoDropDownList");
            beginOperator.value("gte");
            beginOperator.trigger("change");

            var endOperator = e.container.find("[data-role=dropdownlist]:eq(2)").data("kendoDropDownList");
            endOperator.value("lte");
            endOperator.trigger("change");
            e.container.find(".k-dropdown").hide()
            console.log("DFC >>> filterMenu >>> FIN");
        }
    }
}

//selectGrid-> Si se selecciona una fila del grid
function f04SelectGridOperaciones() {
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
    window.location.href = "#f04accionOperacion";
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
        $("#f04det-op").kendoListView({
            dataSource: dsOperaciones,
            template: kendo.template($("#f04tempOP").html())
        });
        $("#f04OperacionID").text(OperacionID);
        $("#f04Orden").text(Orden);
        $("#f04FechaInicio").text(FechaInicio);
        $("#f04HoraInicio").text(HoraInicio);
        $("#f04Operacion").text(Operacion);
        $("#f04Estado").text(Estado);
    });

}

function cambioClase() {
    var fontSize = parseInt($(".font-cuerpo").css("font-size"));
    fontSize = fontSize + 1 + "px";
    $('.font-cuerpo').css({
        'font-size': fontSize
    });
}

