'use strict';
app.funcionalidad03 = kendo.observable({
    onShow: function () {
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                ,
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [{
                        field: "FirstName",
                        title: "First Name"
                        }, {
                        field: "LastName",
                        title: "Last Name"
                        }, {
                        field: "Country"
                        }, {
                        field: "City"
                        }, {
                        field: "Title"
                        }]
            }
        });

        /* $("#pager").kendoPager({
        dataSource: dataSource
        });*/

        $("#tareas").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#tema001").html())
        });
    },
    afterShow: function () {}
});

// START_CUSTOM_CODE_funcionalidad03
function detailInit(idEmpleado) {
    //alert(idEmpleado);
    var dataSourceDetail = new kendo.data.DataSource({
        type: "odata",
        transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"

            ,
            filter: {
                field: "EmployeeID",
                operator: "eq",
                value: idEmpleado
            },
            columns: [{
                    field: "OrderID",
                    title: "OrderID."
                        }, {
                    field: "ShipCountry",
                    title: "ShipCountry."
                        }, {
                    field: "ShipAddress"
                        }, {
                    field: "ShipName"
                        }]
        }
    });
    
    $("#nombre2").text(dataSourceDetail);
    
    $("#detalle2").kendoListView({
        dataSource: dataSourceDetail,
        template: kendo.template($("#tema002").html())
    });
};

window.llamada = function (e) {
    //alert(e);
    var seleccionado = e.view.params.info;
    var seleccionado2 = e.view.params.info2;
    $("#nombre").text(seleccionado);
    $("#nombre2").text(seleccionado2);

    detailInit(seleccionado);

}

// END_CUSTOM_CODE_funcionalidad03