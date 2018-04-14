onload = function () {

  // reitrieve source server data mockup
  //var serverData = getServerDataMockup();
  // Create an array to bind to the grid. Its items contain references
  // to the source array items, so that data edits performed in the
  // grid will update the source data.
  //createGridData(serverData);
  makeRequest("GET", "pupils.json")
    .then(function (data){
      var gridData = JSON.parse(data);

      var groups = [
        {id: 1, name: "Group 1"},
        {id: 2, name: "Group 2"},
        {id: 3, name: "Group 3"}
      ];

      var marks = [
        {id: 1, name: "Mark 1"},
        {id: 2, name: "Mark 2"},
        {id: 3, name: "Mark 3"}
      ];

      // create the grid
      var grid = new wijmo.grid.FlexGrid('#grid1', {
        allowResizing: 'Both',
        autoGenerateColumns: false,
        // enable column header mearging
        allowMerging: wijmo.grid.AllowMerging.ColumnHeaders,
        frozenColumns: 2
      });
      
       var groupMap = new wijmo.grid.DataMap(groups, 'id', 'name');
       var markMap = new wijmo.grid.DataMap(marks, 'id', 'name');
      // add grid columns
      //var firstItem = gridData[0],
        //  itemLessons = firstItem.lessons;
      // add left-hand columns
      grid.columns.push(new wijmo.grid.Column({ binding: 'FullName', header: 'ФИО', 
          width: 140, allowMerging: true }));

      grid.columns.push(new wijmo.grid.Column({ binding: 'group.Id', header: 'Группа', 
          width: 140, allowMerging: true, dataMap: groupMap }));

      var firstItem = gridData[0];

      var row = new wijmo.grid.Row(),
      ch = grid.columnHeaders;
      // initialize header cells
      row.allowMerging = true;
      ch.rows.insert(0, row);

      var lessonsColIdx = grid.columns.length;
      var lessonsColCount = 3;

      for (var i = 0; i < firstItem.cases.length; i++) {
        for (var j = 0; j < firstItem.cases[i].lessons.length; j++) {
          grid.columns.push(new wijmo.grid.Column({ binding: 'cases[' + i + '].lessons[' + j + '].Color', header: 'Статус ', 
              width: 140, allowMerging: true, name: 'lesson'}));

          grid.columns.push(new wijmo.grid.Column({ binding: 'cases[' + i + '].lessons[' + j + '].MarkAut', header: 'Оценка автоматическая', 
              width: 140, allowMerging: true, wordWrap: true}));

          grid.columns.push(new wijmo.grid.Column({ binding: 'cases[' + i + '].lessons[' + j + '].TeacherMark', header: 'Оценка педагога', 
              width: 140, allowMerging: true, wordWrap: true, dataMap: markMap}));

        }

        var startIdx = lessonsColIdx + lessonsColCount * i;
        setHeader(ch, 0, startIdx, 0, startIdx + lessonsColCount - 1, firstItem.cases[i].Name);

        // grid.columns.push(new wijmo.grid.Column({ binding: 'cases[' + i + '].Name', header: 'Case', 
        //     width: 140, allowMerging: true}));       
      }
      
      grid.itemsSource = gridData;
      grid.autoSizeRow(1, true);
      grid.itemFormatter = function(panel, r, c, cell){
        var col = panel.columns[c];
        //console.log(col.name);
        var s = cell.style;
        s.color = '';
        s.backgroundColor = '';
        if (panel.cellType == 1 && col.name == 'lesson') {
          //gridData[r].cases[(c + 1)/3 - 1].lessons[]
          
          s.backgroundColor = cell.innerText;
          cell.innerText = '';
        }
      }
      // grid.formatItem.addHandler(function(s, e){
      //           if (e.panel == s.cells) {
      //             if (e.)
      //             e.cell.style.backgroundColor = '#FF8040';
      //             //wijmo.toggleClass(e.cell, 'high-value', e.cell.row().dataItemIndex % 2);
      //             // wijmo.toggleClass(e.cell, 'low-value', !(e.cell.row().dataItemIndex % 2));
      //           }
      // });
      
    })
    .catch(function (err) {
      console.error(err.statusText);
    });

  // create the grid
  // var grid = new wijmo.grid.FlexGrid('#grid1', {
  // 	allowResizing: 'Both',
  // 	autoGenerateColumns: false,
  // 	// enable column header mearging
  // 	allowMerging: wijmo.grid.AllowMerging.ColumnHeaders,
  // 	frozenColumns: 1
  // });
  
  // add grid columns
  //var firstItem = gridData[0],
    //  itemLessons = firstItem.lessons;
  // add left-hand columns
  // grid.columns.push(new wijmo.grid.Column({ binding: 'FullName', header: 'Name', 
  //     width: 140, allowMerging: true }));
  // grid.columns.push(new wijmo.grid.Column({ binding: 'group.Name', header: 'Group', 
  //     width: 140, allowMerging: true }));
  // grid.columns.push(new wijmo.grid.Column({ binding: 'case[0].Name', header: 'Case', 
  //     width: 140, allowMerging: true }));
      
  /*var lessonsColIdx = grid.columns.length,
      lessonsColCount;
  // add lesson columns
  for (var i = 0; i < itemLessons.length; i++){
    var lessonRef = 'lessons[' + i + ']';
    lessonsColCount = grid.columns.length;
    grid.columns.push(new wijmo.grid.Column({ binding: lessonRef + '.map.status', 
        header: 'Status', allowMerging: true }));
    grid.columns.push(new wijmo.grid.Column({ binding: lessonRef + '.map.autoGrade', 
        header: 'Auto Grade', allowMerging: true }));
    grid.columns.push(new wijmo.grid.Column({ binding: lessonRef + '.map.teacherGrade', 
        header: 'Teacher Grade', width: 120, allowMerging: true }));
    lessonsColCount = grid.columns.length - lessonsColCount;
  }
  var totalsColIdx  = grid.columns.length,
      totalsColCount;
  // add right-hand columns
  grid.columns.push(new wijmo.grid.Column({ binding: 'pupil.autoGrade', header: 'Auto Grade', allowMerging: true }));
  grid.columns.push(new wijmo.grid.Column({ binding: 'pupil.teacherGrade', header: 'Teacher Grade', width: 120, allowMerging: true }));
  totalsColCount = grid.columns.length - totalsColIdx;
  
  // add extra column header row
  var row = new wijmo.grid.Row(),
      ch = grid.columnHeaders;
  // initialize header cells
  row.allowMerging = true;
  ch.rows.insert(0, row);
  for (var i = 0; i < itemLessons.length; i++){ 
    var startIdx = lessonsColIdx + lessonsColCount * i;
    setHeader(ch, 0, startIdx, 0, startIdx + lessonsColCount - 1, itemLessons[i].lesson.name);
  }
  setHeader(ch, 0, totalsColIdx, 0, totalsColIdx + totalsColCount - 1, 'Case Totals');
  ch.rows[1].height = ch.rows.defaultSize + 12;
  */
  // bind grid to data
  // grid.itemsSource = gridData;
  
  // show source data 
  //showSourceData(serverData, grid);
};

