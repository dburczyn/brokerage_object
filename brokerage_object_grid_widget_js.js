  (function (Olive) {
    var names = [];
    var indexedListNames = [];
    var indexListobjToUpdate = {};
    indexListobjToUpdate.list = [];
    var functionnames = [];
    var resultsJSON = [];
    var content;
    var unencodedcontent;
    var unencodedcontentdiff;
    var namesToAddToList;
    var namesToDeleteFromList;
    var result;
    var listsha;

    var widgetAddButton;

    var grid =
      {
        getDataAjax: {},
        type: "Grid",
        indexurl: "defaultindexurl",
        token: "defaulttoken",
        indexfilename: "defaulttype",
        setContent: function (content) {
          this.indexurl = (content.indexurl || '');
          this.token = (content.token || '');
          this.indexfilename = (content.indexfilename || '');
        },
        getData: function () {
          this.getDataAjax = $.ajax({ // can global variable here be prevented ?
            url: this.indexurl + "/" + this.indexfilename,
            beforeSend: setAuthHeader.bind(this),
            dataType: 'json'
          }).done(function (response) {
            produceWidgetContent.call(this, response);
            if ((typeof this.token !== 'undefined') && (this.token != "") && (this.token != "defaulttoken")) {
              getListOfObjects(this);
            }
          }.bind(this));
        },
        render: function () {
          widgetlist = Olive.getWidgetList();
          // produce array with function names
          widgetlist.forEach(function (i) {
            if (typeof i.type !== 'undefined') {
              functionnames.push(i.type);
            }
          });
          functionnames.forEach(function (name) {
            if (name !== "Grid") { // hardcoded to not add grid add button - can be changed to add it
              addWidgetButton.call(this, name);
              addWidgetContainer.call(this, name);
            }
          }.bind(this));
          //(take type from form ? - would not allow different types in one list)
          instantiateWidgets.call(this);
        },
      };
    function setAuthHeader(request) {
      if ((typeof this.token !== 'undefined') && (this.token != "") && (this.token != "defaulttoken")) {
        request.setRequestHeader("Authorization", "token " + this.token);
      }
    }
    Array.prototype.diff = function (a) {
      return this.filter(function (i) {
        return a.indexOf(i) < 0;
      });
    };
    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length)
        return false;
      for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
          return false;
      }
      return true;
    }
    var widgetlist = Olive.getWidgetList();
    widgetlist.forEach(function (entry) {
      if (entry.type === "Grid") {
        gridinstance = Object.assign({}, entry);
        return;
      }
    });
    var instance;
    function instantiateWidgets() {
      resultsJSON.forEach(function (i) {
        if (functionnames.indexOf(i.type) > -1) {
          var widgetlist = Olive.getWidgetList();
          widgetlist.forEach(function (entry) {
            if (entry.type === i.type) {
              instance = Object.assign({}, entry);
              return;
            }
          });
          i.token = this.token;
          i.indexurl = this.indexurl;
          i.indexfilename = this.indexfilename;
          instance.setContent(i);
          Olive.addInstance(instance);
          $("#widgetcontainer").append(instance.render());
        }
      });
    }
    function getListOfObjects(args) {
      $.ajax({
        url: args.indexurl,
        beforeSend: setAuthHeader.bind(args),
        dataType: 'json'
      }).done(function (results) {
        $.each(results, function (i, f) {
          if (f.name != args.indexfilename) {
            names.push(
              f.name
            );
          }
        });
        getDiffIndexList(args); // after having list of all names in repo, get list of indexed names
      });
    }
    function prepareUpdateList(response) {
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
    // if no name on indexlist add object to indexlist
    function getDiffIndexList(args) {
      namesToAddToList = names.diff(indexedListNames);
      var differingRecordsRequests = [];
      namesToAddToList.forEach(function (entry) {
        var request = $.ajax({
          url: args.indexurl + '/' + entry,
          beforeSend: setAuthHeader.bind(args),
          dataType: 'json'
        }).done(function (response) {
          prepareUpdateList(response);
        });
        differingRecordsRequests.push(request);
      });
      $.when.apply(null, differingRecordsRequests).done(function () {
        prepareUpdatedIndexlist();
        pushUpdatedIndexlist(args);
      });
    }
    function prepareUpdatedIndexlist() {
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
    }
    function pushUpdatedIndexlist(args) {
      if (!arraysEqual(unencodedcontent.list, result.list)) {
        $.ajax({
          url: args.indexurl + '/' + args.indexfilename,
          beforeSend: setAuthHeader.bind(args),
          type: 'PUT',
          data: '{"message": "create indexlist","sha":"' + listsha + '","content":"' + btoa(JSON.stringify(result)) + '" }',
          dataType: 'json',
        });
      }
    }
    function addWidgetButton(name) {

       widgetAddButton = document.createElement('button');
      $(widgetAddButton)
          .appendTo($(document.body))
          .addClass("btn btn-info")
          .text('NEW ' + name)




    }
    function addWidgetContainer(name) {
      if (document.getElementById(this.indexfilename + name + 'container') === null) {
        $('body').append(
          $('<div/>')
          .addClass("container")
          .append(
            $("<section/>")
            .addClass("cms-boxes")
            .append(
              $("<div/>")
              .addClass("container-fluid")
              .attr("id", this.indexfilename + name + 'container')
            )));
      }
    }
    function produceWidgetContent(response) {
      listsha = response.sha;
      unencodedcontent = JSON.parse(atob(response.content));
      $.each(unencodedcontent.list, function (i, f) {
        // f.indexurl = this.indexurl;
        // f.token = this.token;
        // f.indexfilename = this.indexfilename;
        resultsJSON.push(f);
        indexedListNames.push(
          f.updatedat
        );
      }.bind(this));
    }
    Olive.add(grid);
    //return grid;
  })(Olive);