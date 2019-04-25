Olive = (function (config = {}) {
    var widgetlist = [];
    var instancelist = [];
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
        addInstance: function (instance) {
            instancelist.push(instance);
        },
        getConfig: function () {
            return config;
        },
        getWidgetList: function () {
            return widgetlist;
        },
        getInstanceList: function () {
            return instancelist;
        }
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
            if (entry.type === "Grid") { // hardcoded name for "Grid" type - assume having one ??
                gridinstance = Object.assign({}, entry);
            }
        });
    }
    function readAndSetGridConfig() {
        config.indexurl = $(url).val();
        config.token = $(token).val();
        config.indexfilename = $(indexfilename).val();
        gridinstance.setContent(config);
    }
    function getAndRenderGridData() {
        gridinstance.getData();
        $.when(gridinstance.getDataAjax).done(function () {
            gridinstance.render();
        });
    }
    $(optionsModalSubmitButton).click(function (e) {
        e.preventDefault();
        instantiateGrid();
        readAndSetGridConfig();
        getAndRenderGridData();
        Olive.addInstance(gridinstance);
        $(optionsModal).modal('hide');
    });
    $(function () {
        addOptionsModal();
        addWidgetAddButton();
    });
    return widgets;
})();