// Based on the data arrays retrieved from the server, creates an array 
// to use as the grid's data source. 
// each item contain properties:
// pupil: pupil
// lessons: array of { map: pupilLessonMap, lesson: lessons }
function createGridData(serverData){
  var pupils = serverData.pupils,
      lessons = serverData.lessons,
      pupilLessonMap = serverData.pupilLessonMap,
      ret = [],
      i,
      j;
  
  // loop through pupils
  for (i = 0; i < pupils.length; i++){
    var pupil = pupils[i];
    var item = {
      pupil: pupil,
      lessons: []
    };
    var pupilLessons = findItems(pupilLessonMap, 'pupilId', pupil.id);
    for (j = 0; j < pupilLessons.length; j++){
      var curMap = pupilLessons[j];
      var curLesson = {
        map: curMap,
        lesson: findItems(lessons, 'id', curMap.lessonId)[0]
      };
      item.lessons.push(curLesson);
    }
    // Sort lessons, so that their order will be the same for every pupil. 
    // There should be a field in the serverData.lessons
    // that determine a correct order. We use lessons.id for this.
    item.lessons.sort(function(a, b){ return a.lesson.id - b.lesson.id; });
    ret.push(item);
  }
  
  return ret;
}

// returns an array of items from the specified array
// whose property value is equal to the specified value.
function findItems(array, property, value){
  if (array){
    var ret = array.filter(function(item){
      return item[property] === value;
    });
    return ret;
  }
  
  return [];
}

// set merged cell header
function setHeader(p, r1, c1, r2, c2, hdr) {
    for (var r = r1; r <= r2; r++) {
        for (var c = c1; c <= c2; c++) {
            p.setCellData(r, c, hdr);
        }
    }
}

// creates grids that shows source (server) data arrays
function showSourceData(serverData, mainGrid){
  // create grids
  var sourceGrids = [
    new wijmo.grid.FlexGrid('#pupilsGrid', {
      itemsSource: serverData.pupils,
      isReadOnly: true
    }),
    new wijmo.grid.FlexGrid('#mapGrid', {
      itemsSource: serverData.pupilLessonMap,
      isReadOnly: true
    }),
    new wijmo.grid.FlexGrid('#lessonsGrid', {
      itemsSource: serverData.lessons,
      isReadOnly: true
    })
  ];
  // refresh source data grids in the main grid's 
  // cellEditEnded event to reflect changes in the source
  // data
  mainGrid.cellEditEnded.addHandler(function(){
    sourceGrids.forEach(function(g){ g.invalidate() });
  });
}

