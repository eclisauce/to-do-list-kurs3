class Item {
  constructor(description) {
    this.description = description;
  }

  print() {
    let printText = `<p>${this.description}</p>`
    return printText;
  }
}
