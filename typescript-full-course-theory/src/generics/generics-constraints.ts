// TYPE CONSTRAINTS ON GENERICS
// custom generic function with constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

// requires sth that extends type object
// const merged = merge({ name: 'billy', age: 35 }, 34)
const merged = merge({ name: "billy", age: 35 }, { id: 34 });
console.log(merged);

// I'm just interested that the obj/value passed to the fun has a length prop of type number
interface Len {
  length: number;
}

function countAndDescribe<T extends Len>(elem: T) {
  let descriptionText = "no value received";
  if (elem.length > 0) descriptionText = `Received ${elem.length} elements`;
  return [elem, descriptionText];
}

console.log(countAndDescribe("something here"));
console.log(countAndDescribe(["one", "two", "three"]));

// keyof
function extractAndConvert<T extends object, K extends keyof T>(
  obj: T,
  key: K,
) {
  // we return the value for the key on the object
  return `Value: ${obj[key]}`;
}

const jimmysAge = extractAndConvert({ name: "jimmy", age: 35 }, "age");
console.log(jimmysAge);
