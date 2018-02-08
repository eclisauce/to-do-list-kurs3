class List {
  constructor(items, jsonName) {
    this.items = items;
    this.jsonName = jsonName;
  }

  add(item) {
    this.items.push(item);
    return this.items;
  }

  addMany(items) {
    for (let i = 0; i < items.length; i++) {
      let item = new Item();
      item.description = items[i].description;
      this.add(item);
    }
  }

  removeFromList(index) {
    if (index >= 0) {
      return this.items.splice(index, 1)[0];
    }
  }

  moveUp(index) {
    let myObject = this.items[index];
    if (index > 0) {
      this.items[index] = this.items[index - 1];
      this.items[index - 1] = myObject;
    }
  }

  moveDown(index) {
    let myObject = this.items[index];
    if (index + 1 < this.items.length) {
      this.items[index] = this.items[index + 1];
      this.items[index + 1] = myObject;
    }
  }



  loadJSON(callback) {
    JSON._load(this.jsonName)
      .then((data) => {
        this.addMany(data.items);
        callback(data.items);
      });
  }

  saveJSON() {
    JSON._save(this.jsonName, {
      items: this.items
    });
  }
}
