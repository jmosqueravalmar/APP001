'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
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
        {id: 12, nombre: "COCA COLA"}
    ] 
});

// The clicked item as a jQuery object

$("#MyListView").kendoMobileListView({
    dataSource: f01,
    dataBound: onDataBound,    
    click: onClick,
    template : myTemplate
});

function onDataBound() {
    console.log("ListView data bound");
}

function onClick() {
    console.log("ListView click");
    $("#det-cliente").show();
}

function myTemplate() {
    kendo.template($("#f01-template").html());
}

function onClickVolver() {
    console.log("Volver a lista clientes");
    $("#det-cliente").hide();    
}

/*
function onClick() {
    console.log("ListView click");
    var data = f01.view();
    
    selected = $.map($.select(), function(item) {
        return data[$(item).index()].nombre;
    });

    console.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
}

function myTemplate() {
    kendo.template($("#f01-template").html());
}
*/

// END_CUSTOM_CODE_funcionalidad01