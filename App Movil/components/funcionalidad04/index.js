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
    var idSS = sessionStorage.getItem("sessionUSER");
    $("#f04operaciones").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Listar",
                    dataType: "json",
                    type: "post",
                    data: {
                        txtdespachador: idSS, //3091,
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
        change: f04SelectGridDetOperacion, //f04SelectGridOperaciones,
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
                        info: "Rango de creación: "
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
        if (e.field == "FechaCreacionOperacion") {
            var beginOperator = e.container.find("[data-role=dropdownlist]:eq(0)").data("kendoDropDownList");
            beginOperator.value("gte");
            beginOperator.trigger("change");

            var endOperator = e.container.find("[data-role=dropdownlist]:eq(2)").data("kendoDropDownList");
            endOperator.value("lte");
            endOperator.trigger("change");
            e.container.find(".k-dropdown").hide();
        }
    }
}


function f04SelectGridDetOperacion() {
    window.location.href = "#f04accionOperacion";
    var seleccion = $(".k-state-selected").select();
    //dsOperaciones -> obtenemos la lista de tareas
    var dsOperaciones = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Detalle/" + this.dataItem(seleccion).NumOperacion, //226667
                dataType: "json",
                type: "get"
            },
        }
    });
    //INFORMACIONES DE PA /Operaciones/Listar
    var Actividad = this.dataItem(seleccion).Operacion;
    var HoraInicio = this.dataItem(seleccion).HoraInicio;
    var Estado = this.dataItem(seleccion).Estado;
    var TiempoTranscurrido = this.dataItem(seleccion).TiempoTranscurrido;

    dsOperaciones.fetch(function () {
        var data = this.data();
        var dateFechaCreacion = eval(" new "+data[0].FechaCreacion.replace(/\//g,'')+";");

        var day = dateFechaCreacion.getDate();
        var month = dateFechaCreacion.getMonth() + 1 ;
        var year = dateFechaCreacion.getFullYear();
        $("#f04FechaCreacionAAA").text(day+"/"+month+"/"+year);
        
        $("#f04NumOperacionAAA").text(data[0].NumOperacion);
        $("#f04ClienteAAA").text(data[0].Cliente);
        
        getDespachador();
        
        $("#f04AlmacenAAA").text(data[0].Almacen);
        $("#f04OrdenAAA").text(data[0].Orden);
        
        //INFORMACIONES DE PA /Operaciones/Listar
        $("#f04LVTiempoTrasncurridoAAA").text(TiempoTranscurrido + " dias. ");
        $("#f04LVOperacionAAA").text(Actividad);
        $("#f04LVHoraInicioAAA").text(HoraInicio);
        $("#f04LVEstadoAAA").text(Estado);
        
        $("#f04DetalleAAA").text(data[0].Detalle);        

    });
}

function cambioClase() {
    var fontSize = parseInt($(".font-cuerpo").css("font-size"));
    fontSize = fontSize + 1 + "px";
    $('.font-cuerpo').css({
        'font-size': fontSize
    });
}

//getDespachador -> datos del select tipo de tarea
function getDespachador() {
    var idSS = sessionStorage.getItem("sessionUSER");
        $("#txtIdDespachador").kendoDropDownList({
            dataSource: {
                transport: {
                    read: {
                        url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Despachadores",
                        dataType: "json",
                        type: "get",
                    }
                }
            },
            dataTextField: "nomDespachador",
            dataValueField: "idDespachador",
            value: idSS
        });

        //Si se seleccionó la fila, asignamos el valor del kendoDropDownList con el valor de accion
        // if (accion !== "add") {
        //     var dropdownlist = $("#txtidtt").data("kendoDropDownList");
        //     dropdownlist.value(accion);
        // };
}