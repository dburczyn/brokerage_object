(function (Grid,Olive) {
    var jobStatics = {
        bgcolor: "#c9cadc",
        icon: "fas fa-briefcase fa-3x",
        localeOptions: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        },
        locale: "en-GB"
    };
    var currentresponse;
    var unencodedcontent;
    var jobtileinstance;
    var widgetRepresentation;
    var filecontentfield = document.createElement('input');
    var eventpicturefield = document.createElement('input');
    var emailaddressfield = document.createElement('input');
    var createdatfield = document.createElement('input');
    var updatedatfield = document.createElement('input');
    var filenamefield = document.createElement('input');
    var createform = document.createElement('div');
    var expandedWidgetView = document.createElement('div');




    var job = {
        url: "defaultcontenturl",
        token: "defaulttoken",
        name: "defaultname",
        type: "JobTile",
        createdat: "defaultcreatedate",
        updatedat: "defaultupdatedate",
        datetype: "defaultdatetype",
        setContent: function (content) {
            this.indexurl = (content.indexurl || '');
            this.indexfilename = (content.indexfilename || '');
            this.name = (content.name || '');
            this.type = (content.type || '');
            this.createdat = (content.createdat || '');
            this.updatedat = (content.updatedat || '');
            this.datetype = (content.datetype || '');
            this.token = (content.token || '');
        },
        render: function () {
            widgetRepresentation = document.createElement('div');
            jobtileinstance = this;
            createFrontWidgetTile();
         //   console.log(jobtileinstance);

            addNewButtonHandler();
           // createInnerWidgetModal();
          //  console.log(widgetRepresentation);
            return widgetRepresentation;
        }
    };

    function setWidgetAuthHeader(request) {

            request.setRequestHeader("Authorization", "token " + Olive.getConfig().token);

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
        widgetInstanceContent.description = $(filecontentfield).val();
        widgetInstanceContent.picture = $(eventpicturefield).val();
        widgetInstanceContent.email = $(emailaddressfield).val();
        widgetInstanceContent.createdat = $(createdatfield).val();
        widgetInstanceContent.updatedat = $(updatedatfield).val();
        widgetInstanceContent.datetype = getJobtypeFromRadio();
        widgetInstanceContent.type = jobtileinstance.type;
        widgetInstanceContent.name = $(filenamefield).val();
        return widgetInstanceContent;
    }

    function makeCreateForm() {

           $(widgetRepresentation) .append(
            $(createform)
            .addClass("modal fade")
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
                            .append(
                                $(createdatfield)
                                .attr("type", "text")
                                .attr("hidden", "true")
                            )
                            .append(
                                $(updatedatfield)
                                .attr("type", "text")
                                .attr("hidden", "true")
                            )
                            .append(
                                $('<p/>')
                                .text("Name:")
                            )
                            .append(
                                $(filenamefield)
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Description:")
                            )
                            .append(
                                $(filecontentfield)
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Picture:")
                            )
                            .append(
                                $(eventpicturefield)
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Contact:")
                            )
                            .append(
                                $(emailaddressfield)
                                .attr("type", "text")
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

    function prepareDeleteWidgetContentUrl() {
        return Olive.getConfig().indexurl + "/" + currentresponse.name;
    }

    function deleteWidgetContentFile() {
        $.ajax({
                url: prepareDeleteWidgetContentUrl(),
                beforeSend: setWidgetAuthHeader.bind(this),
                type: 'DELETE',
                data: '{"message": "delete file","sha":"' + currentresponse.sha + '" }',
            })
            .done(function () {
                $(expandedWidgetView).modal('hide');
            });
    }

    function prepareCreateWidgetContentUrl() {
        return Olive.getConfig().indexurl + '/' + widgetInstanceContent.updatedat;
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
                $(createform).modal('hide');
                if (widgetInstanceContent.updatedat !== widgetInstanceContent.createdat) {
                    deleteWidgetContentFile();
                }
            });
    }

    function addCreateFormSubmitHandler() {
        $(createform).on('submit', function (e) {
            e.preventDefault();
            createWidgetContentFile();
        });
    }

    function createFrontWidgetTile() {
        //console.log(Olive);
        var parsedcreatedat = new Date(parseInt(jobtileinstance.createdat)).toLocaleDateString(jobStatics.locale, jobStatics.localeOptions);
        var parsedupdatedat = new Date(parseInt(jobtileinstance.updatedat)).toLocaleDateString(jobStatics.locale, jobStatics.localeOptions);
        $(widgetRepresentation)
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
                    .attr("id",jobtileinstance.updatedat)

    .on('click', function () {
        showInnerWidgetModal($(this).attr("id"));
    })

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
                        ))));

    }

    function createInnerWidgetModal() {
        $(widgetRepresentation) .append(
            $(expandedWidgetView)
            .addClass("modal fade")
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
                           .attr("src", unencodedcontent.picture)
                        )
                    )
                    .append(
                        $('<div/>')
                        .addClass("modal-body")
                        .append(
                            $("<h1/>")
                            .addClass("modal-title")
                            .css({
                                "text-align": "center"
                            })
                            .text(unencodedcontent.name)
                        )
                        .append(
                            $("<h2/>")
                            .css({
                                "text-align": "center"
                            })
                            .text(unencodedcontent.datetype)
                        )
                        .append(
                            $("<p/>")
                         .text(unencodedcontent.description)
                        )
                        .append(
                            $("<p/>")
                            .append(
                                $("<a/>")
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
                                .text(new Date(parseInt(unencodedcontent.updatedat)).toLocaleDateString(jobStatics.locale, jobStatics.localeOptions))
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
                                .text(new Date(parseInt(unencodedcontent.createdat)).toLocaleDateString(jobStatics.locale, jobStatics.localeOptions))
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
                            .text("Delete")
                            .on('click', function (e) {
                                var action = confirm('Are you sure you wish to delete this item ? It cannot be undone!');
                                if (action === false) {
                                    return false;
                                }
                                deleteWidgetContentFile();
                            })

                        )
                        .append(
                            $('<button/>')
                            .addClass("btn btn-info")
                            .attr("type", "button")
                            .attr("data-toggle", "modal")
                            .attr("data-target", createform)
                            .text("Edit")
                            .on('click', function (e) {
                                e.stopPropagation();
                                createform = document.createElement('div');
                                makeCreateForm();
                                addCreateFormSubmitHandler();
                                populateEditForm();
                                $(createform).modal('show');
                            })
                        )
                    )
                )));
    }





    function addNewButtonHandler() {
        $(Grid.addbutton)
            .unbind('click')
            .on('click', function (e) {
                e.stopPropagation();
                createform = document.createElement('div');
                makeCreateForm();
                addCreateFormSubmitHandler();
                $(createdatfield).val(new Date().getTime());
                $(updatedatfield).val($(createdatfield).val());
                $(createform).modal('show');
            });
    }







    function populateEditForm() {

        updatedat = new Date().getTime();
        $(updatedatfield).val(updatedat);
        $(createdatfield).val(unencodedcontent.createdat);
        $(filenamefield).val(unencodedcontent.name);
        $(filecontentfield).val(unencodedcontent.description);
        $(emailaddressfield).val(unencodedcontent.email);
        $(eventpicturefield).val(unencodedcontent.picture);
        var typeseditedradionew = document.getElementsByName('jobtype');
        for (var j = 0, l = typeseditedradionew.length; j < l; j++) {

            if (unencodedcontent.datetype === typeseditedradionew[j].value) {
                console.log("found: " + unencodedcontent.datetype);
                typeseditedradionew[j].checked = true;
                break;
            }
        }



        console.log("form populated");
    }







    function showInnerWidgetModal(id) {
        $.ajax({
                url: Olive.getConfig().indexurl + "/" + id,
                beforeSend: setWidgetAuthHeader.bind(this),
                dataType: 'json'
            })
            .done(function (response) {
                currentresponse = response;
                unencodedcontent = JSON.parse(atob(response.content));
                expandedWidgetView = document.createElement('div');
                createInnerWidgetModal();
                $(expandedWidgetView).modal('show');
              //  addDeleteButtonHandler();
             //   addEditButtonHandler();
            })
            .fail(function () {
                alert('That entry is no longer avaliable');
            });
    }


    Olive.add(job);
})(Grid,Olive);