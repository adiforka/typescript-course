// no return inferred to void
function printRes(res: string) {}

// a return statement with no value still inferred to void but does not throw error
// when explicitly stated as undefined (can return undefined explicitly too, but
// really, why, ever)
function printRes2(res: string): undefined {
  return;
}

// functions as types
function add(n1: number, n2: number) {
  return n1 + n2;
}
let combineVals: (a: number, b: number) => number = add;

// callback stuff typed (we might still pass a cb that returns something, but we
// make it clear here that we're not interested in using any such value)
function addAndHandle(n1: number, n2: number, cb: (n3: number) => void) {
  const res = n1 + n2;
  cb(res);
}

addAndHandle(666, 666, (num: number) => {
  console.log(`That's doubled now: ${num}`);
  // this return value will not be used
  return num;
});
