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

// if adgrid button clicked - instantiate grid
// id add single clicked - add single
var gridcontent = {reopurl : "https://api.github.com/repositories/175385549/contents/js",
token : "93779c5481260fc4ee7ed12dbb53e624c41edf9e",
type : "job"}

// instantiate dashboard on button click with predefined url/token/type
$(function () {
$('#dashboard').on('click', function (e) {
   $("#broker").empty();
   gridinstance = new Grid();
   gridinstance.setContent(gridcontent);
   gridinstance.getData();
    $.when(getDataAjax).done(function(){   // not very nice to declare ajax as global variable :(
        gridinstance.render();
 });
 Olive.widgets.addInstance(gridinstance);
});
});