'use strict';

app.funcionalidad01 = kendo.observable({
    beforeShow: function() {
        console.log("DFC > beforeShow ");        
    },
    onShow: function() {

    },
    afterShow: function() {},    
    MostraDetalleCliente: function() {
        console.log("DFC > MostraDetalleCliente ");
        console.log("Detalle Cliente ClienteID > " + ClienteID);
        
        dsContactosCliente = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/contacto/"+ClienteID,
                    dataType: "json"
                 },
              },
              schema: {
                  model: {
                       id: "ContactoID",
                       fields: {
                           ContactoID: { editable: false, nullable: true, type: "number" },
                           ContactoNombre: {type: "string"},
                           ContactoFechaCumpleanos: {type: "string"}
                       }
                   }
              },
             requestEnd: function(e) {
                console.log("dsContactosCliente >> requestEnd");
             },
         });

        dsTelefonosContactoCliente = new kendo.data.DataSource({
            transport: {
                //Esempio
                // http://www.ausa.com.pe/appmovil_test01/Clientes/contactoT?id=199&contacto=0
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/contactoT?id="+ClienteID+"&contacto=0",
                    dataType: "json"
                 },
            },
            schema: {
                model: {
                    id: "TelefonoID",
                    fields: {
                        TelefonoID: { editable: false, nullable: true, type: "number" },
                        ContactoID: { editable: false, nullable: true, type: "number" },
                        ContactoNombre: {editable: false, type: "string"},
                        Tipo: {editable: false, type: "string"},
                        Numero: {type: "string"}
                    }
                }
            },
            requestEnd: function(e) {
                console.log("dsTelefonosContactoCliente >> requestEnd");
            },
        });        
        
         $("#ContactosCliente").kendoDropDownList({
            dataTextField: "ContactoNombre",
            dataValueField: "ContactoID",
            dataSource: dsContactosCliente,
            change: function(e) {
                console.log("ContactosCliente >> change");
                // ContactoFechaCumpleanos
                // get the dataItem corresponding to the selectedIndex.
                $("#FechaCumpleanos").html($.trim(this.dataItem().ContactoFechaCumpleanos)); 
            },
            dataBound: function(e) {
                console.log("ContactosCliente >> dataBound");
                $("#FechaCumpleanos").html($.trim("1 May.")); 
                // dataItem from dsContactosCliente DataSource
                // console.log("ContactosCliente >> dataBound >> dataItem(0): " + this.dataItem(0).ContactoID + " -- " + this.dataItem(0).ContactoNombre + " -- " + this.dataItem(0).ContactoFechaCumpleanos);
                // ContactoFechaCumpleanos
                $("#FechaCumpleanos").html($.trim(this.dataItem(0).ContactoFechaCumpleanos));
            }
         });
        
         $("#TelefonosContactoCliente").kendoDropDownList({
            cascadeFrom: "ContactosCliente",
            dataTextField: "Numero",
            dataValueField: "TelefonoID",
            dataSource: dsTelefonosContactoCliente
         });
        
         $("#btnLlamar").kendoButton({
                 click: function(e) {
                     console.log(e.event.target.tagName);                     
                     // +++ ERROR +++ Simple reference to a JQuery object
                     //console.log("Llamar numero >> " + $("#TelefonosContactoCliente").dataItem().TelefonoNumero);                     
                     console.log("Llamar numero >> " + $("#TelefonosContactoCliente").data("kendoDropDownList").dataItem().Numero);
                     window.open('tel:' + $("#TelefonosContactoCliente").data("kendoDropDownList").dataItem().Numero, '_system')
                 }
        });
    
    },
});

// START_CUSTOM_CODE_funcionalidad01

var dsCliente = new kendo.data.DataSource({
    transport: {
        // OK funziona, ottimizzare per grandi vol. di dati || paginazione
        // Parametrizzare la variabile idCliente
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Clientes/cartera/305",
            dataType: "json"
        },        
     },
    schema: {
        model: {
            id: "ClienteID",
            fields: {
                ClienteID: { editable: false, nullable: true, type: "number" },
                ClienteRazonSocial: {type: "string"},
            }
        }
    },
    // Filtro de prueba para desarrollo --- Eliminar en produccion!!!
     filter: { field: "ClienteRazonSocial", operator: "startswith", value: "EX" }
});

var ClienteID = "";
var dsContactosCliente = null;
var dsTelefonosContactoCliente = null;
var dsSituaccionPago = null;

// END_CUSTOM_CODE_funcionalidad01