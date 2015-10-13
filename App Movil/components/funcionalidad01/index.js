'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {
       $("#ListaEmpresas").kendoMobileListView({
            dataSource: f01,
            template : "#:nombre#",
            dataBound: onDataBound,    
            click: muestraDetalle    
       });
    },
    afterShow: function() {}    
});

// START_CUSTOM_CODE_funcionalidad01

var f01 = new kendo.data.DataSource({ 
   data: [
        {id: 1, nombre: "ADIDAS"},
        {id: 2, nombre: "HUAWUEI"}, 
        {id: 3, nombre: "ADM"},
        {id: 4, nombre: "PHILIPS"}, 
        {id: 5, nombre: "COSAPI"}, 
        {id: 6, nombre: "ASTRAZENECA PERU S.A."},
        {id: 7, nombre: "RENA WARE DEL PERU' S.A."}, 
        {id: 8, nombre: "NIKE"}, 
        {id: 9, nombre: "SONY"},
        {id: 10, nombre: "HONDA DEL PERU' S.A."}, 
        {id: 11, nombre: "DAMCO S.A."},
        {id: 12, nombre: "COCA COLA"},
        {id: 13, nombre: "LAS CANASTA"},
        {id: 14, nombre: "EL COMERCIO"}
    ] 
});

// The clicked item as a jQuery object

function onDataBound() {
    console.log("ListView data bound");
}
    
function muestraDetalle() {
    console.log("ListView click");    
    $("#ListaEmpresas").hide();
    $("#DetalleEmpresa").show();
    $("#ListaClientes").kendoMobileView({
        dataTitle : "Detalle CLI"
    });
}

// END_CUSTOM_CODE_funcionalidad01