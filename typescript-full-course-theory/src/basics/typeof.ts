// typeof type guard return vals: 'undefined', 'string', 'number', 'bigint' 'boolean', 'object', 'symbol', 'function'
type TypeofTuple = [any, string]

const vals: TypeofTuple[] = [
  [undefined, typeof undefined],
  ['sacrifice', typeof 'sacrifice'],
  [3, typeof 3],
  [345345345345345n, typeof 345345345345345n],
  [true, typeof true],
  [{}, typeof {}],
  [Symbol('jimmy'), typeof Symbol('jimmy')],
  [Math.abs, typeof Math.abs]
]

console.table(vals)
