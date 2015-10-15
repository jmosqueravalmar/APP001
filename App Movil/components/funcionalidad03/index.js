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
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
            serverFiltering: true,
            filter: { field: "EmployeeID", operator: "eq", value: "3"}
        }
    });
    console.log (idEmpleado);
    //dataSourceDetail.filter( { field: "EmployeeID", operator: "eq", value: "3" });
        
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

    detailInit(seleccionado);

}

window.llamada2 = function (){
        
       var dataSource2 = new kendo.data.DataSource({
          transport: {
            read: function(options) {
              /* implementation omitted for brevity */
            },
            create: function(options) {
              // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/create
              $.ajax({
                url: "http://demos.telerik.com/kendo-ui/service/products/create",
                dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                // send the created data items as the "models" service parameter encoded in JSON
                data: {
                  models: kendo.stringify(options.data.models)
                },
                success: function(result) {
                  // notify the data source that the request succeeded
                  options.success(result);
                },
                error: function(result) {
                  // notify the data source that the request failed
                  options.error(result);
                }
              });
            }
          },
          batch: true,
          schema: {
            model: { id: "ProductID" }
          }
        });
        dataSource2.add( { ProductName: "Jmosquera2" });
        dataSource2.sync(); 
    
    
    
        /*****************************************************************/
        /*****************************************************************/
    
    
           
       var dataSource3 = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                },
                schema: {
                    model: { id: "ProductID" }
                },
                columns: [{
                    field: "ProductName",
                    title: "ProductName."
                        }, {
                    field: "UnitPrice",
                    title: "UnitPrice."
                        }, {
                    field: "Discontinued"
                        }
                ]}
        }); 
        
        dataSource3.sort({ field: "ProductID", dir: "desc" });
        
         
          var dataItem = dataSource3.get(50);
          console.log(dataSource3); // displays "Jane Doe"
        
           
    
    
        //dataSource3.remove(dataSource3.get(86));
    
        $("#detalle3").kendoListView({
            dataSource: dataSource3,
            template: kendo.template($("#tema003").html())
        });    
    
    
        
}
 


// END_CUSTOM_CODE_funcionalidad03