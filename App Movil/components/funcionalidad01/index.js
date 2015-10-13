'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {},    
});

// START_CUSTOM_CODE_funcionalidad01

var f01 = new kendo.data.DataSource({ 
data: [
        {id: 1, nombre: "ADIDAS", rubro: "Sportware and Footware"},
        {id: 2, nombre: "HUAWUEI", rubro: "Smartphone and Tablet"}, 
        {id: 3, nombre: "ADM", rubro: "ACME ACME"},
        {id: 4, nombre: "PHILIPS", rubro: "TV-LCD and Equipos de sonido"}, 
        {id: 5, nombre: "COSAPI", rubro: "Consutoria empresarial"}, 
        {id: 6, nombre: "ASTRAZENECA PERU S.A.", rubro: "Medicamentos"},
        {id: 7, nombre: "RENA WARE DEL PERU' S.A.", rubro: "ACME ACME"}, 
        {id: 8, nombre: "NIKE", rubro: "Sportware and Footware"}, 
        {id: 9, nombre: "SONY", rubro: "TV-LCD and Equipos de sonido"},
        {id: 10, nombre: "HONDA DEL PERU' S.A.", rubro: "Auto and Motos"}, 
        {id: 11, nombre: "DAMCO S.A.", rubro: "ACME ACME"},
        {id: 12, nombre: "COCA COLA", rubro: "Drinks and Merchandaising"}
    ]
});

function muestraDetalle(id){
    console.log("Muestra Detalle de:" + id);
    var dataItem = f01.get(id);
    console.log("Nombre: " + dataItem.nombre + " Rubro: " + dataItem.rubro);
    
}

// END_CUSTOM_CODE_funcionalidad01