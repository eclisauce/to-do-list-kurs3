class Base {

  add(item){
    this.items.push(item);
    return this.items;
  }

  removeFromList(index){
      if(index >=0){
        return this.items.splice(index, 1)[0];
      }
    }

  moveUp(index){
    let myObject = this.items[index];
    if (index > 0){
      this.items[index] = this.items[index - 1];
      this.items[index - 1] = myObject;
    }
  }

  moveDown(index){
    let myObject = this.items[index];
    if(index + 1 < this.items.length){
      this.items[index] = this.items[index + 1];
      this.items[index + 1] = myObject;
    }
  }



























}
