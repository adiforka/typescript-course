// on instance fields decorators take as args the prototype of the
// object created with that field and the property name
// on static fields decorators takes as args the constructor function
// and the property name
function Log(target: any, propertyName: string | symbol) {
  console.log('property decorator')
  console.log(target, propertyName)
}

// accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('accessor decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// method decorator
function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log('method decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// parameter decorator
function Log4(target: any, methodName: string | symbol, paramPosition: number) {
  console.log('parameter decorator')
  console.log(target)
  console.log(methodName)
  console.log(paramPosition)
}

class Tally {
  @Log
  private static _pattern: string
  @Log
  private _price: number

  constructor(p: number) {
    this._price = p
  }

  static set pattern(pattern: string) {
    Tally._pattern = pattern
  }

  @Log2
  static get pattern() {
    return Tally._pattern
  }

  @Log2
  get price() {
    return this._price
  }

  set price(price: number) {
    if (price > 0) {
      this._price = price
    } else {
      throw new Error('only positive values accepted')
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}
