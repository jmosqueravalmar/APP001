$("#btnAddFoto").attr("onclick","kendo.mobile.application.navigate('components/funcionalidad05/captureView.html');f05getImage();");
f05getImage();

function id(element) {
        return document.getElementById(element);
    }
    (function () {
        window.captureImageModel = kendo.observable({
            pictureSource: null,
            destinationType: null,
            capureImage: function (e) {
                var that = this;
                navigator.device.capture.captureImage(that.captureSuccess, that.captureError, {
                    limit: 1,
                    quality: 50,
                    targetWidth: 600,
                    targetHeight: 600,
                    encodingType: Camera.EncodingType.PNG,
                    correctOrientation: true
                });
                //Codigo para eliminar el bug de la primera grabación (en la primera grabación no se guarda la ruta)
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.stopPropagation();
                //end
            },
            captureSuccess: function (capturedFiles) {
                var i, capturesMsg = "";
                for (i = 0; i < capturedFiles.length; i += 1) {
                    capturesMsg += capturedFiles[i].fullPath;
                }
                capturesMsg = capturesMsg.replace(/\%20/g, ' ');
                f05newImage(capturesMsg);
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.stopPropagation();
            },
            captureError: function (error) {
                if (window.navigator.simulator === true) {
                    alert(error);
                } else {
                    var media = document.getElementById("media");
                    media.innerHTML = "An error occured! Code:" + error.code;
                }
            },
        });

    }());

function playAudio(ID) {
    var src = document.getElementById("archivo" + ID).value;
    if (ID > 0) {
        //alert("Link Ausa: " + src);
    } else {
        //src = src.replace("file:/", "");
    }
    //src = "http://upload.wikimedia.org/wikipedia/commons/c/c3/Kendo_EM_2005_-_kote.jpg";
    $("#f05dialogImageView").kendoWindow({
        //content: "<img src='"+src+"' />"
        width: "80%",
        height: "75%",
        title: "Imagen",
        modal: true,
        visible: false
    });
    $("#f05dialogImageView").data("kendoWindow").center();
    $("#f05dialogImageView").data("kendoWindow").content("<img  style='width: 100%;' src='" + src + "' />");
    $("#f05dialogImageView").data("kendoWindow").open();
}

function f05getImage() {
    var dsImage = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://www.ausa.com.pe/appmovil_test01/Operaciones/ObtenerFotos?operacion=" + f05NumOperacion,
                dataType: "json",
                type: "get"
            }
        }
    });

    dsImage.fetch(function () {
        $("#f05viewImage").kendoListView({
            dataSource: dsImage,
            template: kendo.template($("#f05TemLI").html())
        });
    });
}

function f05enviarBackend() {
    //Iteramos los audios grabados en la memoria de nuestros smartphone, para hacer la carga de audios en el backend services
    kendo.ui.progress($("#f05listaImage"), true);
    $("a[type='newAudio']").each(function (index) {
        var fileToUpload = $(this).attr("value"); //capturedFiles[0].fullPath;
        upload(fileToUpload);
        $(this).parent().remove();
    });
    $("#f05btnSendBS").attr("disabled", "disabled");
}

function upload(fileToUpload) {
    var apiKey = "80i2xn90wysdmolz";
    var el = new Everlive(apiKey);
    var options = {
        fileName: 'myImagennn.png',
        mimeType: ' image/png'
    };
    el.files.upload(fileToUpload, options).then(function (r) {
            var uploadResultArray = JSON.parse(r.response).Result;
            var uploadedFileId = uploadResultArray[0].Id;
            var uploadedFileUri = uploadResultArray[0].Uri;
            uploadedFileUri = uploadedFileUri.replace("https", "http");
            var newArchive = {
                Name: "MyArchive",
                FileUri: uploadedFileUri,
                FileId: uploadedFileId
            };
            el.data("Archivos").create(newArchive, function (data) {
                f05accionImage("insert", uploadedFileUri, "", data.result.Id);
            }, function (err) {
                alert("Error al subir el archivo al backend service " + JSON.stringify(err));
            });
        },
        function (uploadError) {
            alert(JSON.stringify(uploadError));
        });
}
var toquen = 0;

function f05newImage(archivo) {
        //$("#newAudio").append('<button type="button" class="list-group-item"><a class="btn btn-default btn-xs" type="newAudio" value="' + archivo + '" ><i class="fa fa-trash-o text-muted"></i></a> Nuevo Audio<span style="float:right"><a class="btn btn-info btn-xs" onclick="playAudio('archivo')"><i class="fa fa-play"></i></a></span></button>')
        toquen = toquen + 1;
        var idnota = "local" + toquen;
        $("#f05newImage").append('<button type="button" class="list-group-item" id="btn' + idnota + '"><a class="btn btn-default btn-xs" type="newAudio" value="' + archivo + '"><i class="fa fa-trash-o text-muted"></i></a>&nbsp&nbsp&nbsp<i class="fa fa-hdd-o text-muted"></i> Nueva Imagen: ' + idnota + '<tag id="divAccion' + idnota + '" type="divIsPlay" align="center"></tag><span style="float:right"><input value="' + archivo + '" id="archivo' + idnota + '" type="hidden"></input><a class="btn btn-info btn-xs" onclick="playAudio(' + "'" + idnota + "'" + ')"><i id="iconBtn' + idnota + '" type="iconBtn" class="fa fa-eye"></i></a></span></button>');

        $("#f05btnSendBS").removeAttr("disabled");
    }
    //Delete new audio
