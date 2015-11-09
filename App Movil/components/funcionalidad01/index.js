'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {},    
});

// START_CUSTOM_CODE_funcionalidad01

var Cliente = [
        {ClienteID: 199, ClienteRazonSocial: "EXSA S.A."},
        {ClienteID: 459, ClienteRazonSocial: "SODIMAC PERU S.A."}, 
        {ClienteID: 483, ClienteRazonSocial: "TIENDAS PERUANAS S.A."},
];

var dsCliente = new kendo.data.DataSource({
    transport: {
        /*** */
        // OK funziona, ottimizzare per grandi vol. di dati || paginazione
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Clientes/cartera/305",
            dataType: "json"
        },
        
        /*read: function (e) {
            // on success
            e.success(Cliente);
        },*/
        
        schema: {
            model: {
                id: "ClienteID",
                fields: {
                    ClienteID: { editable: false, nullable: true, type: "number" },
                    ClienteRazonSocial: {type: "string"},
                }
            }
        }
     }        
});

// Pay attention to the relationship between ContactoID and ContactoNombre
// Holds the contact list by 1 Client e.g.  ClienteID=199 EXSA S.A.

var ContactosCliente = [
    {ContactoID: 1, ContactoNombre: "Francisco Jose Vasquez", ContactoFechaCumpleanos: "4/11"},
    {ContactoID: 2, ContactoNombre: "Martin Hugo Barrientos", ContactoFechaCumpleanos: "29/07"},
    {ContactoID: 3, ContactoNombre: "Javier Becerra", ContactoFechaCumpleanos: "N/A"},
];

var dsContactosCliente = new kendo.data.DataSource({
    transport: {
        read: function (e) {
            // on success
            e.success(ContactosCliente);
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
        }
    }
});

// Holds the tel. nums. list of all contacts by 1 Client e.g.  ClienteID=199 EXSA S.A.

var TelefonosContactoCliente = [
    {TelefonoID: 1, ContactoID: 1, TelefonoNumero: "3157000"},
    {TelefonoID: 2, ContactoID: 2, TelefonoNumero: "3157000 Ext.2330"},
    {TelefonoID: 3, ContactoID: 3, TelefonoNumero: "3157000 Ext.2390"},
    {TelefonoID: 4, ContactoID: 3, TelefonoNumero: "989208014"},
];

var dsTelefonosContactoCliente = new kendo.data.DataSource({
    transport: {
        read: function (e) {
            // on success
            e.success(TelefonosContactoCliente);
        },
        schema: {
            model: {
                id: "TelefonoID",
                fields: {
                    TelefonoID: { editable: false, nullable: true, type: "number" },
                    ContactoID: { editable: false, nullable: true, type: "number" },
                    TelefonoNumero: {type: "string"}
                }
            }
        }
    }    
});

// END_CUSTOM_CODE_funcionalidad01