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
}

$("#MyListView").kendoListView({
    dataSource: foo,
    template: kendo.template($("#foo-template").html()),
    selectable: true,
    change: function() {
        var index = this.select().index(),
            dataItem = this.dataSource.view()[index];
        log("id: " + dataItem.id + ", text: " + dataItem.text);        
    }
});

// END_CUSTOM_CODE_funcionalidad01