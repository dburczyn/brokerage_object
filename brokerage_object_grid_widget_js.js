// get this from endpoint

function Grid() {
    indexurl = "defaultindexurl",
        token = "defaulttoken";
        indexfilename = "defaulttype";
   };

   function setAuthHeader(request) {
    if ((typeof this.token !== 'undefined')&&( this.token != "")&&( this.token != "defaulttoken")) {
        request.setRequestHeader("Authorization", "token " + this.token);
     }
  }


   Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };


names = [];
indexedListNames = [];
indexListobjToUpdate = {};
indexListobjToUpdate.list = [];
inp = null;
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}



   function getListOfObjects(args) {
       console.log(args);
    $.ajax({
      url: "https://api.github.com/repositories/175385549/contents/js",
      beforeSend: setAuthHeader.bind(this),
      dataType: 'json',
      success: function (results) {
        $.each(results, function (i, f) {
          if (f.name != "indexlist") {
            names.push(
              f.name
            );
          }
        });
        getDiffIndexList(); // after having list of all names in repo, get list of indexed names
      }
    });
  }
  // if no name on indexlist add object to indexlist
  function getDiffIndexList() {
    namesToAddToList = names.diff(indexedListNames);
    var promises = [];
    namesToAddToList.forEach(function (entry, f) {
      var request = $.ajax({
        url: "https://api.github.com/repositories/175385549/contents/js" + '/' + entry,
        beforeSend: setAuthHeader.bind(this),
        dataType: 'json',
        success: function (response) {
          currentresponse = response;
          content = atob(response.content);
          unencodedcontentdiff = JSON.parse(content);
          indexListobjToUpdate.list.push({
            createdat: unencodedcontentdiff.createdat,
            updatedat: unencodedcontentdiff.updatedat,
            datetype: unencodedcontentdiff.datetype,
            name: unencodedcontentdiff.name,
            type: unencodedcontentdiff.type
          });
        }
      });
      promises.push(request);
    });
    $.when.apply(null, promises).done(function () {
      performUpdate();
    });
  }
  function performUpdate() {
    console.log(this);
    namesToDeleteFromList = indexedListNames.diff(names);
    result = {}
    result.list = unencodedcontent.list.concat(indexListobjToUpdate.list);
    for (var j = 0; j < namesToDeleteFromList.length; j++) {
      for (var i = 0; i < result.list.length; i++) {
        if (result.list[i].updatedat == namesToDeleteFromList[j]) {
          result.list.splice(i, 1);
        }
      }
    }
    if (!arraysEqual(unencodedcontent.list, result.list)) {
        result.list.forEach(function (entry)
        {entry.token="secret";});
      $.ajax({
        url: 'https://api.github.com/repositories/175385549/contents/js' + '/indexlist',
        beforeSend: function(request) {request.setRequestHeader("Authorization", "token " + "")},
        type: 'PUT',
        data: '{"message": "create indexlist","sha":"' + listsha + '","content":"' + btoa(JSON.stringify(result)) + '" }',
        dataType: 'json',
      });
    }
  }




















Grid.prototype.setContent = function (content) {
    this.indexurl = (content.indexurl || '');
    this.token = (content.token || '');
    this.indexfilename = (content.indexfilename || '');
};

Grid.prototype.getData = function () {
    getDataAjax = $.ajax({ // can global variable here be prevented ?
        url: this.indexurl + "/" + this.indexfilename,
        beforeSend: setAuthHeader.bind(this),
        dataType: 'json',
        success: function (response) {
            // produce array with info needed to produce tile for each widget instance
            resultsJSON = [];
            listsha = response.sha;
            unencodedcontent = JSON.parse(atob(response.content));
            $.each(unencodedcontent.list, function (i, f) {
                      f.indexurl=this.indexurl;
                      f.token=this.token;
                     f.indexfilename=this.indexfilename;
                    resultsJSON.push(f);
                    indexedListNames.push(
                        f.updatedat
                      );
            }.bind(this));
            if ((typeof this.token !== 'undefined')&&( this.token != "")&&( this.token != "defaulttoken")) {
                getListOfObjects(this);
              }
        }.bind(this)
    });
};

Grid.prototype.render = function () {
// add buttons to dom
// add grid to dom
    $('body').append(
        $('<button/>')
        .addClass("btn btn-info")
        .attr("type", "button")
        .attr("data-toggle", "modal")
        .attr("data-target", "#createform")
        .attr("id", "createbutton")
        .text("NEWJOB")
    )
    .append(
        $('<button/>')
        .addClass("btn btn-info")
        .attr("type", "button")
        .attr("data-toggle", "modal")
        .attr("data-target", "#eventcreateform")
        .attr("id", "eventcreatebutton")
        .text("NEWEVENT")
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

// produce array with funtion names
functionnames=[];
Olive.widgets.widgetlist.forEach(function (i) {
    functionnames.push(i.name);
});


    // instantiate all tiles of a grid based on content of a list
    resultsJSON.forEach(function (i) {
                if (functionnames.indexOf(i.type) > -1){
                       instance = eval("new " + i.type + "()"); // no-can-do differently
        instance.setContent(i);
        Olive.widgets.addInstance(instance);
        $("#widgetcontainer").append(instance.render());
    }
            });

};
Olive.widgets.add(Grid);