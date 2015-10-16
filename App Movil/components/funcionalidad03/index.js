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
                transport: {
                    read: "http://54.207.102.124:8980/Customer/rest/Customer/Read",
                    dataType: "jsonp"
                    },
            	schema: {
                    data: function (data) {
                    	return data.response.dsCustomer.dsCustomer.ttCustomer;
                    }
                }
            });

        $("#tareas").kendoListView({
            dataSource: datosEmpleados,
            template: kendo.template($("#tema001").html())
        });
    }

	function visibles(valor){
        //$('#'+valor).toggle();
        $('#'+valor).fadeToggle(1000)
    }

	function detalleTarea(valores){
        var idregistro = valores.view.params.idEmpd; 
        //$("#detalle").text(registro); 
		
        var detalleOrden = new kendo.data.DataSource({
            transport: {
                    read: "http://54.207.102.124:8980/Customer/rest/Customer/Read",
                	dataType: "jsonp"
                    },
                    schema: {
                        data: function (data) {
                            return data.response.dsCustomer.dsCustomer.ttCustomer;
                    }
                },
            filter: { field: "CustNum", operator: "eq", value: parseInt(idregistro) }
        });
         

        $("#detalle").kendoListView({
            dataSource: detalleOrden,
            template: kendo.template($("#tema002").html())
        });
    }

// END_CUSTOM_CODE_funcionalidad03