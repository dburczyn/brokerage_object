Olive = (function () {
    var config= {};
    var widgetlist = [];
    var optionsModal = document.createElement('div');
    var widgetAddButton = document.createElement('button');
    var optionsModalSubmitButton = document.createElement('button');
    var indexfilename = document.createElement('input');
    var token = document.createElement('input');
    var url = document.createElement('input');
    var gridinstance;
    var widgets = {
        add: function (widget) {
            widgetlist.push(widget);
        },
        getWidgetList: function () {
            return widgetlist;
        },
    };

    function addOptionsModal() {
        $(optionsModal)
            .prependTo($(document.body))
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
                            .text("Add grid form")
                        )
                    )
                    .append(
                        $('<div/>')
                        .addClass("modal-body")
                        .append(
                            $('<form/>')
                            .addClass("form-style-5")
                            .append(
                                $('<p/>')
                                .text("List Endpoint Url:")
                            )
                            .append(
                                $(url)
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("Authorization Token:")
                            )
                            .append(
                                $(token)
                                .attr("type", "text")
                            )
                            .append(
                                $('<p/>')
                                .text("List filename:")
                            )
                            .append(
                                $(indexfilename)
                                .attr("type", "text")
                            )
                            .append(
                                $(optionsModalSubmitButton)
                                .addClass("btn btn-danger")
                                .text("Submit")
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
                ));
    }

    function addWidgetAddButton() {
        $(widgetAddButton)
            .appendTo($(document.body))
            .addClass("btn btn-warning")
            .text("Add widget")
            .click(function () {
                $(optionsModal).modal('show');
            });
    }

    function instantiateGrid() {
        widgetlist.forEach(function (entry) {
            if (entry.type === "Grid") { // hardcoded name for "Grid" type - assume having one ?? - basically searching for grid widget
                gridinstance = Object.assign({}, entry);
            }
        });
    }

    function readAndSetGridConfig() {
        config.indexurl = $(url).val();
        config.token = $(token).val();
        config.indexfilename = $(indexfilename).val();
    }
    $(optionsModalSubmitButton).click(function (e) {
        e.preventDefault();
        instantiateGrid();
        readAndSetGridConfig();
        gridinstance.render(config); // render grid widget with params passed from form
        $(optionsModal).modal('hide');
    });
    $(function () {
        addOptionsModal();
        addWidgetAddButton();
    });
    return widgets;
})();