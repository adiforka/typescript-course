// this used to implement the fluent API pattern (method call chaining)
class Calculator {
  constructor(protected value = 0) {}

  currentValue() {
    return this.value;
  }

  add(operand: number) {
    this.value += operand;
    return this;
  }

  subtract(operand: number) {
    this.value -= operand;
    return this;
  }

  multiply(operand: number) {
    this.value *= operand;
    return this;
  }

  divide(operand: number) {
    this.value /= operand;
    return this;
  }
}

class ScientificCalculator extends Calculator {
  constructor(value = 0) {
    super(value);
  }
  sin() {
    this.value = Math.sin(this.value);
    return this;
  }

  cos() {
    this.value = Math.cos(this.value);
    return this;
  }
}

console.log(
  new Calculator(23).add(2).subtract(23).multiply(3).divide(2).currentValue(),
);

console.log(
  +new ScientificCalculator(4).add(2).sin().currentValue().toFixed(2),
);
