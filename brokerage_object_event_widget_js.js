var locale = "en-GB";
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};
var Statics = {
    bgcolor: "#c4d1cf",
    icon: "far fa-calendar-alt fa-3x",
}

function EventTile() {
    url = "defaultcontenturl", // auto? // parametrized?
        token = "defaulttoken",
        name = "defaultname",
        type = "defaultdescription",
        createdat = "defaultcreatedate",
        updatedat = "defaultupdatedate",
        datetype = "defaultdatetype";
};






EventTile.prototype.render = function () {
         var eventtileinstance = this;

    function setAuthHeader(request) {
       // console.log(this);
        if (typeof this.token !== 'undefined' && this.token !== ''&& this.token !== 'defaulttoken') {
            request.setRequestHeader("Authorization", "token " + this.token);
        }
    };

    function generateUrl() {
          return eventtileinstance.indexurl+"/"+ $('#updatedat').val();
    };


    var parsedcreatedat = new Date(parseInt(this.createdat)).toLocaleDateString(locale, options);
    var parsedupdatedat = new Date(parseInt(this.updatedat)).toLocaleDateString(locale, options);
    // add tile to grid
    // add modal to html
    // fill above with proper variables/values
    // create front tile
    $('#widgetcontainer').append(
        $('<div/>')
        .addClass("col-md-3 cms-boxes-outer")
        .append(
            $("<div/>")
            .addClass("cms-boxes-items cms-features")
            .css({
                "background-color": Statics.bgcolor
            })
            .append(
                $("<div/>")
                .addClass("boxes-align")
                .attr("id", this.indexurl +"/"+this.updatedat ) // this id is used for single instance data grab !!!
                .attr("data-toggle", "modal")
                .attr("data-target", "#EventexpandedTile")
                .append(
                    $("<div/>")
                    .addClass("small-box")
                    .append(
                        $("<i/>")
                        .addClass(Statics.icon)
                    )
                    .append(
                        $("<h3/>")
                        .text(this.name)
                    )
                    .append(
                        $("<h4/>")
                        .text("Type: " + this.datetype)
                    )
                    .append(
                        $("<h5/>")
                        .text("Last update: " + parsedupdatedat)
                    )
                    .append(
                        $("<h5/>")
                        .text("Created: " + parsedcreatedat)
                    )))));
    // create inner modal
    if (document.getElementById('EventexpandedTile') === null) {
        $('body').append(
            $('<div/>')
            .addClass("modal fade")
            .attr("id", "EventexpandedTile")
            .attr("role", "dialog")
            .append(
                $('<div/>')
                .addClass("modal-dialog")
                .append(
                    $('<div/>')
                    .addClass("modal-content")
                    .append( /// header
                        $('<div/>')
                        .addClass("modal-header")
                        .append(
                            $('<button/>')
                            .addClass("close")
                            .attr("type", "button")
                            .attr("data-dismiss", "modal")
                            .text("x")
                        )
                        .append(
                            $('<img>')
                            .attr("id", "currentPhoto")
                            .attr("src", "#")
                        )
                    )
                    .append(
                        $('<div/>')
                        .addClass("modal-body")
                        .append(
                            $("<h1/>")
                            .addClass("modal-title")
                            .attr("id", "modal-title")
                            .css({
                                "text-align": "center"
                            })
                        )
                        .append(
                            $("<h2/>")
                            .attr("id", "datetype")
                            .css({
                                "text-align": "center"
                            })
                        )
                        .append(
                            $("<p/>")
                            .attr("id", "description")
                        )
                        .append(
                            $("<p/>")
                            .append(
                                $("<a/>")
                                .attr("id", "mailbutton")
                                .attr("href", "#")
                                .addClass("btn btn-primary")
                                .css({
                                    "display": "block",
                                    "margin-left": "auto",
                                    "margin-right": "auto"
                                })
                                .text("Apply")
                            )
                        )
                        .append(
                            $("<p/>")
                            .append(
                                $("<strong/>")
                                .text("Updated: ")
                            )
                            .append(
                                $("<time/>")
                                .attr("id", "dateofupdate")
                            )
                        )
                        .append(
                            $("<p/>")
                            .append(
                                $("<strong/>")
                                .text("Created: ")
                            )
                            .append(
                                $("<time/>")
                                .attr("id", "dateofcreate")
                            )
                        )
                    )
                    .append( /// footer
                        $('<div/>')
                        .addClass("modal-footer")
                        .append(
                            $('<button/>')
                            .addClass("btn btn-default")
                            .attr("type", "button")
                            .attr("data-dismiss", "modal")
                            .text("Close")
                        )
                        .append(
                            $('<button/>')
                            .addClass("btn btn-default")
                            .attr("type", "button")
                            .attr("id", "eventdelete")
                            .text("Delete")
                        )
                        .append(
                            $('<button/>')
                            .addClass("btn btn-info")
                            .attr("type", "button")
                            .attr("data-toggle", "modal")
                            .attr("data-target", "#eventcreateform")
                            .attr("id", "eeventedit")
                            .text("Edit")
                        )
                    )
                )))
                /// add delete handler
                $('#eventdelete').on('click', function (e) {
                    e.preventDefault();
                    var action = confirm('Are you sure you wish to delete this item ? It cannot be undone!');
                    if (action === false) {
                      return false;
                    }

                    $.ajax({
                      // id/file name is known and set in currentrespopnse.name, when widget content is shown
                      url: generateUrl()+ currentresponse.name,
                      beforeSend: setAuthHeader.bind(eventtileinstance),
                      type: 'DELETE',
                      //sha is known when widget content is shown (after specific widget api call)
                      data: '{"message": "delete file","sha":"' + currentresponse.sha + '" }',
                      success: function (data) {
                        // hide widget details modal after deletion (since source is no longer in repo)
                        $('#EventexpandedTile').modal('hide');
                      }
                    });
                  });
    }
    // create inner content
    $('.container-fluid').on('click', '.boxes-align', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation(); // multiple event listeners are added !! can it stay as workaround ?
        $.ajax({
                url: $(this).attr('id'),
                beforeSend: setAuthHeader.bind(eventtileinstance),
                dataType: 'json',
                success: function (response) {
                    // populate details modal and show it to user
                    currentresponse = response;
                    content = atob(response.content);
                    unencodedcontent = JSON.parse(content);
                    document.getElementById('modal-title').innerHTML = unencodedcontent.name;
                    document.getElementById('datetype').innerHTML = unencodedcontent.datetype;
                    document.getElementById('dateofcreate').innerHTML = new Date(parseInt(unencodedcontent.createdat)).toLocaleDateString(locale, options);
                    document.getElementById('dateofupdate').innerHTML = new Date(parseInt(unencodedcontent.updatedat)).toLocaleDateString(locale, options);
                    document.getElementById('currentPhoto').src = unencodedcontent.picture;
                    document.getElementById('mailbutton').href = 'mailto:' + unencodedcontent.email;
                    document.getElementById('description').innerHTML = unencodedcontent.description;
                    $('#EventexpandedTile').modal('show');  // doesnt show because of multiple event listeners !!!!!
                }
            })
            .fail(function () {
                alert('That entry is no longer avaliable'); // in case entry is not reachable
            });
    });
    /// create form modal
    if (document.getElementById('eventcreateform') === null) {
        $('body').append(
            $('<div/>')
            .addClass("modal fade")
            .attr("id", "eventcreateform")
            .attr("role", "dialog")
            .append(
                $('<div/>')
                .addClass("modal-dialog")
                .append(
                    $('<div/>')
                    .addClass("modal-content")
                    .append( /// header
                        $('<div/>')
                        .addClass("modal-header")
                        .append(
                            $('<button/>')
                            .addClass("close")
                            .attr("type", "button")
                            .attr("data-dismiss", "modal")
                            .text("x")
                        )
                        .append(
                            $("<h4/>")
                            .text("Create form")
                        )
                    )
                    .append(
                        $('<div/>')
                        .addClass("modal-body")
                        .append(
                            $('<form/>')
                            .addClass("form-style-5")
                            .attr("id", "event_create_form")

                            .append(
                                $('<input>')
                                .attr("id", "createdat")
                                .attr("name", "createdat")
                                .attr("type", "text")
                                .attr("hidden", "true")

                            )
                            .append(
                                $('<input>')
                                .attr("id", "updatedat")
                                .attr("name", "updatedat")
                                .attr("type", "text")
                                .attr("hidden", "true")

                            )
                            .append(
                                $('<p/>')
                                .text("Name:")


                            )
                            .append(
                                $('<input>')
                                .attr("id", "filename")
                                .attr("name", "filename")
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Description:")


                            )
                            .append(
                                $('<input>')
                                .attr("id", "filecontent")
                                .attr("name", "filecontent")
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Picture:")


                            )
                            .append(
                                $('<input>')
                                .attr("id", "eventpicture")
                                .attr("name", "eventpicture")
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Contact:")


                            )
                            .append(
                                $('<input>')
                                .attr("id", "emailaddress")
                                .attr("name", "emailaddress")
                                .attr("type", "email")
                            )
                            .append(
                                $('<p/>')
                                .text("Event date:")


                            )
                            .append(
                                $('<input>')
                                .attr("id", "eventdate")
                                .attr("name", "eventdate")
                                .attr("type", "date")
                            )




                            .append(
                                $('<input>')
                                .attr("value", "Submit")
                                .attr("type", "submit")
                            )
                        )
                    )
                    .append( /// footer
                        $('<div/>')
                        .addClass("modal-footer")
                        .append(
                            $('<button/>')
                            .addClass("btn btn-default")
                            .attr("type", "button")
                            .attr("data-dismiss", "modal")
                            .text("Close")
                        )
                    )
                )))
                $('#eventcreateform').on('submit', function (e) {
                    e.preventDefault();
                    // get event type from radio button
                    var typesradio = document.getElementsByName('type');
                            for (var i = 0, length = typesradio.length; i < length; i++) {
                      if (typesradio[i].checked) {
                        type = typesradio[i].value;
                        break;
                      }
                    }


                    // produce content of widget instance
                    var content = {};
                    content.description = $('#filecontent').val();
                    content.picture = $('#eventpicture').val();
                    content.email = $('#emailaddress').val();
                    content.updatedat = $('#updatedat').val();
                    content.createdat = $('#createdat').val();
                    content.datetype = $('#eventdate').val();;
                    content.type = "EventTile";               // can take this from somewhere
                    content.name = $('#filename').val();
                    // create file storing content with api call
                    $.ajax({
                      url: generateUrl(), // update date acts as unique id (file name in repo)
                      beforeSend: setAuthHeader.bind(eventtileinstance),
                      type: 'PUT',
                      data: '{"message": "create file","content":"' + btoa(JSON.stringify(content)) + '" }',
                      success: function (data) {
                        $('#eventcreateform').modal('hide');
                        if (content.updatedat !== content.createdat) {

                          $.ajax({
                            url: this.url.replace(this.url.split("/")[this.url.split("/").length-1], currentresponse.name),
                            beforeSend: setAuthHeader.bind(eventtileinstance),
                            type: 'DELETE',
                            data: '{"message": "delete file","sha":"' + currentresponse.sha + '" }',
                            success: function (data) {
                              alert("old file deleted");
                            }
                          });
                        }
                      }
                    });
                  });

    }

