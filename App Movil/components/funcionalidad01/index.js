'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_funcionalidad01

var foo = new kendo.data.DataSource({ 
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
function onTap(e) {
    console.log(e.touch.target + " was tapped");
    
    //console.log($("#MyListView").data("kendoMobileListView").items());
    
    console.log($("#MyListView").kendoMobileListView);
    $("#MyListView").kendoMobileListView.dataSource = foo;
    $("#MyListView").kendoMobileListView.click = function(e) {
        console.log(e.dataItem.id);
   };
}




$("#MyListView").kendoMobileListView({
    dataSource: foo,
    click: (function(e) {
        console.log(e.dataItem.id);
   })
});

// END_CUSTOM_CODE_funcionalidad01