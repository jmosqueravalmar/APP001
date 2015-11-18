'use strict';

app.funcionalidad01 = kendo.observable({
    beforeShow: function() {
        //console.log("DFC > beforeShow ");        
    },
    onShow: function() {

    },
    afterShow: function() {},    
    MostraDetalleCliente: function() {
        console.log("DFC > MostraDetalleCliente ");
        console.log("Detalle Cliente ClienteID > " + ClienteID);
        
        //DETALLE CONTACTOS CLIENTE START        
        dsContactosCliente = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/contacto/"+ClienteID,
                    dataType: "json"
                 },
              },
              schema: {
                  model: {
                       id: "ContactoID",
                       fields: {
                           ContactoID: { editable: false, nullable: true, type: "number" },
                           ContactoNombre: {type: "string"},
                           ContactoFechaCumpleanos: {type: "string"}
                       }
                   }
              },
             requestEnd: function(e) {
                //console.log("dsContactosCliente >> requestEnd");
             },
         });

        dsTelefonosContactoCliente = new kendo.data.DataSource({
            transport: {
                //Esempio
                // http://www.ausa.com.pe/appmovil_test01/Clientes/contactoT?id=199&contacto=0
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/contactoT?id="+ClienteID+"&contacto=0",
                    dataType: "json"
                 },
            },
            schema: {
                model: {
                    id: "TelefonoID",
                    fields: {
                        TelefonoID: { editable: false, nullable: true, type: "number" },
                        ContactoID: { editable: false, nullable: true, type: "number" },
                        ContactoNombre: {editable: false, type: "string"},
                        Tipo: {editable: false, type: "string"},
                        Numero: {type: "string"}
                    }
                }
            },
            requestEnd: function(e) {
                //console.log("dsTelefonosContactoCliente >> requestEnd");
            },
        });        
        
         $("#ContactosCliente").kendoDropDownList({
            dataTextField: "ContactoNombre",
            dataValueField: "ContactoID",
            dataSource: dsContactosCliente,
            change: function(e) {
                //console.log("ContactosCliente >> change");
                // ContactoFechaCumpleanos
                // get the dataItem corresponding to the selectedIndex.
                $("#FechaCumpleanos").html($.trim(this.dataItem().ContactoFechaCumpleanos)); 
            },
            dataBound: function(e) {
                //console.log("ContactosCliente >> dataBound");
                $("#FechaCumpleanos").html($.trim("1 May.")); 
                // dataItem from dsContactosCliente DataSource
                // console.log("ContactosCliente >> dataBound >> dataItem(0): " + this.dataItem(0).ContactoID + " -- " + this.dataItem(0).ContactoNombre + " -- " + this.dataItem(0).ContactoFechaCumpleanos);
                // ContactoFechaCumpleanos
                $("#FechaCumpleanos").html($.trim(this.dataItem(0).ContactoFechaCumpleanos));
            }
         });
        
         $("#TelefonosContactoCliente").kendoDropDownList({
            cascadeFrom: "ContactosCliente",
            dataTextField: "Numero",
            dataValueField: "TelefonoID",
            dataSource: dsTelefonosContactoCliente
         });
        
         $("#btnLlamar").kendoButton({
                 click: function(e) {
                     //console.log(e.event.target.tagName);                     
                     // +++ ERROR +++ Simple reference to a JQuery object
                     //console.log("Llamar numero >> " + $("#TelefonosContactoCliente").dataItem().TelefonoNumero);                     
                     //console.log("Llamar numero >> " + $("#TelefonosContactoCliente").data("kendoDropDownList").dataItem().Numero);
                     window.open('tel:' + $("#TelefonosContactoCliente").data("kendoDropDownList").dataItem().Numero, '_system')
                 }
        });
        //DETALLE CONTACTOS CLIENTE END
        
        //SITUACION DE PAGO START
        dsSituaccionPago = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/morosidad/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           ClienteRazonSocial: {type: "string"},
                           DeudaVencida: {type: "number"},
                           PlazoDePago: {type: "number"},
                           LíneaAsignada: {type: "number"},
                           UtilizacionActual: {type: "number"},
                           DiferenciaDeLineas: {type: "number"},
                           PorcUtilizacionDeLinea: {type: "number"},
                           UsoDeLineaPromedioUltSeisMeses: {type: "number"},
                           PorcUsoDeLineaPromedioUltSeisMeses: {type: "number"},
                       }
                   }
              },
             requestEnd: function(e) {
                //console.log("dsSituaccionPago >> requestEnd");
             },
         });   
        
        dsSituaccionPago.fetch(function(){
            var data = this.data();
            //console.log("dsSituaccionPago >> data fetch()");
            //console.log(data.length);
            //console.log("ClienteRazonSocial >> " + data[0].ClienteRazonSocial);
            //console.log("PlazoDePago >> " + data[0].PlazoDePago);
            $("#PorcUtilizacionDeLinea").html(data[0].PorcUtilizacionDeLinea + "%");
        });
        //SITUACION DE PAGO END

        //PARTICIPACION AUSA Y OTRAS AGENCIAS START
        dsParticipacionAUSAyAgencias = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/participacionD/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           ClienteRazonSocial: {type: "string"},
                           Agente: {type: "string"},
                           NumDespachosVigentes: {type: "number"},
                           PorcDespachosVigentes: {type: "number"},
                           NumDespachosAnterior: {type: "number"},
                           PorcDespachosAnterior: {type: "number"},
                           FOBVigente: {type: "number"},
                           PorcFOBVigente: {type: "number"},
                           FOBAnterior: {type: "number"},
                           PorcFOBAnterior: {type: "number"},
                           CIFVigente: {type: "number"},
                           PorcCIFVigente: {type: "number"},
                           CIFAnterior: {type: "number"},
                           PorcCIFAnterior: {type: "number"},
                       }
                   }
              },
             requestEnd: function(e) {
                //console.log("dsParticipacionAUSAyAgencias >> requestEnd");
             },
         });   
        
         dsParticipacionAUSAyAgencias.fetch(function(){
              var view1 = dsParticipacionAUSAyAgencias.view();
              //console.log("view1 >> length: " + view1.length);
             //ParticipacionOtrasAgencias
             var strHTML = "";
             for (var i = 0; i < view1.length; i++) {
                 //strHTML += "<dd> Agencias " + i + "</dd>"; 
                 strHTML += "<dd>";
                 strHTML += view1[i].Agente;
                 strHTML += " ("+view1[i].PorcDespachosAnterior+"%)";
                 strHTML += "</dd>";
             }
             $("#ParticipacionOtrasAgencias").html(strHTML);
             
              //AUSA  ADUANAS S.A.
              dsParticipacionAUSAyAgencias.filter({ field: "Agente",  operator: "startswith", value: "AUSA" });
              var view2 = dsParticipacionAUSAyAgencias.view();
              //console.log("view2 >> length: " + view2.length);
              //console.log("view2 >> Agente: " + view2[0].Agente);
              $("#PorcDespachosVigentes").html(view2[0].PorcDespachosVigentes + "%");
              $("#PorcDespachosAnterior").html(view2[0].PorcDespachosAnterior + "%");
              $("#PorcFOBVigente").html(view2[0].PorcFOBVigente + "%");
              $("#PorcFOBAnterior").html(view2[0].PorcFOBAnterior + "%");
              $("#PorcCIFVigente").html(view2[0].PorcFOBAnterior + "%");
              $("#PorcCIFAnterior").html(view2[0].PorcCIFAnterior + "%");

         });
        //PARTICIPACION AUSA Y OTRAS AGENCIAS END
        
        //INGRESO POR DESPACHO INGRESO ADUANAS CANTIDAD USOS AOL DEL MES START
        dsIngresoDespachoAduanaUsoAOLMes = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/participacion/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           ClienteRazonSocial: {type: "string"},
                           IPDmesVigente: {type: "number"},
                           IPDMesAnterior: {type: "number"},
                           IPDUltimos3Meses: {type: "number"},
                           AduanaIngresoMesVigente: {type: "number"},
                           AduanaIngresoMesAnterior: {type: "number"},
                           AduanaIngresoUltimos3Meses: {type: "number"},
                           HitsAOL: {type: "number"},
                       }
                   }
              },
             requestEnd: function(e) {
                console.log("dsIngresoDespachoAduanaUsoAOLMes >> requestEnd");
             },
         });
               
        dsIngresoDespachoAduanaUsoAOLMes.fetch(function(){
            // id --> PartAduanaCierreMesAnterior
            // id --> PartAduanaAcumuladoMes
            // id --> PartAduanaAcumuladoTresMeses
            // id --> UsosAOLdelMes
            var data = this.data();
            $("#PartDespachoCierreMesAnterior").html("$" + data[0].IPDMesAnterior);
            $("#PartDespachoAcumuladoMes").html("$" + data[0].IPDmesVigente);
            $("#PartDespachoAcumuladoTresMeses").html("$" + data[0].IPDUltimos3Meses);
            $("#PartAduanaCierreMesAnterior").html("$" + data[0].AduanaIngresoMesAnterior);
            $("#PartAduanaAcumuladoMes").html("$" + data[0].AduanaIngresoMesVigente);
            $("#PartAduanaAcumuladoTresMeses").html("$" + data[0].AduanaIngresoUltimos3Meses);
            $("#UsosAOLdelMes").html(data[0].HitsAOL);
        });        
        //INGRESO POR DESPACHO INGRESO ADUANAS CANTIDAD USOS AOL DEL MES END
        
        //CONDICIONES DE PAGO START
        dsCondicionesDePago = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/condpagoD/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           Compania: {type: "string"},
                           ClienteRazonSocial: {type: "string"},
                           LineaNegocio: {type: "string"},
                           Servicio: {type: "string"},
                           DiasPago: {type: "number"},
                           HastaMonto: {type: "string"},
                           Moneda: {type: "string"},
                           LineaCredito: {type: "number"},
                       }
                   }
              },
             requestEnd: function(e) {
                //console.log("dsCondicionesDePago >> requestEnd");
             },
         });        
        
         dsCondicionesDePago.fetch(function(){
             var strHTMLCondicionesDePago = "";
             var data = this.data();
             //console.log("dsCondicionesDePago.data() >> length: " + data.length);            
             
             for (var i = 0; i < data.length; i++) {
                 //console.log("dsCondicionesDePago.Servicio: " + data[i].Servicio);
                 strHTMLCondicionesDePago += "<details>";
                 strHTMLCondicionesDePago += "<summary><b>";
                 strHTMLCondicionesDePago += data[i].Servicio;                 
                 strHTMLCondicionesDePago += "</b></summary>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Dias Pago</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].DiasPago;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Hasta Monto</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].HastaMonto;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Moneda</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].Moneda;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Linea Credito</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].LineaCredito;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Linea Negocio</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].LineaNegocio;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-5\">Compania</div>";
                 strHTMLCondicionesDePago += "<div class=\"col-xs-7\"><b>";
                 strHTMLCondicionesDePago += data[i].Compania;
                 strHTMLCondicionesDePago += "</b></div>";
                 strHTMLCondicionesDePago += "</details>";
             }
             
             $("#CondicionesDePago").append(strHTMLCondicionesDePago);
         });        
        //CONDICIONES DE PAGO END
        
        //PARTICIPACION TARIFAS START
        dsTarifas = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/tarifas/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           ClienteRazonSocial: {type: "string"},
                           Servicio: {type: "string"},
                           Observacion: {type: "string"},
                       }
                   }
              },
             requestEnd: function(e) {
                //console.log("dsTarifas >> requestEnd");
             },
         });
        
         dsTarifas.fetch(function(){
             var strHTMLTarifas = "";
             var data = this.data();
             //console.log("dsTarifas.data() >> length: " + data.length);            
             
             for (var i = 0; i < data.length; i++) {
                 //console.log("dsTarifas.Servicio: " + data[i].Servicio);
                 strHTMLTarifas += "<details>";
                 strHTMLTarifas += "<summary><b>";
                 strHTMLTarifas += data[i].Servicio;
                 strHTMLTarifas += "</b></summary>";
                 strHTMLTarifas += "<p><b>Observaciones</b></p>";
                 strHTMLTarifas += "<textarea readonly rows=\"5\" cols=\"40\">";
                 strHTMLTarifas += data[i].Observacion;
                 strHTMLTarifas += "</textarea>";
                 strHTMLTarifas += "</details>";
             }
             
             $("#Tarifas").append(strHTMLTarifas);
         });
        //PARTICIPACION TARIFAS END
    
    },
    
    //TODO-WIP
    //DETALLE  Morosidad y Utilizacion Linea START
    MostraMorosidadUtilizacionLinea: function(){
        //console.log("DFC > MostraMorosidadUtilizacionLinea ");
        //console.log("Morosidad y Utilizacion de Linea >> ClienteID > " + ClienteID);
        
        dsSituaccionPago.fetch(function(){
            var data = this.data();
            //console.log("dsSituaccionPago >> data fetch() 2");
                        
            $("#detMULClienteRazonSocial").html(data[0].ClienteRazonSocial);
            $("#detMULDeudaVencida").html("$" + data[0].DeudaVencida);
            $("#detMULPlazoDePago").html(data[0].PlazoDePago);
            $("#detMULLíneaAsignada").html(data[0].LíneaAsignada);
            $("#detMULUtilizacionActual").html(data[0].UtilizacionActual);
            $("#detMULDiferenciaDeLineas").html(data[0].DiferenciaDeLineas);
            $("#detMULPorcUtilizacionDeLinea").html(data[0].PorcUtilizacionDeLinea);
            $("#detMULUsoDeLineaPromedioUltSeisMeses").html(data[0].UsoDeLineaPromedioUltSeisMeses);
            $("#detMULPorcUsoDeLineaPromedioUltSeisMeses").html(data[0].PorcUsoDeLineaPromedioUltSeisMeses);
        });
        
        dsCondicionesDePagoMUL = new kendo.data.DataSource({
              transport: {
                //Parametrizzare con ContactoID
                read: {
                    url: "http://www.ausa.com.pe/appmovil_test01/Clientes/condpago/"+ClienteID,
                    dataType: "json"
                 },
              },
             schema: {
                  model: {
                       id: "ClienteID",
                       fields: {
                           ClienteID: { editable: false, nullable: true, type: "number" },
                           ClienteRazonSocial: {type: "string"},
                           LíneaFacturaAUSA:  {type: "number"},
                           PlazoFacturaAUSA:  {type: "number"},
                           LíneaLetrasAUSA:  {type: "number"},
                           PlazoLetrasAUSA:  {type: "number"},
                       }
                   }
              },
             requestEnd: function(e) {
                console.log("dsCondicionesDePagoMUL >> requestEnd");
             },
        });
        
        dsCondicionesDePagoMUL.fetch(function(){
            var data = this.data();
            console.log("dsCondicionesDePagoMUL >> data fetch() ");
            $("#detMULLíneaFacturaAUSA").html("$" + data[0].LíneaFacturaAUSA);
            $("#detMULPlazoFacturaAUSA").html(data[0].PlazoFacturaAUSA);
            $("#detMULLíneaLetrasAUSA").html("$" + data[0].LíneaLetrasAUSA);
            $("#detMULPlazoLetrasAUSA").html(data[0].PlazoLetrasAUSA);
        });
    },
    //DETALLE  Morosidad y Utilizacion Linea START
});

// START_CUSTOM_CODE_funcionalidad01
UsuarioID = "305";

var dsCliente = new kendo.data.DataSource({
    transport: {
        // OK funziona, ottimizzare per grandi vol. di dati || paginazione
        // Parametrizzare la URL con una variabile idUsuario
        read: {
            url: "http://www.ausa.com.pe/appmovil_test01/Clientes/cartera/"+UsuarioID,
            dataType: "json"
        },        
     },
    schema: {
        model: {
            id: "ClienteID",
            fields: {
                ClienteID: { editable: false, nullable: true, type: "number" },
                ClienteRazonSocial: {type: "string"},
            }
        }
    },
    // Filtro de prueba para desarrollo --- Eliminar en produccion!!!
     filter: { field: "ClienteRazonSocial", operator: "startswith", value: "EX" }
});


var UsuarioID = "";
var ClienteID = "";
var dsContactosCliente = null;
var dsTelefonosContactoCliente = null;
var dsSituaccionPago = null;
var dsParticipacionAUSAyAgencias = null;
var dsIngresoDespachoAduanaUsoAOLMes = null;
var dsCondicionesDePago = null;
var dsTarifas = null;
var dsCondicionesDePagoMUL = null;
// END_CUSTOM_CODE_funcionalidad01
