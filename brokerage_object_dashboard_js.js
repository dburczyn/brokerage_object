Olive = (function (config = {}) {
    var widgetlist = [];
    var instancelist = [];
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

    var optionsModal;
    var widgetAddButton;
    var optionsModalSubmitButton = document.createElement('button');
    var indexfilename = document.createElement('input');
    var token = document.createElement('input');
    var url = document.createElement('input');

    function addOptionsModal() {
         optionsModal = document.createElement('div');
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
         widgetAddButton = document.createElement('button');
        $(widgetAddButton)
            .appendTo($(document.body))
            .addClass("btn btn-warning")
            .text("Add widget");
    }

    function addWidgetAddButtonClickHandler(){
        $(widgetAddButton).click(function () {
            $(optionsModal).modal('show');
          });

    }


    function addHandleOptionsModalSubmission() {
        $(optionsModalSubmitButton).click(function (e) {
e.preventDefault();
            // instantiate grid with passed parameters
            var gridinstance;
            widgetlist.forEach(function (entry) {
                if (entry.type === "Grid") {
                    gridinstance = Object.assign({}, entry);
                    return;
                }
            });
            config.indexurl = $(url).val();
            config.token = $(token).val();
            config.indexfilename = $(indexfilename).val();
            gridinstance.setContent(config);
            // get grid data from passed endpoint
            gridinstance.getData();
            //  console.log(gridinstance.getDataAjax);
            $.when(gridinstance.getDataAjax).done(function () { // not very nice to use ajax declared as global variable :(
                // render grid elements
                gridinstance.render();
            });
            // add  grid instance to global widget instance list
            Olive.addInstance(gridinstance);
            $(optionsModal).modal('hide');
        });
    }


    $(function () {


        if ($.trim($('body').html())==''){
            addOptionsModal();
            addWidgetAddButton();
            addWidgetAddButtonClickHandler();
            addHandleOptionsModalSubmission();
          }




    });
    return widgets;
})();