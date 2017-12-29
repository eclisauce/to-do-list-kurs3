class App extends Base{
  constructor() {
    super();
    this.todoList = [];
    this.doneList = [];
    this.updateListView;
    this.updateAllViews;
    this.show;
    this.getdata;

  }

updateListView(list, listSelector) {
  let $myList = $(listSelector);
  JSON._save('items',{todolist: todoList, donelist: doneList});
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


 updateAllViews() {
  updateListView(todoList, '.todolist');
  updateListView(doneList, '.donelist');
  $('.donelist .move-to-done').remove();
  $('.donelist .move-up').remove();
  $('.donelist .move-down').remove();
  $('.todolist .btn-group').hide();
  $('.donelist .btn-group').hide();
  $('.todolist').mouseenter(function() {
    $('.btn-group').show();
  });
  $('.todolist').mouseleave(function() {
    $('.btn-group').hide();
  });
  $('.donelist').mouseenter(function() {
    $('.btn-group').show();
  });
  $('.donelist').mouseleave(function() {
    $('.btn-group').hide();
  });
}

  show(text) {
  if (text !== '') {
    const myItem = new ToDoItem(text);
    todoList.add(myItem);
    updateAllViews();
    $('#formfield').val('');
  }
}

getdata(){
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
}
}
