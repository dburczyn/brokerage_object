  Grid = (function (Olive) {
    var widgetFileNames = [];
    var indexedListNames = [];
    var indexListobjToUpdate = {};
    indexListobjToUpdate.list = [];
    var functionnames = [];
    var resultsJSON = [];
    var unencodedcontent;
    var namesToAddToList;
    var namesToDeleteFromList;
    var updatedIndexList;
    var listsha;
    var widgetlist;
    var instance;
    var widgetcontainer = document.createElement('div');
    var widgetAddButton = document.createElement('button');
    var widgetcontainerinner = document.createElement('div');

    var grid = {
      addbutton:widgetAddButton,
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
        this.getDataAjax = $.ajax({
          url: this.indexurl + "/" + this.indexfilename,
          beforeSend: setAuthHeader.bind(this),
          dataType: 'json'
        }).done(function (response) {
          resultsJSON = [];
          produceWidgetContent.call(this, response);
          if ((typeof this.token !== 'undefined') && (this.token != "") && (this.token != "defaulttoken")) {
            getListOfObjects(this); // used for creation/update of indexlist - only for admin = authenticated users
          }
        }.bind(this));
      },
      render: function () {
        widgetlist = Olive.getWidgetList();
        // produce array with widget widgetFileNames
        widgetlist.forEach(function (i) {
          if (typeof i.type !== 'undefined' && functionnames.indexOf(i.type) == -1) {
            functionnames.push(i.type);
          }
        });
        functionnames.forEach(function (name) {
          if (name !== "Grid") { // hardcoded to not add grid add button/container
            addWidgetButton.call(this, name);
            addWidgetContainer();
          }
        }.bind(this));
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

    function instantiateWidgets() {
      resultsJSON.forEach(function (widgetData) {
        if (functionnames.indexOf(widgetData.type) > -1) {
          widgetlist.forEach(function (widgetTypeName) {
            if (widgetTypeName.type === widgetData.type) {
              instance = Object.assign({}, widgetTypeName);
            }
          });
          widgetData.token = this.token;
          widgetData.indexurl = this.indexurl;
          widgetData.indexfilename = this.indexfilename;
          instance.setContent(widgetData);
          Olive.addInstance(instance);
          $(widgetcontainerinner).append(instance.render());   // here lands all content of widget instances
        }
      });
    }

    function getListOfObjects(gridinstance) {
      $.ajax({
        url: gridinstance.indexurl,
        beforeSend: setAuthHeader.bind(gridinstance),
        dataType: 'json'
      }).done(function (results) {
        $.each(results, function (i, f) {
          if (f.name != gridinstance.indexfilename) {
            widgetFileNames.push(
              f.name
            );
          }
        });
        getDiffIndexList(gridinstance); // after having list of all widgetFileNames in repo, get list of indexed widgetFileNames
      });
    }


    // if no name on indexlist add object to indexlist
    function getDiffIndexList(gridinstance) {
      namesToAddToList = widgetFileNames.diff(indexedListNames);
      var differingRecordsRequests = [];
      namesToAddToList.forEach(function (nameToAddToList) {
        var request = $.ajax({
          url: gridinstance.indexurl + '/' + nameToAddToList,
          beforeSend: setAuthHeader.bind(gridinstance),
          dataType: 'json'
        }).done(function (response) {
          prepareUpdateList(response);
        });
        differingRecordsRequests.push(request);
      });
      $.when.apply(null, differingRecordsRequests).done(function () {
        prepareUpdatedIndexlist();
        pushUpdatedIndexlist(gridinstance);
      });
    }

    function prepareUpdateList(response) {
      var content = atob(response.content);
      var unencodedcontentdiff = JSON.parse(content);
      indexListobjToUpdate.list.push({
        createdat: unencodedcontentdiff.createdat,
        updatedat: unencodedcontentdiff.updatedat,
        datetype: unencodedcontentdiff.datetype,
        name: unencodedcontentdiff.name,
        type: unencodedcontentdiff.type
      });
    }

    function prepareUpdatedIndexlist() {
      namesToDeleteFromList = indexedListNames.diff(widgetFileNames);
      updatedIndexList = {};
      updatedIndexList.list = unencodedcontent.list.concat(indexListobjToUpdate.list);
      for (var j = 0; j < namesToDeleteFromList.length; j++) {
        for (var i = 0; i < updatedIndexList.list.length; i++) {
          if (updatedIndexList.list[i].updatedat == namesToDeleteFromList[j]) {
            updatedIndexList.list.splice(i, 1);
          }
        }
      }
    }

    function pushUpdatedIndexlist(args) {
      if (!arraysEqual(unencodedcontent.list, updatedIndexList.list)) {
        $.ajax({
          url: args.indexurl + '/' + args.indexfilename,
          beforeSend: setAuthHeader.bind(args),
          type: 'PUT',
          data: '{"message": "create indexlist","sha":"' + listsha + '","content":"' + btoa(JSON.stringify(updatedIndexList)) + '" }',
          dataType: 'json',
        });
      }
    }

    function addWidgetButton(name) {
      $(widgetAddButton)
        .appendTo($(widgetcontainer))
        .addClass("btn btn-info")
        .text('NEW ' + name);
    }

    function addWidgetContainer() {
      $(widgetcontainer)
        .appendTo($(document.body))
        .addClass("container")
        .append(
          $("<section/>")
          .addClass("cms-boxes")
          .append(
            $(widgetcontainerinner)
            .addClass("container-fluid")
          ));
    }

    function produceWidgetContent(response) {
      listsha = response.sha;
      unencodedcontent = JSON.parse(atob(response.content));
      $.each(unencodedcontent.list, function (i, f) {
        resultsJSON.push(f);
        indexedListNames.push(    // used in indexlist creation
          f.updatedat
        );

      }.bind(this));
    }
    Olive.add(grid);
    return grid;
  })(Olive);