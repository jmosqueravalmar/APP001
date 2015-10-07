'use strict';

app.funcionalidad01 = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_funcionalidad01

var foo = new kendo.data.DataSource({ 
   data: [
        "ADIDAS", 
        "HUAWUEI", 
        "ADM",
        "PHILIPS", 
        "COSAPI", 
        "ASTRAZENECA PERU S.A.",
        "RENA WARE DEL PERU' S.A.", 
        "NIKE", 
        "SONY",
        "HONDA DEL PERU' S.A.", 
        "DAMCO S.A.",
        "COCA COLA"
    ] 
});

function listViewClick(e) {
    console.log(e.item.Title); // The clicked item as a jQuery object
}

// END_CUSTOM_CODE_funcionalidad01