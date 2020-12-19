const addTwoNums = (start = 1) => {
  let n = start

  const api = {
    add(inc = 1) {
      n += inc
      return api
    },

    print() {
      console.log(n)
      return api
    }
  }
  return api
}

addTwoNums(2).add(3).print().add(5).print()

// an example using a class (TS playground)
class TwoNumbersAdder {
  n: number
  constructor(n: number) {
    this.n = n
  }

  add(x: number) {
    this.n += x
    return this
  }

  print() {
    console.log(this.n)
    return this
  }
}

new TwoNumbersAdder(4).add(5).print().add(554).print()
