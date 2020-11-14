// decorators on classes are fun (they are functions) when class definitions
// are run in the code. we don't need to instantiate the class in question.

// decorators are tied to constructor functions (over which classes provide
// syntactic sugar) -- the decorator gets the constructor function definition
// as an argument

// here wrapping the decorator function in a function that'll return it and itself
// can take an arg that'll be usable inside the decorator

function Logger(logString: string) {
	return function (target: Function) {
		console.log(logString)
		console.log(`running logger decorator`)
	}
}

// Angular-ish
function WithTemplate(template: string, hookId: string) {
  // this tells ts we know we need to provide and argument, but we won't be using it, so it won't bug us about not using it
	return function (_: Function) {
    console.log(`running with template decorator`)
		const hookEl = document.getElementById(hookId)
		if (hookEl) {
			hookEl.innerHTML = template
		}
	}
}

// the order in which decorators on a class execute is bottom-up
// even though the decorator factory functions that return the
// decorators for us execute in the order in which they're called
@WithTemplate('<h1>My Dude</h1>', 'app')
@Logger('logging dude')
class Dude {
	constructor(private name: string) {}
}

const dude = new Dude('Jeff')
console.log(dude)
