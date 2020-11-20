export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
			this.element.id = rendElId
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
