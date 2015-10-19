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
                }
            });
        
        $("#tareas").kendoListView({
            dataSource: datosEmpleados,
            template: kendo.template($("#tema001").html())
        });
    }

	function visibles(valor){
        //$('#'+valor).toggle();
        $('#'+valor).fadeToggle(600)
    }

	function detalleTarea(valores){
        var idregistro = parseInt(valores.view.params.idEmpd);
		
        var detalleOrden = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
            	data: "d.results"
            },
            filter: { // filter is applied outside of the transport option
                field: "EmployeeID", operator: "eq", value: idregistro
            }
        });

        $("#detalle").kendoListView({
            dataSource: detalleOrden,
            template: kendo.template($("#tema002").html())
        });
    }

	function regresarPantalla(btnregresar,divdatos){ 
        $(divdatos).text("");
        window.location.href = btnregresar;        
    }

// END_CUSTOM_CODE_funcionalidad03