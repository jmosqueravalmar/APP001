'use strict';

app.funcionalidad03 = kendo.observable({
    onShow: function() {
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"

            },
            dataBound: function() {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [{
                    field: "FirstName",
                    title: "First Name"
                },{
                    field: "LastName",
                    title: "Last Name"
                },{
                    field: "Country"
                },{
                    field: "City"
                },{
                    field: "Title"
                }
                ]} 
        });

        /* $("#pager").kendoPager({
        dataSource: dataSource
        });*/

        $("#tareas").kendoListView({
            dataSource: dataSource, 
            template: kendo.template($("#tema001").html())
        });
    },
    afterShow: function() {
    }

});

// START_CUSTOM_CODE_funcionalidad03
 
window.llamada = function(e) { 
    //alert(e);
    var seleccionado = e.view.params.info;
    var seleccionado2 = e.view.params.info2;
    $("#nombre").text(seleccionado); 
    $("#nombre2").text(seleccionado2); 
} 
// END_CUSTOM_CODE_funcionalidad03