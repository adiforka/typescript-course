function TemplateSetter(template: string, hookId: string) {
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		// a class constructor may return a new constructor based on the
		// original constructor and inheriting its props
		return class extends originalConstructor {
			constructor(..._: any[]) {
				// puting decorator logic in this new, returned constructor
				// now this logic will be executed only when I actually
				// instantiate the Pariah class
				super()
				console.log('inside the template rendering decorator')
				const hookEl = document.getElementById(hookId)
				if (hookEl) {
					hookEl.innerHTML = template
					hookEl.querySelector('h1')!.textContent = this.name
				}
			}
		}
	}
}

// through this decorator we modify the class/constructor we
// oringinally have it put on (decorator returns a modified constructor
// that adds logic to the original after it calls it with super())
@TemplateSetter(`<h1>Warm Welcome</h1>`, `app`)
class Pariah {
	name = 'Steve'
	constructor() {
		console.log('creating a pariah instance')
	}
}

new Pariah()
