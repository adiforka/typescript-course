// the validator stores all the names of the properties on which
// validator decorators are found, and thus which need to be decorated
// and the validator types and their optonal additional parameters
// the object, then, takes the form of name - value pairs. the names
// are props of the object under validation, each value is an array
// of tuples, each tuple containing the name o the validator and the
// user-defined params for the validation
const validatorConfig: { [prop: string]: [string, any][] } = {}

const addValidator = (prop: string, validatorTypeAndParams: [string, any]) => {
  validatorConfig[prop] = validatorConfig[prop]
    ? [...validatorConfig[prop], validatorTypeAndParams]
    : [validatorTypeAndParams]
}
function Required() {
  return (_: any, prop: string) => addValidator(prop, ['required', ''])
}

function MaxLength(maxLength = 15) {
  return (_: any, prop: string) => addValidator(prop, ['maxLength', maxLength])
}

function Positive() {
  return (_: any, prop: string) => addValidator(prop, ['positive', ''])
}

const validate = (obj: any) =>
  Object.entries(validatorConfig).every(([prop, typesAndParams]) =>
    typesAndParams.every(
      (validatorTypeAndParams: [string, any]) =>
        (validatorTypeAndParams[0] === 'required' && obj[prop]) ||
        (validatorTypeAndParams[0] === 'positive' && obj[prop] > 0) ||
        (validatorTypeAndParams[0] === 'maxLength' &&
          obj[prop].length < validatorTypeAndParams[1])
    )
  )

class Course {
  @Required() @MaxLength(15) title: string
  @Positive() price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

// assumed html
const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('Invalid course info. Please try again')
    return
  }
  console.log(createdCourse)
})
