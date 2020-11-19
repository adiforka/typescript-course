namespace App {
  export class ProjectItem
		extends BaseComponent<HTMLUListElement, HTMLLIElement>
		implements Draggable {
		private project: Project

		constructor(hostId: string, project: Project) {
			super('single-project', hostId, false, project.id)
			this.project = project

			this.configure()
			this.renderContent()
		}

		get personsText() {
			const p = this.project.people
			return p !== 1 ? `${p} people` : `1 person`
		}

		@Autobind
		dragStartHandler(e: DragEvent): void {
			e.dataTransfer?.setData('text/plain', this.project.id)
			// this says we're moving the object, not copying it
			e.dataTransfer!.effectAllowed = 'move'
		}

		dragEndHandler(_: DragEvent): void {
			console.log('Drag Ended')
		}

		configure(): void {
			this.element.addEventListener('dragstart', this.dragStartHandler)
			this.element.addEventListener('dragend', this.dragEndHandler)
		}

		renderContent(): void {
			this.element.querySelector('h2')!.textContent = this.project.title
			this.element.querySelector('h3')!.textContent =
				this.personsText + ' assigned'
			this.element.querySelector('p')!.textContent = this.project.description
		}
	}
}