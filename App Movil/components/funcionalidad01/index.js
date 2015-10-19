'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {},    
});

// START_CUSTOM_CODE_funcionalidad01

var Cliente = [
        {ClienteID: 1, ClienteNombre: "ADIDAS", ClienteRubro: "Sportware and Footware"},
        {ClienteID: 2, ClienteNombre: "HUAWUEI", ClienteRubro: "Smartphone and Tablet"}, 
        {ClienteID: 3, ClienteNombre: "ADM", ClienteRubro: "ACME ACME"},
        {ClienteID: 4, ClienteNombre: "PHILIPS", ClienteRubro: "TV-LCD and Equipos de sonido"}, 
        {ClienteID: 5, ClienteNombre: "COSAPI", ClienteRubro: "Consutoria empresarial"}, 
        {ClienteID: 6, ClienteNombre: "ASTRAZENECA PERU S.A.", ClienteRubro: "Medicamentos"},
        {ClienteID: 7, ClienteNombre: "RENA WARE DEL PERU' S.A.", ClienteRubro: "ACME ACME"}, 
        {ClienteID: 8, ClienteNombre: "NIKE", ClienteRubro: "Sportware and Footware"}, 
        {ClienteID: 9, ClienteNombre: "SONY", ClienteRubro: "TV-LCD and Equipos de sonido"},
        {ClienteID: 10, ClienteNombre: "HONDA DEL PERU' S.A.", ClienteRubro: "Auto and Motos"}, 
        {ClienteID: 11, ClienteNombre: "DAMCO S.A.", ClienteRubro: "ACME ACME"},
        {ClienteID: 12, ClienteNombre: "COCA COLA", ClienteRubro: "Drinks and Merchandaising"}
]

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

var f01_contactos = new kendo.data.DataSource({
data: [
    {id: 1, clientes_id: "2", nombre: "Juan Perez", fecha_cumpleanos: "10 Marzo", telefonos: ["112 486 624", "0051 1 7538426"]},
    {id: 2, clientes_id: "2", nombre: "Carlos Alvarado", fecha_cumpleanos: "3 Marzo", telefonos: ["112 251 884"]}
    ]
});

// END_CUSTOM_CODE_funcionalidad01