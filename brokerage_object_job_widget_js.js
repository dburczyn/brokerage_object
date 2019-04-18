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
var JobStatics = {
    bgcolor: "#c9cadc",
    icon: "fas fa-briefcase fa-3x",
};
function setAuthHeader(request) {
    if (typeof this.token !== 'undefined' && this.token !== '' && this.token !== 'defaulttoken') {
        request.setRequestHeader("Authorization", "token " + this.token);
    }
}
function addCreateFormSubmitHandler(jobtileinstance) {
    $('#createform').on('submit', function (e) {
        e.preventDefault();
        // get job type from radio button
        var jobtype;
        var jobtypesradio = document.getElementsByName('jobtype');
        for (var i = 0, l = jobtypesradio.length; i < l; i++) {
            if (jobtypesradio[i].checked) {
                jobtype = jobtypesradio[i].value;
                break;
            }
        }
        // produce content of widget instance
        var content = {};
        content.description = $('#filecontent').val();
        content.picture = $('#eventpicture').val();
        content.email = $('#emailaddress').val();
        content.createdat = $('#createdat').val();
        content.updatedat = $('#updatedat').val();
        content.datetype = jobtype;
        content.type = jobtileinstance.constructor.name;
        content.name = $('#filename').val();
        // create file storing content with api call
        $.ajax({
            url: jobtileinstance.indexurl + '/' + content.updatedat, // update date acts as unique id (file name in repo)
            beforeSend: setAuthHeader.bind(jobtileinstance),
            type: 'PUT',
            data: '{"message": "create file","content":"' + btoa(JSON.stringify(content)) + '" }',
            success: function (data) {
                $('#createform').modal('hide');
                if (content.updatedat !== content.createdat) {
                    $.ajax({
                        url: this.url.replace(this.url.split("/")[this.url.split("/").length - 1], currentresponse.name),
                        beforeSend: setAuthHeader.bind(jobtileinstance),
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
function makeCreateForm() {
    $("#createform").remove();
    $('body').append(
        $('<div/>')
        .addClass("modal fade")
        .attr("id", "createform")
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
                        .attr("id", "job_create_form")
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
                            .text("Job type:")
                        )
                        .append(
                            $('<p/>')
                            .append(
                                $('<input/>')
                                .attr("value", "Employment")
                                .attr("name", "jobtype")
                                .attr("type", "radio")
                                .attr("checked", "true")
                            )
                            .append(
                                $('<p/>')
                                .text("Employment")
                            )
                            .append(
                                $('<input/>')
                                .attr("value", "Training")
                                .attr("name", "jobtype")
                                .attr("type", "radio")
                            )
                            .append(
                                $('<p/>')
                                .text("Training")
                            )
                            .append(
                                $('<input/>')
                                .attr("value", "Internship")
                                .attr("name", "jobtype")
                                .attr("type", "radio")
                            )
                            .append(
                                $('<p/>')
                                .text("Internship")
                            )
                            .append(
                                $('<input/>')
                                .attr("value", "Master")
                                .attr("name", "jobtype")
                                .attr("type", "radio")
                            )
                            .append(
                                $('<p/>')
                                .text("Master")
                            )
                            .append(
                                $('<input/>')
                                .attr("value", "PhD")
                                .attr("name", "jobtype")
                                .attr("type", "radio")
                            )
                            .append(
                                $('<p/>')
                                .text("PhD")
                            )
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
            )));
}
function JobTile() {
    url = "defaultcontenturl", // auto? // parametrized?
        token = "defaulttoken",
        name = "defaultname",
        type = "defaultdescription",
        createdat = "defaultcreatedate",
        updatedat = "defaultupdatedate",
        datetype = "defaultdatetype";
}
JobTile.prototype.setContent = function (content) {
    this.indexurl = (content.indexurl || '');
    this.indexfilename = (content.indexfilename || '');
    this.name = (content.name || '');
    this.type = (content.type || '');
    this.createdat = (content.createdat || '');
    this.updatedat = (content.updatedat || '');
    this.datetype = (content.datetype || '');
    this.token = (content.token || '');
};
JobTile.prototype.render = function () {
    var jobtileinstance = this;
    var parsedcreatedat = new Date(parseInt(this.createdat)).toLocaleDateString(locale, options);
    var parsedupdatedat = new Date(parseInt(this.updatedat)).toLocaleDateString(locale, options);
    // create front tile
    $('#' + jobtileinstance.indexfilename + this.constructor.name + 'container').append(
        $('<div/>')
        .addClass("col-md-3 cms-boxes-outer")
        .append(
            $("<div/>")
            .addClass("cms-boxes-items cms-features")
            .css({
                "background-color": JobStatics.bgcolor
            })
            .append(
                $("<div/>")
                .addClass("boxes-align")
                .attr("id", this.updatedat) // this id is used for single instance data grab !!!
                .attr("data-toggle", "modal")
                .attr("data-target", "#expandedTile")
                .append(
                    $("<div/>")
                    .addClass("small-box")
                    .append(
                        $("<i/>")
                        .addClass(JobStatics.icon)
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
    // populate details modal and show it to user
    $('#' + this.updatedat)
        .unbind('click')
        .on('click', function (e) {
            e.stopPropagation();
            $.ajax({
                    url: jobtileinstance.indexurl + "/" + $(this).attr('id'),
                    beforeSend: setAuthHeader.bind(jobtileinstance),
                    dataType: 'json',
                    success: function (response) {
                        currentresponse = response;
                        content = atob(response.content);
                        unencodedcontent = JSON.parse(content);
                        // create inner modal
                        $("#expandedTile").remove();
                        $('body').append(
                            $('<div/>')
                            .addClass("modal fade")
                            .attr("id", "expandedTile")
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
                                            .attr("src", unencodedcontent.picture)
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
                                            .text(unencodedcontent.name)
                                        )
                                        .append(
                                            $("<h2/>")
                                            .attr("id", "datetype")
                                            .css({
                                                "text-align": "center"
                                            })
                                            .text(unencodedcontent.datetype)
                                        )
                                        .append(
                                            $("<p/>")
                                            .attr("id", "description")
                                            .text(unencodedcontent.description)
                                        )
                                        .append(
                                            $("<p/>")
                                            .append(
                                                $("<a/>")
                                                .attr("id", "mailbutton")
                                                .attr("href", 'mailto:' + unencodedcontent.email)
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
                                                .text(new Date(parseInt(unencodedcontent.updatedat)).toLocaleDateString(locale, options))
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
                                                .text(new Date(parseInt(unencodedcontent.createdat)).toLocaleDateString(locale, options))
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
                                            .attr("data-target", "#createform")
                                            .attr("id", "eventedit")
                                            .text("Edit")
                                        )
                                    )
                                )));
                        $('#expandedTile').modal('show');
                        // add delete button handler
                        $('#eventdelete').on('click', function (e) {
                            var action = confirm('Are you sure you wish to delete this item ? It cannot be undone!');
                            if (action === false) {
                                return false;
                            }
                            $.ajax({
                                // id/file name is known and set in currentrespopnse.name, when widget content is shown
                                url: jobtileinstance.indexurl + '/' + currentresponse.name,
                                beforeSend: setAuthHeader.bind(jobtileinstance),
                                type: 'DELETE',
                                //sha is known when widget content is shown (after specific widget api call)
                                data: '{"message": "delete file","sha":"' + currentresponse.sha + '" }',
                                success: function (data) {
                                    // hide widget details modal after deletion (since source is no longer in repo)
                                    $('#expandedTile').modal('hide');
                                }
                            });
                        });
                        // handle edit form preparation
                        $('#eventedit').on('click', function (e) {
                            // populate form with static fields
                            e.stopPropagation();
                            makeCreateForm();
                            addCreateFormSubmitHandler(jobtileinstance);
                            updatedat = new Date().getTime();
                            document.getElementById("updatedat").value = updatedat;
                            document.getElementById("createdat").value = unencodedcontent.createdat;
                            document.getElementById("filename").value = unencodedcontent.name;
                            document.getElementById("filecontent").value = unencodedcontent.description;
                            document.getElementById("emailaddress").value = unencodedcontent.email;
                            document.getElementById("eventpicture").value = unencodedcontent.picture;
                            var typeseditedradionew = document.getElementsByName('jobtype');
                            for (var j = 0, l = typeseditedradionew.length; j < l; j++) {
                                if (unencodedcontent.datetype === typeseditedradionew[j].value) {
                                    typeseditedradionew[j].checked = true;
                                    break;
                                }
                            }
                            $('#createform').modal('show');
                        });
                    }
                })
                .fail(function () {
                    alert('That entry is no longer avaliable'); // in case entry is not reachable
                });
        });
    // handle clicking on 'new' button
    $('#' + jobtileinstance.indexfilename + this.constructor.name)
        .unbind('click')
        .on('click', function (e) {
            e.stopPropagation();
            makeCreateForm();
            // add create form handler
            addCreateFormSubmitHandler(jobtileinstance);
            $("#createdat").val(new Date().getTime());
            $("#updatedat").val($("#createdat").val());
            $('#createform').modal('show');
        });
};
Olive.widgets.add(JobTile);