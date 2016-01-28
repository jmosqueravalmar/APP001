$("#btnAddFoto").attr("onclick", "kendo.mobile.application.navigate('components/funcionalidad07/captureView.html');f07getImage();");
// f07getImage();

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
                    limit: 1
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
                f07newImage(capturesMsg);
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
    $("#f07imgShow").attr("src", src);

    $("#f07dialogImageView").kendoWindow({
        width: "80%",
        height: "75%",
        title: "",
        modal: true,
        scrollable: false,
        draggable: false,
        activate: function () {
            //determina longitud de la imagen para acomodarla
            var img = document.getElementById('f07imgShow');
            //console.log("ancho*alto: " + img.clientWidth + " - " + img.clientHeight);
            if (img.clientHeight < img.clientWidth) {
                //console.log("hori");
                $("#f07imgShow").attr("style", "height: 100%;");
            } else {
                //console.log("vert");
                $("#f07imgShow").attr("style", "width: 100%;");
            }
            $("#f07dialogImageView").data("kendoWindow").center();
            $("#f07dialogImageView_wnd_title").html('Imagen: ' + ID); //  '<a class="btn btn-default btn-xs pull-right"><i class="fa fa-trash-o text-muted"></i></a>' 
        },
        resize: function () {
            $("#f07dialogImageView").data("kendoWindow").center();
            $("#f07dialogImageView_wnd_title").html('Imagen: ' + ID); //  '<a class="btn btn-default btn-xs pull-right"><i class="fa fa-trash-o text-muted"></i></a>' 
        },
        close: function (e) {
            $("#f07dialogImageView").data("kendoWindow").restore();
        },
        actions: ["Maximize", "Close"]
    });
    $("#f07dialogImageView").data("kendoWindow").center();
    $("#f07dialogImageView_wnd_title").html('Imagen: ' + ID); //  '<a class="btn btn-default btn-xs pull-right"><i class="fa fa-trash-o text-muted"></i></a>' 

    $("#f07activarZoom").css("display", "block");
    $("#f07dialogImageView").data("kendoWindow").open();

}

function f07getImage() {
    var dsImage = new kendo.data.DataSource({
        transport: {
            read: {
                url: WServ + "Operaciones/ObtenerFotos?operacion=" + f07NumOperacion,
                dataType: "json",
                type: "get"
            }
        }
    });

    dsImage.fetch(function () {
        $("#f07viewImage").kendoListView({
            dataSource: dsImage,
            template: kendo.template($("#f07TemLI").html())
        });
    });
}

function f07enviarBackend() {
    //Iteramos los audios grabados en la memoria de nuestros smartphone, para hacer la carga de audios en el backend services

    kendo.ui.progress($("#f07listaImage"), true);
    $("a[type='newImage']").each(function (index) {
        var fileToUpload = $(this).attr("value"); //capturedFiles[0].fullPath;
        upload(fileToUpload);
        $(this).parent().remove();
    });
    $("#f07btnSendBS").attr("disabled", "disabled");
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
                f07accionImage("insert", uploadedFileUri, "", data.result.Id);
            }, function (err) {
                alert("Error al subir el archivo al backend service " + JSON.stringify(err));
            });
        },
        function (uploadError) {
            alert(JSON.stringify(uploadError));
        });
}
var toquen = 0;

function f07newImage(archivo) {
        toquen = toquen + 1;
        var idnota = "local" + toquen;
        $("#f07newImage").append('<button type="button" class="list-group-item" id="btn' + idnota + '"><a class="btn btn-default btn-xs" type="newImage" value="' + archivo + '"><i class="fa fa-trash-o text-muted"></i></a>&nbsp&nbsp&nbsp<i class="fa fa-hdd-o text-muted"></i> Nueva Imagen: ' + idnota + '<tag id="divAccion' + idnota + '" type="divIsPlay" align="center"></tag><span style="float:right"><input value="' + archivo + '" id="archivo' + idnota + '" type="hidden"></input><a class="btn btn-info btn-xs" onclick="playAudio(' + "'" + idnota + "'" + ')"><i id="iconBtn' + idnota + '" type="iconBtn" class="fa fa-eye"></i></a></span></button>');

        $("#f07btnSendBS").removeAttr("disabled");
    }
    //Delete new audio
$(document).on("click", "a[type='newImage']", function () {
    var idimage = $(this).parent().attr("id").replace("btn", "");

    $("#f07dialogImage").kendoWindow({
        title: "Confirmación",
        scrollable: false,
        modal: true,
        visible: false,
        activate: function () {
            $("#f07dialogImage").data("kendoWindow").center();
        }
    });
    $("#f07dialogImage").data("kendoWindow").center();

    $("#f07dialogImage").data("kendoWindow").open();
    $("#f07divMensajeConf").text("¿Desea eliminar la imagen " + idimage + " de la operación?");

    $("#f07accionImage").attr('onclick', 'f07deleteImage( idimage )');
});

