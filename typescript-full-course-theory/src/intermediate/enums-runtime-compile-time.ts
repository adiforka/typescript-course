// enums at runtime are replaced by an actual object with numeric values
enum E {
  X,
  Y,
  Z
}

const f = (a: { X: number }) => {
  return a.X
}

const result = f(E)
console.log(result)

// enums at compile time
// to get a type for all the possible enum values: keyof typeof
enum Temp {
  MILD,
  MODERATE,
  INTENSE,
  EXTREME
}

type TempLogLevels = keyof typeof Temp

function printTempWarning(temp: TempLogLevels, message: string) {
  const num = Temp[temp]
  if (num >= Temp.INTENSE) {
    console.log('temp is: ' + temp)
    console.log('temp indes is: ' + num)
    console.log('message: ' + message)
  }
}

printTempWarning('INTENSE', 'Take cooling precautions')
