// function type defined in an interface
interface UpperCaseFn {
  (s: string): string
}

let fn: UpperCaseFn
fn = (s: string) => s.toUpperCase()

// optional fields
interface Int {
  designation?: string
  describe: () => string
}

class IntImpl implements Int {
  designation?: string
  // default value for optional field (makes it optional, too,
  // and helps implement the interface contract)
  constructor(designation = 'N/A') {
    this.designation = designation
  }

  describe() {
    return `IntImpl: ${this.designation}`
  }
}

const instance: Int = new IntImpl()
console.log(instance.designation)