function f07deleteImage(idImage) {
    if ($.isNumeric(idImage)) {
        $("#f07dialogImage").kendoWindow({
            title: "Confirmación",
            scrollable: false,
            modal: true,
            visible: false,
            activate: function () {
                $("#f07dialogImage").data("kendoWindow").center();
            }
        });
        $("#f07dialogImage").data("kendoWindow").center();
        $("#f07dialogImage").data("kendoWindow").open();
        $("#f07divMensajeConf").text("¿Desea eliminar la imagen " + idImage + " de la operación?");
        $("#f07accionImage").attr('onclick', 'f07accionImage("ndelete","",' + idImage + ',"")');
    } else {
        $('#f07dialogImage').data('kendoWindow').close();
        $("#btn" + idImage).remove();
        if ($('a[type="newImage"]').length == 0) {
            $("#f07btnSendBS").attr("disabled", "disabled");
        }
    }
}

function f07accionImage(accion, FileUri, idAudio, idAudioBackend) {
    var txtidUsuario = sessionStorage.getItem("sessionUSER");
    //Notificaciones
    var notificationElement = $("#notification");
    notificationElement.kendoNotification();
    var notificationWidget = notificationElement.data("kendoNotification");
    //End
    accion == "insert" && $.ajax({
        type: "POST",
        url: WServ + 'Operaciones/InsertarFotos',
        data: {
            archivo: FileUri,
            usuario: txtidUsuario,
            operacion: f07NumOperacion
        },
        async: false,
        success: function (datos) {
            alert("InsertarFotos archivo: " + FileUri);
            alert("InsertarFotos usuario: " + txtidUsuario);
            alert("InsertarFotos operacion: " + f07NumOperacion);
            alert("InsertarFotos datos: " + datos);
            var data = [];
            data = JSON.parse(datos);
            var idArchivo = data[0].ID;
            if (data[0].Ejecucion == 1) { // Si Operaciones/InsertarFotos no se ejecutó correctamente
                notificationWidget.show("No se insertó correctamente en la tabla fotos", "error");
                kendo.ui.progress($("#f07listaImage"), false);
            } else {
                $.ajax({
                    type: "POST",
                    url: WServ + 'Operaciones/InsertarTareaFotos',
                    data: {
                        archivo: "Foto" + idArchivo + ".jpg", // Se cambió solo el nombre del archivo
                        usuario: txtidUsuario,
                        operacion: f07NumOperacion //$('#f07txtid').val()
                    },
                    async: false,
                    success: function (datos) {
                        alert("InsertarTareaFotos archivo: " + "Foto" + idArchivo + ".jpg");
                        alert("InsertarTareaFotos usuario: " + txtidUsuario);
                        alert("InsertarTareaFotos operacion: " + f07NumOperacion);
                        alert("InsertarTareaFotos datos: " + datos);

                        //ajax para descargar, guardar en servidor y para actualizar el url en server ausa
                        $.ajax({
                            type: "POST",
                            url: WServ + "Upload/UploadUrl",
                            data: {
                                id: idArchivo,
                                url: FileUri,
                                tipo: 2,
                                subPath: f07Orden //Se cambió a numero de orden
                            },
                            async: false,
                            success: function (datos) {

                                alert("UploadUrl id: " + idArchivo);
                                alert("UploadUrl url: " + FileUri);
                                alert("UploadUrl tipo: " + 2);
                                alert("UploadUrl subPath: " + f07Orden);
                                alert("UploadUrl datos: " + datos);
                                kendo.ui.progress($("#f07listaImage"), false);
                                if (parseInt(datos) == 0) {
                                    $('#f07viewImage').data('kendoListView').dataSource.read();
                                    $('#f07viewImage').data('kendoListView').refresh();
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
                                            notificationWidget.show("No se eliminó del Backend Service: "+ JSON.stringify(error), "error");
                                        });

                                } else {
                                    notificationWidget.show("No se realizó correctamente el upload", "error");
                                    kendo.ui.progress($("#f07listaImage"), false);
                                };
                            },
                            error: function () {
                                kendo.ui.progress($("#f07listaImage"), false);
                                notificationWidget.show("El servicio no está disponible", "error");
                                valido = false;
                            }
                        });
                    },
                    error: function () {
                        notificationWidget.show("No se puede establecer la conexión al servicio", "error");
                        valido = false;
                    }
                });
                $('#f07viewImage').data('kendoListView').dataSource.read();
                $('#f07viewImage').data('kendoListView').refresh();

            }
        },
        error: function () {
            notificationWidget.show("No se puede establecer la conexión al servicio", "error");
        }
    });

    accion == "ndelete" && $.ajax({
        type: "POST",
        url: WServ + 'Operaciones/EliminarTareaFotos',
        data: {
            archivo: $("#archivo" + idAudio).val(),
            operacion: f07NumOperacion //$('#f07txtid').val()
        },
        async: false,
        success: function (datos) {

            if (datos == 0) {
                notificationWidget.show("Se eliminó la imagen " + idAudio + " de la operación", "success");
                $('#f07viewImage').data('kendoListView').dataSource.read();
                $('#f07viewImage').data('kendoListView').refresh();

            } else {
                notificationWidget.show("No se eliminó la imagen correctamente", "error");
            }
            $('#f07dialogImage').data('kendoWindow').close();
        },
        error: function () {
            notificationWidget.show("No se puede establecer la conexión al servicio", "error");
            valido = false;
        }
    });
}