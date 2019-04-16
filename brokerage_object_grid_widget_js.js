// get this from endpoint
var passedarray = [];
function Grid() {
    reopurl = "defaulturl",
        token = "defaulttoken",
        type = "defaultjob";
};
Grid.prototype.setContent = function (content) {
    // configure "list" endpoint
    this.reopurl = (content.reopurl || '');
    this.token = (content.token || '');
    this.type = (content.type || '');
};
function setAuthHeader(request) {
    if (typeof this.token !== 'undefined') {
        request.setRequestHeader("Authorization", "token " + this.token);
    }
}
Grid.prototype.getData = function () {
    indexlistendpoint = 'indexlist';   //endpoint of indexlist
    getDataAjax = $.ajax({ // can global variable here be prevented ?
        url: this.reopurl + '/' + indexlistendpoint,
        beforeSend: setAuthHeader.bind(this),
        dataType: 'json',
        success: function (response) {
            // produce array with info needed to produce tile for each widget instance
            resultsJSON = [];
            listsha = response.sha;
            unencodedcontent = JSON.parse(atob(response.content));
            $.each(unencodedcontent.list, function (i, f) {
                if (f.name !== indexlistendpoint) { // omit indexlist file - it is in the same repo folder
                    f.url=this.reopurl;
                    f.token=this.token;
                    resultsJSON.push(f);
                }
            }.bind(this));
        }.bind(this)
    });
};
classname = 'JobTile';
Grid.prototype.render = function () {
// add buttons to dom
// add grid to dom
    $('#broker').append(
        $('<button/>')
        .addClass("btn btn-info")
        .attr("type", "button")
        .attr("data-toggle", "modal")
        .attr("data-target", "#createform")
        .attr("id", "createbutton")
        .text("NEW")
    )
    .append(
        $('<button/>')
        .addClass("btn btn-info")
        .attr("type", "button")
        .attr("data-toggle", "modal")
        .attr("data-target", "#filtermodal")
        .attr("id", "filtermodalbutton")
        .text("Filter/Sort")
    )
    .append(
        $('<div/>')
        .addClass("container")
        .append(
            $("<section/>")
            .addClass("cms-boxes")
            .append(
                $("<div/>")
                .addClass("container-fluid")
                .attr("id", "widgetcontainer")
    )));
    // instantiate all tiles of a grid based on content of a list
    resultsJSON.forEach(function (i) {
        instance = eval("new " + classname + "()"); // no-can-do differently
        //   instance = new JobTile();
        instance.setContent(i);
        Olive.widgets.addInstance(instance);
        $("#widgetcontainer").append(instance.render());
    });
};
Olive.widgets.add(Grid);