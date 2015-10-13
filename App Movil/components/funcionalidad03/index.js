'use strict';

app.funcionalidad03 = kendo.observable({
                                           onShow: function() {
                                               var dataSource = new kendo.data.DataSource({
                                                                                              transport: {
                                                       read: {
                                                                                                          url: "http://demos.telerik.com/kendo-ui/service/Products",
                                                                                                          dataType: "jsonp"
                                                                                                      }
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
                                           afterShow: function() {
                                           }
        
                                       });

// START_CUSTOM_CODE_funcionalidad03
 
window.llamada = function(e) { 
    //alert(e);
    var seleccionado = e.view.params.info;
    $("#nombre").text(seleccionado); 
} 
// END_CUSTOM_CODE_funcionalidad03