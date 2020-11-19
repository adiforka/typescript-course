import { Component } from '../components/base-component.js'
import { Autobind } from '../decorators/autobind.js'
import { projectState } from '../state/project-state.js'
import { Validatable, validate } from '../util/validation.js'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInput: HTMLInputElement
	descInput: HTMLInputElement
	pplInput: HTMLInputElement

	constructor() {
		super('project-input', 'app', true, 'user-input')

		this.titleInput = this.element.querySelector('#title') as HTMLInputElement
		this.descInput = this.element.querySelector(
			'#description'
		) as HTMLInputElement
		this.pplInput = this.element.querySelector('#people') as HTMLInputElement
		this.configure()
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler)
	}

	renderContent() {
		// dummy method -- bad practice. this is why inheritnce blows
	}

	private gatherUserInput(): [string, string, number] | void {
		const title = this.titleInput.value
		const desc = this.descInput.value
		const ppl = +this.pplInput.value

		// setup for validation
		const titleValidatable: Validatable = {
			value: title,
			required: true,
			minLen: 2,
			maxLen: 30
		}

		const descValidatable: Validatable = {
			value: desc,
			required: true,
			minLen: 2,
			maxLen: 200
		}

		const pplValidatable: Validatable = {
			value: +ppl,
			required: true,
			minVal: 1,
			maxVal: 5
		}
		// simple validation
		if (
			!(
				validate(titleValidatable) &&
				validate(descValidatable) &&
				validate(pplValidatable)
			)
		) {
			alert('invalid input. try again')
		} else {
			return [title, desc, +ppl]
		}
	}

	@Autobind
	private submitHandler(event: Event) {
		// prevents the form from getting submitted on load
		event.preventDefault()
		const userInput = this.gatherUserInput()
		if (Array.isArray(userInput)) {
			const [title, desc, ppl] = userInput
			projectState.addProject(title, desc, ppl)
			this.clearInputs()
		}
	}

	private clearInputs() {
		this.titleInput.value = ''
		this.descInput.value = ''
		this.pplInput.value = ''
	}
}