$(document).on("click", "a[type='newAudio']", function () {
    //$(this).parent().remove();
    $("#f05dialogImage").kendoWindow({
        title: "Confirmación",
        scrollable: false,
        modal: true,
        visible: false
    });
    idnota = $(this).parent().attr("id").replace("btn", "");
    $("#f05dialogImage").data("kendoWindow").open();
    $("#f05divMensajeConf").text("¿Desea eliminar la imagen " + idnota + " de la operación?");
    $("#f05dialogImage").data("kendoWindow").center();
    $("#f05accionImage").attr('onclick', 'f05deleteImage( idnota )');
});

function f05deleteImage(idAudio) {
    if ($.isNumeric(idAudio)) {
        $("#f05dialogImage").data("kendoWindow").open();
        $("#f05dialogImage").data("kendoWindow").center();
        $("#f05divMensajeConf").text("¿Desea eliminar la imagen " + idAudio + " de la operación?");
        $("#f05accionImage").attr('onclick', 'f05accionImage("ndelete","",' + idAudio + ',"")');
    } else {
        $('#f05dialogImage').data('kendoWindow').close();
        $("#btn" + idAudio).remove();
        if ($('a[type="newAudio"]').length == 0) {
            $("#f05btnSendBS").attr("disabled", "disabled");
        }
    }
}

function f05accionImage(accion, FileUri, idAudio, idAudioBackend) {

    //Notificaciones
    var notificationElement = $("#notification");
    notificationElement.kendoNotification();
    var notificationWidget = notificationElement.data("kendoNotification");
    //End
    var txtidUsuario = sessionStorage.getItem("sessionUSER");
    accion == "insert" && $.ajax({
        type: "POST",
        url: 'http://www.ausa.com.pe/appmovil_test01/Operaciones/InsertarFotos',
        //url: 'http://54.213.238.161/wsAusa/Operaciones/InsertarFotos',
        data: {
            //archivo: "http://tagticaweb.com/wp-content/uploads/2010/11/imagen-corporativa-tagticaweb.jpg",
            archivo: FileUri,
            usuario: txtidUsuario,
            operacion: f05NumOperacion
        },
        async: false,
        success: function (datos) {
            var data = [];
            data = JSON.parse(datos);
            idArchivo = data[0].ID;
            if (data[0].ID > 0) {

                $.ajax({
                    type: "POST",
                    //url: 'http://www.ausa.com.pe/appmovil_test01/Relaciones/ninsert',
                    url: 'http://www.ausa.com.pe/appmovil_test01/Operaciones/InsertarTareaFotos',
                    data: {
                        archivo: FileUri,
                        usuario: txtidUsuario,
                        operacion: f05NumOperacion //$('#f05txtid').val()
                    },
                    async: false,
                    success: function (datos) {
                        //ajax para descargar, guardar en servidor y para actualizar el url en server ausa
                        $.ajax({
                            type: "POST",
                            //url: "http://54.213.238.161/wsAusa/Notas/ReadNotaUrl",
                            url: "http://www.ausa.com.pe/appmovil_test01/Upload/UploadUrl",
                            data: {
                                id: idArchivo,
                                url: FileUri,
                                tipo: 2,
                                subPath: f05NumOperacion //$('#f05txtid').val()
                            },
                            async: false,
                            success: function (datos) {
                                kendo.ui.progress($("#f05listaImage"), false);
                                if (parseInt(datos) == 0) {
                                    $('#f05viewImage').data('kendoListView').dataSource.read();
                                    $('#f05viewImage').data('kendoListView').refresh();
                                    notificationWidget.show("Se insertó correctamente la imagen: " + idArchivo, "success");

                                    //Para borrar del backend service
                                    var el = new Everlive('80i2xn90wysdmolz');
                                    var data = el.data('Archivos');
                                    data.destroySingle({
                                            Id: idAudioBackend
                                        },
                                        function () {
                                            //notificationWidget.show("Eliminado correctamente del backend service", "success");
                                        },
                                        function (error) {
                                            notificationWidget.show(JSON.stringify(error), "error");
                                        });

                                } else {
                                    notificationWidget.show("No se descargó el archivo del backend service", "danger");
                                };
                            },
                            error: function () {
                                kendo.ui.progress($("#f05listaImage"), false);
                                notificationWidget.show("El servicio no está disponible", "danger");
                                valido = false;
                            }
                        });
                    },
                    error: function () {
                        notificationWidget.show("No se puede establecer la conexión al servicio", "danger");
                        valido = false;
                    }
                });
                $('#f05viewImage').data('kendoListView').dataSource.read();
                $('#f05viewImage').data('kendoListView').refresh();
            }
        },
        error: function () {
            notificationWidget.show("No se puede establecer la conexión al servicio", "danger");
        }
    });

    accion == "ndelete" && $.ajax({
        type: "POST",
        //url: 'http://www.ausa.com.pe/appmovil_test01/Relaciones/ndelete',
        url: 'http://www.ausa.com.pe/appmovil_test01/Operaciones/EliminarTareaFotos',
        data: {
            archivo: FileUri,
            operacion: f05NumOperacion //$('#f05txtid').val()
        },
        async: false,
        success: function (datos) {
            var data = [];
            data = JSON.parse(datos);
            if (parseInt(data[0].Ejecucion) == 0) {
                notificationWidget.show("Se eliminó la imagen " + idAudio + " de opración", "success");
                $('#f05viewImage').data('kendoListView').dataSource.read();
                $('#f05viewImage').data('kendoListView').refresh();

            } else {
                notificationWidget.show("No se eliminó la imagen correctamente", "danger");
            }
            $('#f05dialogImage').data('kendoWindow').close();
        },
        error: function () {
            notificationWidget.show("No se puede establecer la conexión al servicio", "danger");
            valido = false;
        }
    });
}