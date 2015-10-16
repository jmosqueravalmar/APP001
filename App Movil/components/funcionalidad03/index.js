'use strict';
app.funcionalidad03 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});

// START_CUSTOM_CODE_funcionalidad03 
    
    //Carga JavaScript 1st
	function cargaEmpleados (){         
        var datosEmpleados = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    ,
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                    }
                }
            });

            $("#tareas").kendoListView({
                dataSource: datosEmpleados,
                template: kendo.template($("#tema001").html())
            });
    }

	function visibles(valor){
        $('#'+valor).toggle();
    }

// END_CUSTOM_CODE_funcionalidad03