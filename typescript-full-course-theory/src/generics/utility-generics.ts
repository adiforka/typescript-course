// PARTIAL
type CourseGoal = {
  title: string
  desc: string
  completeUntil: Date
}

function createCourseGoal(
  title: string,
  desc: string,
  completeUntil: Date
): CourseGoal {
  // partial lets me get away with using an object for a type even though I don't yet have all the props expected by that type
  // partial wraps an object with the same properties as the original but makes all of them optional
  let goal: Partial<CourseGoal> = {}
  goal.title = title
  goal.desc = desc
  goal.completeUntil = completeUntil
  // cast to target type to return it
  return goal as CourseGoal
}

// maybe we want to switch a prop to be optional temporarily: wrap in a partial

// READONLY
const colors: Readonly<string[]> = ['black', 'green', 'blue']
// colors.push('white')
// colors.shift()

type NameType = { name: string }
const obj: Readonly<NameType> = { name: 'Steve' }
// obj.name = 'Steven'

// PICK
// RECORD
// OMIT
// EXCLUDE
// EXTRACT
// NONNULLABLE
// PARAMETERS
// CONSTRUCTORPARAMETERS
// RETURNTYPE
// INSTANCETYPE
// REQUIRED
// THISPARAMETERTYPE
// OMITTHISPARAMETER
// THISTYPE
