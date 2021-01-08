// interfaces can be restated with additional properties, type aliases
// have to compose new type aliases and/or use intersection types
// with interfaces
interface Mammal {
  name: string;
}

interface Bear extends Mammal {
  honey: boolean;
}

interface Mammal {
  size: string;
}

const getBear = (name: string, honey: boolean, size: string) => {
  return { name, honey, size };
};

const bear = getBear("Pooh", true, "large");
console.log(bear);

// with type alias, using intersection type
type Animal = { name: string };
type Possum = Animal & { house: boolean };

const getPossum = (name: string, house: boolean) => {
  return { name, house };
};

const possum = getPossum("El Possumo", false);
console.log(possum);

// since interfaces better implement the O in SOLID, ts recommends using them when possible. If, however, we need sth we cannot express easily with an interface, like we need to define a tuple or union type, type aliases are there

// type aliases able to represent unions of primitive types, interfaces good for modelling class strutctures for objects
type TU = string | boolean;

interface IU {
  readonly name: string;
  readonly married: boolean;
}
