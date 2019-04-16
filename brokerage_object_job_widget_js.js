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
Statics = {
    bgcolor: "#c9cadc",
    icon: "fas fa-briefcase fa-3x",
    handle: "Type: "
}

function JobTile() {
    url = "defaultcontenturl", // auto? // parametrized?
        token = "defaulttoken",
        name = "defaultname",
        type = "defaultdescription",
        createdat = "defaultcreatedate",
        updatedat = "defaultupdatedate",
        datetype = "defaultdatetype";
};
JobTile.prototype.render = function () {
    var jobtileinstance = this;

    function setAuthHeader(request) {
        if (typeof this.token !== 'undefined') {
            request.setRequestHeader("Authorization", "token " + this.token);
        }
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
                .attr("id", this.url + '/' + this.updatedat) // this id is used for single instance data grab !!!
                .attr("data-toggle", "modal")
                .attr("data-target", "#expandedTile")
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
                        .text(Statics.handle + this.datetype)
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
    if (document.getElementById('expandedTile') === null) {
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
                            .attr("data-target", "#createform")
                            .attr("id", "eventedit")
                            .text("Edit")
                        )
                    )
                )))
    }
    // create inner content
    $('.container-fluid').on('click', '.boxes-align', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation(); // multiple event listeners are added !! can it stay as workaround ?
        $.ajax({
                url: $(this).attr('id'),
                beforeSend: setAuthHeader.bind(jobtileinstance),
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
                    $('#expandedTile').modal('show');
                }
            })
            .fail(function () {
                alert('That entry is no longer avaliable'); // in case entry is not reachable
            });
    });
    /// create from modal
    if (document.getElementById('createform') === null) {
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
                )))
    }
};
JobTile.prototype.setContent = function (content) {
    this.url = (content.url || '');
    this.name = (content.name || '');
    this.type = (content.type || '');
    this.createdat = (content.createdat || '');
    this.updatedat = (content.updatedat || '');
    this.datetype = (content.datetype || '');
    this.token = (content.token || '');
};
Olive.widgets.add(JobTile);