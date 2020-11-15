type Validatable = {
	value: string | number
	required: boolean
	maxLen?: number
	minLen?: number
	maxVal?: number
	minVal?: number
}

function validateInput(input: Validatable) {
	if (input.required && input.value.toString().trim().length === 0) return false

	if (input.minLen && typeof input.value === 'string') {
		if (input.value.toString().trim().length < input.minLen) return false
	}

	if (input.maxLen && typeof input.value === 'string') {
		if (input.value.toString().trim().length > input.maxLen) return false
	}

	if (input.minVal && typeof input.value === 'number') {
		if (input.value < input.minVal) return false
	}

	if (input.maxVal && typeof input.value === 'number') {
		if (input.value > input.maxVal) return false
	}
	return true
}

function Autobind(_: any, _2: string, propDesc: PropertyDescriptor) {
	const origMeth = propDesc.value
	const moddedDesc: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get: function () {
			const boundMeth = origMeth.bind(this)
			return boundMeth
		}
	}
	return moddedDesc
}

class ProjectInput {
	templateElement: HTMLTemplateElement
	hostElement: HTMLDivElement
	element: HTMLFormElement
	titleInput: HTMLInputElement
	descInput: HTMLInputElement
	pplInput: HTMLInputElement

	constructor() {
		// selection logic in the construtor
		this.templateElement = <HTMLTemplateElement>(
			document.getElementById('project-input')!
		)
		this.hostElement = <HTMLDivElement>document.getElementById('app')!
		const importedNode = document.importNode(this.templateElement.content, true)
		this.element = importedNode.firstElementChild as HTMLFormElement
		this.element.id = 'user-input'

		this.titleInput = this.element.querySelector('#title') as HTMLInputElement
		this.descInput = this.element.querySelector(
			'#description'
		) as HTMLInputElement
		this.pplInput = this.element.querySelector('#people') as HTMLInputElement
		this.config()
		this.attach()
	}

	private config() {
		this.element.addEventListener('submit', this.submitHandler)
	}

	private gatherUserInput(): [string, string, number] | void {
		const title = this.titleInput.value
		const desc = this.descInput.value
		const ppl = +this.pplInput.value

		// setup for validation

		const titleValidatable: Validatable = {
			value: title,
			required: true,
			minLen: 5,
			maxLen: 30
		}

		const descValidatable: Validatable = {
			value: desc,
			required: true,
			minLen: 10,
			maxLen: 200
		}

		const pplValidatable: Validatable = {
			value: ppl,
			required: true,
			minVal: 1,
			maxVal: 5
		}

		// simple validation
		if (
			!(
				validateInput(titleValidatable) &&
				validateInput(descValidatable) &&
				validateInput(pplValidatable)
			)
		) {
			alert('invalid input. try again')
		} else {
			return [title, desc, ppl]
		}
	}

	@Autobind
	private submitHandler(event: Event) {
		// prevents the form from getting submitted on load
		event.preventDefault()
		const userInput = this.gatherUserInput()
		if (Array.isArray(userInput)) {
			const [title, desc, ppl] = userInput
			console.log(title, desc, ppl)
			this.clearInputs()
		}
	}

	private attach() {
		// rendering logic
		this.hostElement.insertAdjacentElement('afterbegin', this.element)
	}

	private clearInputs() {
		this.titleInput.value = ''
		this.descInput.value = ''
		this.pplInput.value = ''
	}
}

new ProjectInput()
