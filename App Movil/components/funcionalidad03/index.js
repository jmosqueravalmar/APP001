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
                            {id: 1, nombre: "Tarea Nro 1", cliente: "Cliente 1", fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 2, nombre: "Tarea Nro 2", cliente: "Cliente 2",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "1"},
                            {id: 3, nombre: "Tarea Nro 3", cliente: "Cliente 3",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "2"},
                            {id: 4, nombre: "Tarea Nro 4", cliente: "Cliente 4",fcreacion: "01/12/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 5, nombre: "Tarea Nro 5", cliente: "Cliente 5",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "2"},
                            {id: 6, nombre: "Tarea Nro 6", cliente: "Cliente 6",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "2"},
                            {id: 7, nombre: "Tarea Nro 7", cliente: "Cliente 7",fcreacion: "01/12/2015", flimite: "01/10/2015", estado: "1", prioridad: "1"},
                            {id: 8, nombre: "Tarea Nro 8", cliente: "Cliente 8",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "2"},
                            {id: 9, nombre: "Tarea Nro 9", cliente: "Cliente 9",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "1"},
                            {id: 10, nombre: "Tarea Nro 10", cliente: "Cliente 10",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "3"},
                            {id: 11, nombre: "Tarea Nro 11", cliente: "Cliente 11",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "2", prioridad: "1"},
                            {id: 12, nombre: "Tarea Nro 12", cliente: "Cliente 12",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "3", prioridad: "3"},
                            {id: 13, nombre: "Tarea Nro 13", cliente: "Cliente 13",fcreacion: "01/10/2015", flimite: "01/10/2015", estado: "1", prioridad: "3"},
                        ],
        				pageSize: 5
					 });

    //Carga JavaScript 1st
	function cargaEmpleados (){   
        
        $("#tareas").kendoGrid({
                dataSource: ListTareas,
                height: 250,
            	filterable: true,
                sortable: true, 
            	scrollable: false	,
            	pageable: true,
                columns: [/*{
                        field:"id",
                        filterable: false,
                        width: "50px"
                    },*/
                    {
                        field: "nombre",
                        title: "Nombre de Tarea",
                        width: "350px",
                        href: "#details?idEmpd=${id}"
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
  
// END_CUSTOM_CODE_funcionalidad03