// handle create form submit


// clear create form on 'new' button click

  $('#createbutton').on('click', function (e) {
    var createdat = new Date().getTime();
    e.preventDefault();
    document.getElementById("createdat").value = createdat;
    document.getElementById("updatedat").value = createdat;
    document.getElementById("filename").value = "";
    document.getElementById("filecontent").value = "";
    document.getElementById("emailaddress").value = "";
    document.getElementById("eventpicture").value = "";
    var typesradionew = document.getElementsByName('type');
    for (var i = 0, length = typesradionew.length; i < length; i++) {
      if (typesradionew[i].checked) {
        typesradionew[i].checked = false;
      }
    }
  });

    // handle edit form preparation
    $('#eeventedit').on('click', function (e) {
        // populate form with static fields
        updatedat = new Date().getTime();
        e.preventDefault();
        document.getElementById("updatedat").value = updatedat;
        document.getElementById("createdat").value = unencodedcontent.createdat;
        document.getElementById("filename").value = unencodedcontent.name;
        document.getElementById("filecontent").value = unencodedcontent.description;
        document.getElementById("emailaddress").value = unencodedcontent.email;
        document.getElementById("eventpicture").value = unencodedcontent.picture;
      });
};

EventTile.prototype.setContent = function (content) {
    this.indexurl = (content.indexurl || '');
    this.indexfilename = (content.indexfilename || '');
    this.name = (content.name || '');
    this.type = (content.type || '');
    this.createdat = (content.createdat || '');
    this.updatedat = (content.updatedat || '');
    this.datetype = (content.datetype || '');
    this.token = (content.token || '');
};
Olive.widgets.add(EventTile);