class ToDoItem {
  constructor(item) {
    this.item = item;
  }

  print() {
  let printText = `<p>${this.item}</p>`
  return printText;
  }
}
