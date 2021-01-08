// UNKNOWN
let userInput: unknown;
let userName: string;

// this is fine
userInput = 5;
userInput = "babosito";

// but this requires an additional type check, since 'unknown' means I don't know
// the type beforehand, but does not disable typechecks from ts
if (typeof userInput === "string") {
  userName = userInput;
}

// NEVER - states explicitly that not even the standard default of undefined
// will be returned (with exceptions or infinite loops. umm practical value?)
function generateError(message: string, code: number): never {
  throw { message, code };
}

console.log(generateError("Runtime Error has occurred", 501));
