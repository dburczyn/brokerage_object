var locale = "en-GB";
var localeOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};
var jobStatics = {
    bgcolor: "#c9cadc",
    icon: "fas fa-briefcase fa-3x",
};

function setWidgetAuthHeader(request) {
    if (typeof jobtileinstance.token !== 'undefined' && jobtileinstance.token !== '' && jobtileinstance.token !== 'defaulttoken') {
        request.setRequestHeader("Authorization", "token " + jobtileinstance.token);
    }
}

function getJobtypeFromRadio() {

    var jobtype;
    var jobtypesradio = document.getElementsByName('jobtype');
    for (var i = 0; i < jobtypesradio.length; i++) {
        if (jobtypesradio[i].checked) {
            jobtype = jobtypesradio[i].value;
            break;
        }
    }
    return jobtype;
}

function produceWidgetInstanceContent() {
    widgetInstanceContent = {};
    widgetInstanceContent.description = $('#filecontent').val();
    widgetInstanceContent.picture = $('#eventpicture').val();
    widgetInstanceContent.email = $('#emailaddress').val();
    widgetInstanceContent.createdat = $('#createdat').val();
    widgetInstanceContent.updatedat = $('#updatedat').val();
    widgetInstanceContent.datetype = getJobtypeFromRadio();
    widgetInstanceContent.type = jobtileinstance.constructor.name;
    widgetInstanceContent.name = $('#filename').val();
    return widgetInstanceContent;
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
                .append( //body
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

function prepareDeleteWidgetContentUrl() {
    return jobtileinstance.indexurl + "/" + currentresponse.name;
}

function deleteWidgetContentFile() {
    $.ajax({
            url: prepareDeleteWidgetContentUrl(),
            beforeSend: setWidgetAuthHeader.bind(this),
            type: 'DELETE',
            data: '{"message": "delete file","sha":"' + currentresponse.sha + '" }',
        })
        .done(function () {
            $('#expandedTile').modal('hide');
        });
}

function prepareCreateWidgetContentUrl() {
    return jobtileinstance.indexurl + '/' + widgetInstanceContent.updatedat;
}

function createWidgetContentFile() {
    produceWidgetInstanceContent();
    $.ajax({
            url: prepareCreateWidgetContentUrl(),
            beforeSend: setWidgetAuthHeader.bind(this),
            type: 'PUT',
            data: '{"message": "create file","content":"' + btoa(JSON.stringify(widgetInstanceContent)) + '" }',
        })
        .done(function () {
            $('#createform').modal('hide');
            if (widgetInstanceContent.updatedat !== widgetInstanceContent.createdat) {
                deleteWidgetContentFile();
            }
        });
}

function addCreateFormSubmitHandler() {
    $('#createform').on('submit', function (e) {
        e.preventDefault();
        createWidgetContentFile();
    });
}

function createFrontWidgetTile() {
    var parsedcreatedat = new Date(parseInt(jobtileinstance.createdat)).toLocaleDateString(locale, localeOptions);
    var parsedupdatedat = new Date(parseInt(jobtileinstance.updatedat)).toLocaleDateString(locale, localeOptions);
    $('#' + jobtileinstance.indexfilename + jobtileinstance.constructor.name + 'container').append(
        $('<div/>')
        .addClass("col-md-3 cms-boxes-outer")
        .append(
            $("<div/>")
            .addClass("cms-boxes-items cms-features")
            .css({
                "background-color": jobStatics.bgcolor
            })
            .append(
                $("<div/>")
                .addClass("boxes-align")
                .attr("id", jobtileinstance.updatedat) // this id is used for single instance data grab !!!
                .attr("data-toggle", "modal")
                .attr("data-target", "#expandedTile")
                .append(
                    $("<div/>")
                    .addClass("small-box")
                    .append(
                        $("<i/>")
                        .addClass(jobStatics.icon)
                    )
                    .append(
                        $("<h3/>")
                        .text(jobtileinstance.name)
                    )
                    .append(
                        $("<h4/>")
                        .text("Type: " + jobtileinstance.datetype)
                    )
                    .append(
                        $("<h5/>")
                        .text("Last update: " + parsedupdatedat)
                    )
                    .append(
                        $("<h5/>")
                        .text("Created: " + parsedcreatedat)
                    )))));
}

function createInnerWidgetModal() {
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
                            .text(new Date(parseInt(unencodedcontent.updatedat)).toLocaleDateString(locale, localeOptions))
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
                            .text(new Date(parseInt(unencodedcontent.createdat)).toLocaleDateString(locale, localeOptions))
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
}

function addNewButtonHandler() {
    $('#' + jobtileinstance.indexfilename + jobtileinstance.constructor.name)
        .unbind('click')
        .on('click', function (e) {
            e.stopPropagation();
            makeCreateForm();
            addCreateFormSubmitHandler();
            $("#createdat").val(new Date().getTime());
            $("#updatedat").val($("#createdat").val());
            $('#createform').modal('show');
        });
}

function populateEditForm() {
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
}

function addEditButtonHandler() {
    $('#eventedit').on('click', function (e) {
        e.stopPropagation();
        makeCreateForm();
        addCreateFormSubmitHandler();
        populateEditForm();
        $('#createform').modal('show');
    });
}

function addDeleteButtonHandler() {
    $('#eventdelete').on('click', function (e) {
        var action = confirm('Are you sure you wish to delete this item ? It cannot be undone!');
        if (action === false) {
            return false;
        }
        deleteWidgetContentFile();
    });
}

function showInnerWidgetModal(id) {
    $.ajax({
            url: jobtileinstance.indexurl + "/" + id,
            beforeSend: setWidgetAuthHeader.bind(this),
            dataType: 'json'
        })
        .done(function (response) {
            currentresponse = response;
            unencodedcontent = JSON.parse(atob(response.content));
            createInnerWidgetModal();
            $('#expandedTile').modal('show');
            addDeleteButtonHandler();
            addEditButtonHandler();
        })
        .fail(function () {
            alert('That entry is no longer avaliable');
        });
}

function addShowInnerWidgetModalHandler() {
    $('#' + jobtileinstance.updatedat)
        .unbind('click')
        .on('click', function (e) {
            e.stopPropagation();
            showInnerWidgetModal($(this).attr('id'));
        });
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
    jobtileinstance = this;
    createFrontWidgetTile();
    addShowInnerWidgetModalHandler();
    addNewButtonHandler();
};
Olive.widgets.add(JobTile);