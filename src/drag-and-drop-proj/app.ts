enum ProjectStatus {
	ACTIVE,
	COMPLETED
}

class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}

// Project state management
type Listener<T> = (items: T[]) => void
// some inheritance overkill
class State<T> {
	protected listeners: Listener<T>[] = []

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn)
	}
}

// using a singleton to manage application state
class ProjectState extends State<Project> {
	private projects: Project[] = []
	private static instance: ProjectState

	private constructor() {
		super()
	}

	static getInstance() {
		if (this.instance) {
			return this.instance
		} else {
			this.instance = new ProjectState()
			return this.instance
		}
	}

	addProject(title: string, desc: string, people: number) {
		const newProject = new Project(
			Math.floor(Math.random() * 10_000).toString(),
			title,
			desc,
			people,
			ProjectStatus.ACTIVE
		)
		this.projects.push(newProject)
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice())
		}
	}
}

const projectState = ProjectState.getInstance()

// Validation
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

// Component base class
abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
	protected templateElement: HTMLTemplateElement
	protected hostElement: T
	protected element: U

	constructor(
		templateELId: string,
		hostElId: string,
		insertAtStart: boolean,
		rendElId?: string
	) {
		this.templateElement = document.getElementById(
			templateELId
		)! as HTMLTemplateElement
		this.hostElement = document.getElementById(hostElId)! as T

		const importedNode = document.importNode(this.templateElement.content, true)
		this.element = importedNode.firstElementChild as U
		if (rendElId) {
			this.element.id = `${rendElId}-projects`
		}

		this.attach(insertAtStart)
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtBeginning ? 'afterbegin' : 'beforeend',
			this.element
		)
	}

	abstract configure(): void
	abstract renderContent(): void
}

// Project item class
class ProjectItem extends BaseComponent<HTMLUListElement, HTMLLIElement> {
	private project: Project

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id)
		this.project = project

		this.configure()
		this.renderContent()
	}

	configure(): void {}
	renderContent(): void {
		this.element.querySelector('h2')!.textContent = this.project.title
		this.element.querySelector(
			'h3'
		)!.textContent = this.project.people.toString()
		this.element.querySelector('p')!.textContent = this.project.description
	}
}

// Project list class
class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> {
	assignedProjects: Project[]

	constructor(private type: 'active' | 'completed') {
		super('project-list', 'app', false, `${type}-projects`)
		this.assignedProjects = []

		this.configure()
		this.renderContent()
	}

	configure() {
		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((project) => {
				if (this.type === 'active') {
					return project.status === ProjectStatus.ACTIVE
				}
				return project.status === ProjectStatus.COMPLETED
			})
			this.assignedProjects = relevantProjects
			this.renderProjects()
		})
	}

	renderContent() {
		// render header for list
		this.element.querySelector(
			'h2'
		)!.textContent = `${this.type.toUpperCase()} PROJECTS`
		//get list id
		const listId = `${this.type}-projects-list`
		// render list id
		this.element.getElementsByTagName('ul')[0]!.id = listId
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		) as HTMLUListElement
		// clear previously rendered items
		listEl.innerHTML = ''
		for (const project of this.assignedProjects) {
			new ProjectItem(this.element.querySelector('ul')!.id, project)
		}
	}
}

// Project input class
class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
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
				validateInput(titleValidatable) &&
				validateInput(descValidatable) &&
				validateInput(pplValidatable)
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

const projectInput = new ProjectInput()
const activeProjectList = new ProjectList('active')
const completedProjectList = new ProjectList('completed')
