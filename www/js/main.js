let todoList = new List([], 'todoList');
let doneList = new List([], 'doneList');

function updateListView(list, listSelector) {
  let $myList = $(listSelector);
  $myList.empty();
  for (let i = 0; i < list.items.length; i++) {
    let task = list.items[i];
    $myList.append(`
    <li class="list-group-item col-12 border mt-1 mb-1">
    <div class="col-9 textprint">${task.print()}</div>
    <div class="col-3 btn-group mt-2 mb-2">
      <button class="btn move-up btn-primary" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Move up"><span class="fa fa-chevron-up overline"></span></button>
      <button class="btn move-down btn-primary" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Move down"><span class="fa fa-chevron-down overline"></span></button>
      <button class="btn remove-from-list btn-danger ml-2" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Remove from list"><span class="fa fa-times"></span></button>
      <button class="btn move-to-done btn-success" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Move to done"><span class="fa fa-check overline"></span></button>
    </div>
    </li>
  `);
  }

  $myList.find('.remove-from-list').on('click', function() {
    let $btn = $(this);
    let index = $btn.data('index');
    list.removeFromList(index);
    updateAllViews();
  });

  $myList.find('.move-up').on('click', function() {
    let $btn = $(this);
    let index = $btn.data('index');
    list.moveUp(index);
    updateAllViews();
  });

  $myList.find('.move-down').on('click', function() {
    let $btn = $(this);
    let index = $btn.data('index');
    list.moveDown(index);
    updateAllViews();
  });

  $myList.find('.move-to-done').on('click', function() {
    let $btn = $(this);
    let index = $btn.data('index');
    let myObject = list.items[index];
    doneList.items.push(myObject);
    list.removeFromList(index);
    updateAllViews();
  });
}


function updateAllViews() {
  updateListView(todoList, '.todolist');
  updateListView(doneList, '.donelist');
  $('.donelist .move-to-done').remove();
  saveAllJSON();
}

function show(text) {
  if (text !== '') {
    const myItem = new Item(text);
    todoList.add(myItem);
    updateAllViews();
    $('#formfield').val('');
  }
}

$('#formfield').on('keyup', function(event) {
  let code = event.which;
  if (code == 13) {
    const text = $('#formfield').val();
    show(text);
  }
})


$('.addfirstbtn').on('click', function() {
  const text = $('#formfield').val();
  show(text);
});

function saveAllJSON() {
  todoList.saveJSON();
  doneList.saveJSON();
}

function loadAllJSON() {
  todoList.loadJSON(function(loadedItems) {
    updateAllViews();
  });
  // Arrow function
  doneList.loadJSON(loadedItems => updateAllViews());
}

loadAllJSON();
