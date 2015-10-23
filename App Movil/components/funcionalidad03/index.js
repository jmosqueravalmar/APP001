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
    
	var ListTareas = new kendo.data.DataSource({ 
                        data: [
                            {id: 1,  idTTarea: 10,nombre: "Tarea Nro 1", cliente: "Cliente 1", fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 2,  idTTarea: 10,nombre: "Tarea Nro 2", cliente: "Cliente 2",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "1"},
                            {id: 3,  idTTarea: 3,nombre: "Tarea Nro 3", cliente: "Cliente 3",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "2"},
                            {id: 4,  idTTarea: 4,nombre: "Tarea Nro 4", cliente: "Cliente 4",fcreacion: "01/12/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 5,  idTTarea: 5,nombre: "Tarea Nro 5", cliente: "Cliente 5",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "2"},
                            {id: 6,  idTTarea: 6,nombre: "Tarea Nro 6", cliente: "Cliente 6",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "2"},
                            {id: 7,  idTTarea: 7,nombre: "Tarea Nro 7", cliente: "Cliente 7",fcreacion: "01/12/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 8,  idTTarea: 8,nombre: "Tarea Nro 8", cliente: "Cliente 8",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "2"},
                            {id: 9,  idTTarea: 9,nombre: "Tarea Nro 9", cliente: "Cliente 9",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "1"},
                            {id: 10, idTTarea: 10,nombre: "Tarea Nro 10", cliente: "Cliente 10",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "3"},
                            {id: 11, idTTarea: 11,nombre: "Tarea Nro 11", cliente: "Cliente 11",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "1"},
                            {id: 12, idTTarea: 12,nombre: "Tarea Nro 12", cliente: "Cliente 12",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "3"},
                            {id: 13, idTTarea: 13,nombre: "Tarea Nro 13", cliente: "Cliente 13",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "3"}
                        ],
        				pageSize: 8
					 });
	
	var DetallTareas = new kendo.data.DataSource({ 
                        data: [
                            {idTTarea: 1,nombre: "Tipo de Tarea Nro 1" , fcreacion: "01/10/2015"},
                            {idTTarea: 2,nombre: "Tipo de Tarea Nro 2" , fcreacion: "01/10/2015"},
                            {idTTarea: 3,nombre: "Tipo de Tarea Nro 3" , fcreacion: "01/10/2015"},
                            {idTTarea: 4,nombre: "Tipo de Tarea Nro 4" , fcreacion: "01/10/2015"},
                            {idTTarea: 5,nombre: "Tipo de Tarea Nro 5" , fcreacion: "01/10/2015"},
                            {idTTarea: 6,nombre: "Tipo de Tarea Nro 6" , fcreacion: "01/10/2015"},
                            {idTTarea: 7,nombre: "Tipo de Tarea Nro 7" , fcreacion: "01/10/2015"},
                            {idTTarea: 8,nombre: "Tipo de Tarea Nro 8" , fcreacion: "01/10/2015"},
                            {idTTarea: 9,nombre: "Tipo de Tarea Nro 9" , fcreacion: "01/10/2015"},
                            {idTTarea: 10,nombre: "Tipo de Tarea Nro 10", fcreacion: "01/10/2015"},
                            {idTTarea: 11,nombre: "Tipo de Tarea Nro 11", fcreacion: "01/10/2015"},
                            {idTTarea: 12,nombre: "Tipo de Tarea Nro 12", fcreacion: "01/10/2015"},
                            {idTTarea: 13,nombre: "Tipo de Tarea Nro 13", fcreacion: "01/10/2015"}
                        ]
					 });
	

    //Carga JavaScript 1st
	

	function cargaEmpleados (){   
        
        $("#tareas").kendoGrid({
                dataSource: ListTareas,
                height: 250,
            	filterable: true,
                sortable: true, 
            	scrollable: false,
            	pageable: true,
            	selectable: "row",
            	change: eventoClick,
                columns: [/*{
                        field:"id",
                        filterable: false,
                        width: "50px"
                    },*/
                    {
                        field: "nombre",
                        title: "Nombre de Tarea",
                        width: "350px"                        
                    },
					{
                        field: "cliente",
                        title: "Cliente",
                        width: "150px"
                    },
                    {
                        field: "fcreacion",
                        title: "F. Creación",
                        format: "{0:dd/MM/yyyy}",
                        width: "50px"
                    }, {
                        field: "flimite",
                        title: "F. Limite",
                        format: "{0:dd/MM/yyyy}",
                        width: "50px"
                    }, {
                        field: "estado",
                        title: "Estado.",
                        width: "100px"
                    }, {
                        field: "prioridad",
                        title: "Prioridad.",
						width: "50px"
                    }
                ]
            	}); 
    }
	
	function eventoClick(){
         var seleccion = $(".k-state-selected").select();
        var idTar = this.dataItem(seleccion).id;
        var idTTa = this.dataItem(seleccion).idTTarea;
        /*console.log("id tarea -> " + idTar);
        console.log("id tipo -> " + idTTa);*/
        
        window.location.href = "#detalleTarea?id="+ idTar +"&id2=" + idTTa ;
    } 
	
	window.llamada = function (e) {
        var seleccionado = e.view.params.id;
        var seleccionado2= e.view.params.id2; 
        console.log("id tarea -> " + seleccionado);
        console.log("id tipo -> " + seleccionado2);
		
        DetallTareas.filter( { field: "idTTarea", operator: "eq", value: parseInt(seleccionado)});
        
    	$("#detalle2").kendoListView({
          dataSource: DetallTareas,
          template: kendo.template($("#tema002").html())
        });
        
        var filtro = new kendo.data.DataSource({
            			data: ListTareas
        			 }); 
        
        filtro.filter( { field: "id", operator: "eq", value: parseInt(seleccionado2)});
        
        $("#detalle3").kendoListView({
          dataSource: ListTareas,
          template: kendo.template($("#tema003").html())
        });
        
 
    } 
  
// END_CUSTOM_CODE_funcionalidad03