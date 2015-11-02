'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {},    
});

// START_CUSTOM_CODE_funcionalidad01

var Cliente = [
        {ClienteID: 199, ClienteRazonSocial: "EXSA S.A."},
        {ClienteID: 1605, ClienteRazonSocial: "EXTINTORES PALVA S.C.R.L."}, 
        {ClienteID: 1609, ClienteRazonSocial: "EXTRACTOS Y OLEORRESINAS NATURALES SOCIEDAD ANÓNIMA CERRADA - EXNAT S.A.C."},
        {ClienteID: 761, ClienteRazonSocial: "EYR-UNION-AYB-ASOCIADOS"}, 
        {ClienteID: 1658, ClienteRazonSocial: "FABIOLA CATHERINE CHUECAS BECERRA"}, 
];

var dsCliente = new kendo.data.DataSource({
    transport: {
        read: function (e) {
            // on success
            e.success(Cliente);
        },
        schema: {
            model: {
                id: "ClienteID",
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
// StrClienteID inside ContactosCliente must be a string to filter on dsContactosCliente

var ContactosCliente = [
    {ContactoID: 1, StrClienteID: "199", ContactoNombre: "Juan Perez", ContactoFechaCumpleanos: "10 Marzo"},
    {ContactoID: 2, StrClienteID: "199", ContactoNombre: "Carlos Alvarado", ContactoFechaCumpleanos: "3 Marzo"},
    {ContactoID: 1, StrClienteID: "1605", ContactoNombre: "Jorge Palomino", ContactoFechaCumpleanos: "3 Junio"},
    {ContactoID: 2, StrClienteID: "1605", ContactoNombre: "Julio Galvez", ContactoFechaCumpleanos: "4 Julio"},
];

var TelefonosContactoCliente = [
    {TelefonoID: 1, ContactoID: 1, TelefonoNumero: "987 122 854"},
    {TelefonoID: 2, ContactoID: 1, TelefonoNumero: "987 443 458"},
    {TelefonoID: 3, ContactoID: 2, TelefonoNumero: "0051 251 48 32"},
    {TelefonoID: 4, ContactoID: 3, TelefonoNumero: "001 145 78 23"},
    {TelefonoID: 5, ContactoID: 4, TelefonoNumero: "0051 5051111"},
    {TelefonoID: 6, ContactoID: 3, TelefonoNumero: "0051 2410215"},
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
                    StrClienteID: { editable: false, type: "string" },
                    ContactoNombre: {type: "string"},
                    ContactoFechaCumpleanos: {type: "string"}
                }
            }
        }
    }
});

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