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
var selectedDataItems = [];

function getOperacion() {
        $("#operaciones").kendoGrid({
            dataSource: {
                transport: {
                    read: {
                        url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Listar",
                        dataType: "json",
                        type: "post",
                        data: {
                            txtdespachador: 4358,//3091,4358
                            txtcliente: 0,
                            txtorden: 0,
                            txtalmacen: 0,
                            txtestado: 9,
                            txtfecha: "24/09/2015"
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
            change: function (e) {
                var selectedRows = [];
                selectedRows = this.select();
                selectedDataItems = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var dataItem = this.dataItem(selectedRows[i]);
                    selectedDataItems.push(dataItem);
                }
                selectGridOperac(selectedDataItems);
                window.location.href = "#accionOperacion";
            },
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
    }
    //selectGrid-> Si se selecciona una fila del grid
function selectGridOperac(selectedDataItems) {

    //EFECTOS kendo.fx($("#accionOperacion")).zoom("in").play();
    var seleccion = selectedDataItems; //$(".k-state-selected").select();
    var Orden = seleccion[0].Orden;
    var FechaInicio = seleccion[0].FechaInicio;
    var HoraInicio = seleccion[0].HoraInicio;
    var HoraFin = seleccion[0].HoraFin;
    var Operacion = seleccion[0].Operacion;
    var Estado = seleccion[0].Estado;
    var OperacionID = seleccion[0].OperacionID;
    var NumOperacion = seleccion[0].NumOperacion;
    var dsDetOperaciones = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Detalle/" + NumOperacion, //226667
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

    NumOperacion=227192;
    dsDetOperaciones.fetch(function () {
        var dsBotonera = new kendo.data.DataSource({
            transport: {
                read: {
                    //Levante-Notoficacion: 239257,224322
                    //Canal: 239257,239255,227192,227840,228961,227840
                    url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Opciones/" + NumOperacion,
                    dataType: "json",
                    type: "get"
                }
            }
            // data: [{
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 2,
            //     "Opcion": "INICIO",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 2,
            //     "Opcion": "PERMISO OK",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 3,
            //     "Opcion": "SOL TRANSPORTE",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 4,
            //     "Opcion": "LEVANTE",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 5,
            //     "Opcion": "CANAL",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 6,
            //     "Opcion": "NOTIFICAR",
            //     "Habilitado": 0
            // }, {
            //     "IdOperacion": 1,
            //     "Operacion": "RETIRO",
            //     "IdOpcion": 7,
            //     "Opcion": "TERMINAR",
            //     "Habilitado": 1
            // }]
        });
        dsBotonera.fetch(function () {
            $("#divBotonera").html("");
            var data = this.data();
            var activo = false;
            for (var i = 0; i < dsBotonera.total(); i++) {
                var opcion = data[i];
                //Se insertará botones = a la cantidad de filas
                //El botón activo será el primer botón con valor "Habilitado" == 1
                var Opcion = opcion.Opcion.toLowerCase();
                Opcion = Opcion.charAt(0).toUpperCase() + Opcion.slice(1);
                if (activo == false && opcion.Habilitado == 1 && activo == false) {
                    activo = true;
                    if (i + 1 == dsBotonera.total()) { // si es la uúltima opración preguntar si desea agregar fotos
                        $("#divBotonera").append(['<div class="btn-group btn-block"><button class="btn btn-primary btn-block font-boton b_color_1" onclick="tipoFuncion(' + "'" + Opcion + "'" + ',' + NumOperacion + ',' + "'Ultimo'" + ');"> <span class="fa fa-unlock-alt" aria-hidden="true"></span> ' + Opcion + ' </button></div>']);
                    } else {
                        $("#divBotonera").append(['<div class="btn-group btn-block"><button class="btn btn-primary btn-block font-boton b_color_1" onclick="tipoFuncion(' + "'" + Opcion + "'" + ',' + NumOperacion + ');"> <span class="fa fa-unlock-alt" aria-hidden="true"></span> ' + Opcion + ' </button></div>']);
                    }

                } else {
                    $("#divBotonera").append(['<div class="btn-group btn-block"><button class="btn btn-default btn-block font-boton" onclick="tipoFuncion(' + "'" + Opcion + "'" + ',' + NumOperacion + ');" disabled> <span class="fa fa-lock" aria-hidden="true"></span> ' + Opcion + ' </button></div>']);
                }
            }
        });
    });
}

function tipoFuncion(accion, NumOperacion, Ultimo) {
    // Definimos el modal de confirmación aquí
    $("#dialog").kendoWindow({
        scrollable: false,
        modal: true,
        visible: false
    });
    $("#dialog").data("kendoWindow").title("Confirmar: " + accion);
    $("#dialog").data("kendoWindow").center();
    $("#dialog").data("kendoWindow").open();
    $("#cuerpoModal").html('');
    switch (accion) {
        case "Inicio":
            accion = "Iniciar";
            break;
        case "Levante":
            $("#cuerpoModal").html('<input id="dtpLevante" type="date" class="form-control input-md font-cuerpo">');
            break;
        case "Canal":
            $("#cuerpoModal").html(['<div class="btn-group" data-toggle="buttons">' +
                '<label class="btn btn-success font-cuerpo active">' +
                    '<input value="1" type="radio" name="txtprioridad" autocomplete="off" checked><span type="btnCheck" class="glyphicon glyphicon-ok" aria-hidden="true"></span> V' +
                '</label>' +
                '<label class="btn btn-warning font-cuerpo">' +
                    '<input value="2" type="radio" name="txtprioridad" autocomplete="off"> N' +
                '</label>' +
                '<label class="btn btn-danger font-cuerpo">' +
                    '<input value="3" type="radio" name="txtprioridad" autocomplete="off"> R' +
                '</label>' +
            '</div>']);
            break;

        case "Permiso ok":
            accion = "Permiso";
            break;
        case "Sol transporte":
            accion = "Solicitar";
            break;
        case "Fin":
            accion = "Terminar";
            break;
        default:
            break;
    }
    if (Ultimo) {
        $("#cuerpoModal").append('<h5 class="font-cuerpo">¿Desea agregar una foto?</h5>');
    }
    $("#btnFuncion").attr("onclick", "f05funcion('" + accion + "'," + NumOperacion + ");");
    $('#dtpLevante').parent().removeClass("has-error");
}

function f05funcion(accion, NumOperacion) {
    //Notificaciones
    var notificationElement = $("#notification");
    notificationElement.kendoNotification();
    var notificationWidget = notificationElement.data("kendoNotification");
    //end
    if ($('#dtpLevante').val() == "") {
        $('#dtpLevante').parent().addClass("has-error");
        notificationWidget.show("Ingrese la fecha", "error");
        return;
    }

    var txtidUsuario = sessionStorage.getItem("sessionUSER");
    txtidUsuario = 126;
    $.ajax({
        url: 'http://www.ausa.com.pe/appmovil_test01/Operaciones/' + accion,
        type: "post",
        data: {
            txtid: NumOperacion, //numOperacion del detalle de la operación
            txtidUsuario: txtidUsuario, //id del usuario
            fecha: $('#dtpLevante').val(),
            canal: $('input:radio[name=txtprioridad]:checked').val()
        },
        async: false,
        success: function (datos) {
            var data = [];
            data = JSON.parse(datos);
            if (data[0].Ejecucion == 0) {
                $('#dialog').data('kendoWindow').close();
                if (accion == "Terminar") {
                    window.location.href = "#operaciones1";
                } else {
                    selectGridOperac(selectedDataItems);
                }
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