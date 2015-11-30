'use strict'; 
app.funcionalidad05 = kendo.observable({
    onShow: function () {
        //Carga JavaScript 3st
    },
    afterShow: function () {
        //Carga JavaScript 4st        
    }
});
//dsTareas -> obtenemos la lista de tareas
var dsOperaciones = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/Listar",
            dataType: "json",
            data: {
                txtdespachador: 3091,
                txtcliente: 0,
                txtorden: 0,
                txtalmacen: 0,
                txtestado: 9
            }
        }
    }
});
//getTareas -> cargamos el grid tareas
function getOperaciones() {
    $("#operaciones").kendoGrid({
        dataSource: dsOperaciones,
        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        selectable: "row",
        change: selectGrid,
        // filterMenuInit: filterMenu, //llamamos a la función de configuración de los filtros
        columns: [{
            field: "#Operacion",
            title: "Nro Operación",
            width: "120px",
            }]
    });
}