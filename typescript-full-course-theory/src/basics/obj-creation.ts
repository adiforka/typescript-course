// factory function: flexible, the default choice
function dept(name: string, staff: number, active: boolean) {
	return {
		name,
		staff,
		active,
		getDeptInfo() {
			return `Dept summary == ${name} department, staff: ${staff}, active: ${active}`
		}
	}
}

// an interface defining Dept for the constructor function and class
type Dept = {
	name: string
	staff: number
	active: boolean
	getDeptInfo: () => string
}

// constructor function (fast, a bit more complex)
function DeptCtor(this: Dept, name: string, staff: number, active: boolean) {
	this.name = name
	this.staff = staff
	this.active = active
	this.getDeptInfo = () => {
		return `Dept summary == ${this.name} department, staff: ${this.staff}, active: ${this.active}`
	}
}

// ts class
class Deptartment {
	constructor(
		public name: string,
		public staff: number,
		public active: boolean
	) {}

	getDeptInfo() {
		return `Dept summary == ${this.name} department, staff: ${this.staff}, active: ${this.active}`
	}
}

const customerServiceFromFactoryFunc = dept('customer service', 234, true)
console.log(customerServiceFromFactoryFunc.getDeptInfo())

const customerServiceFromCtor = new DeptCtor('customer service', 234, true)
console.log(customerServiceFromCtor.getDeptInfo())

const customerServiceFromClass = new Deptartment('customer service', 234, true)
console.log(customerServiceFromClass.getDeptInfo())
