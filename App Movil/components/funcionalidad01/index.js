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
        read: function (e) {
            // on success
            e.success(Cliente);
        },
        schema: {
            model: {
                id: "rsID",
                fields: {
                    ClienteID: { editable: false, nullable: true, type: "number" },
                    ClienteNombre: {type: "string"},
                    ClienteRubro: {type: "string"}                    
                }
            }
        }
     }        
});

// Pay attention to the relationship between ContactoID and ContactoNombre

var ContactosCliente = [
    {rsID: 1, ClienteID: 199, ContactoID: 1, ContactoNombre: "Francisco Jose Vasquez", ContactoFechaCumpleanos: "4/11"},
    {rsID: 2, ClienteID: 199, ContactoID: 2, ContactoNombre: "Martin Hugo Barrientos", ContactoFechaCumpleanos: "29/07"},
    {rsID: 3, ClienteID: 199, ContactoID: 3, ContactoNombre: "Javier Becerra", ContactoFechaCumpleanos: "N/A"},
    {rsID: 4, ClienteID: 459, ContactoID: 1,  ContactoNombre: "Ingrid Helga Valz", ContactoFechaCumpleanos: "N/A"},
    {rsID: 5, ClienteID: 459, ContactoID: 2, ContactoNombre: "Ivan Chavez", ContactoFechaCumpleanos: "25/2"},
    {rsID: 6, ClienteID: 459, ContactoID: 3, ContactoNombre: "Katy Sandy Prado", ContactoFechaCumpleanos: "4/5"},
    {rsID: 7, ClienteID: 459, ContactoID: 4, ContactoNombre: "Monica Cabrera", ContactoFechaCumpleanos: "26/10"},
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
                    ClienteID: { editable: false, type: "number" },
                    ContactoID: { editable: false, nullable: true, type: "number" },
                    ContactoNombre: {type: "string"},
                    ContactoFechaCumpleanos: {type: "string"}
                }
            }
        }
    }
});

var TelefonosContactoCliente = [
    {TelefonoID: 1, ClienteID: 199, ContactoID: 1, TelefonoNumero: "3157000"},
    {TelefonoID: 2, ClienteID: 199, ContactoID: 2, TelefonoNumero: "3157000 Ext.2330"},
    {TelefonoID: 3, ClienteID: 199, ContactoID: 3, TelefonoNumero: "3157000 Ext.2390"},
    {TelefonoID: 4, ClienteID: 199, ContactoID: 3, TelefonoNumero: "989208014"},
    /* {TelefonoID: 5, ClienteID: 459, ContactoID: 1, TelefonoNumero: "2119500 Ext.1405"},
    {TelefonoID: 6, ClienteID: 459, ContactoID: 1, TelefonoNumero: "97753267"},
    {TelefonoID: 7, ClienteID: 459, ContactoID: 1, TelefonoNumero: "109*2599"},
    {TelefonoID: 8, ClienteID: 459, ContactoID: 2, TelefonoNumero: "N/A"},
    {TelefonoID: 9, ClienteID: 459, ContactoID: 3, TelefonoNumero: "2119500"},
    {TelefonoID: 10, ClienteID: 459, ContactoID: 3, TelefonoNumero: "986828093"},
    {TelefonoID: 11, ClienteID: 459, ContactoID: 4, TelefonoNumero: "6110400 Ext.430"}, */

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
                    ClienteID: { editable: false, type: "number" },
                    ContactoID: { editable: false, nullable: true, type: "number" },
                    TelefonoNumero: {type: "string"}
                }
            }
        }
    }    
});

// END_CUSTOM_CODE_funcionalidad01