var Olive = {
   widgets: {
      widgetlist: [],
      instancelist: [],
      add: function (widget) {
         this.widgetlist.push(widget);
      },
      addInstance: function (instance) {
         this.instancelist.push(instance);
      }
   },
};

// instantiate dashboard on button click with provided url/token
$(function () {

// add modal to get url and token

      $('body').append(
          $('<div/>')
          .addClass("modal fade")
          .attr("id", "grid_options_modal")
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
                          .attr("id", "grid_options_form")
                          .append(
                              $('<p/>')
                              .text("List Endpoint Url:")
                          )
                          .append(
                              $('<input>')
                              .attr("id", "url")
                              .attr("name", "url")
                              .attr("type", "text")
                          )
                          .append(
                           $('<p/>')
                           .text("Authorization Token:")
                       )
                       .append(
                           $('<input>')
                           .attr("id", "token")
                           .attr("name", "token")
                           .attr("type", "text")
                       )
                       .append(
                        $('<p/>')
                        .text("List filename:")
                    )
                    .append(
                        $('<input>')
                        .attr("id", "indexfilename")
                        .attr("name", "indexfilename")
                        .attr("type", "text")
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


// add utton to trigger grid_options_modal

   $('body').append(
      $('<button/>')
      .addClass("btn btn-warning")
      .attr("data-toggle", "modal")
      .attr("data-target", "#grid_options_modal")
      .attr("id", "add")
      .text("Add widget")
  )

// handle submission of grid options modal


  $('#grid_options_form').on('submit', function (e) {
   e.preventDefault();
   // instantiate grid with passed parameters
   var gridinstance = new Grid();
   var gridcontent = {};
   gridcontent.indexurl=$('#url').val();
   gridcontent.token=$('#token').val();
   gridcontent.indexfilename=$('#indexfilename').val();
   //gridcontent.type=$('#type').val();

   gridinstance.setContent(gridcontent);
   // get grid data prom passed endpoint
   gridinstance.getData();
    $.when(getDataAjax).done(function(){   // not very nice to declare ajax as global variable :(
   // render grid elements
        gridinstance.render();
 });
 // add  grid instance to global widget instance list
 Olive.widgets.addInstance(gridinstance);
 $('#grid_options_modal').modal('hide');
});


});