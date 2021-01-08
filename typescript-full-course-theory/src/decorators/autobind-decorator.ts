// not all decorator return values are respected. those that are:
// method and accessor decorators

// autobind decorator
function Autobind(
  // unused params. make ts happy
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const moddedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // getter here is having a value with some extra work possible to
    // do before actually returning the value
    get() {
      const boundMethod = originalMethod.bind(this);
      return boundMethod;
    },
  };
  return moddedDescriptor;
}

class Printer {
  message = "this works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const btn = document.querySelector("button")!;
btn.addEventListener("click", printer.showMessage);
