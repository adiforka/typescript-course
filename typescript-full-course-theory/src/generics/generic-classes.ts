// this will be good only for primitive types since in JS/TS the notion of logical equality for objects is umm not there, so we'd need to check for ids or some other unique prop on an obj to simulate logical equality

type Primitive = string | number | boolean | bigint

class Store<T extends Primitive> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  // defensive
  getItems() {
    return [...this.data]
  }
}

const store1 = new Store<string>()
store1.addItem('boogie')
store1.addItem('mesa')
store1.addItem('kramer')
store1.removeItem('boogie')
console.log(store1.getItems())
