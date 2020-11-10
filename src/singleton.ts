// singleton
class Process {
	private static instantiated: boolean
	private static instance: Process

	private constructor() {
		console.log('constructor called')
	}

	static getInstance() {
		if (!Process.instantiated) {
			Process.instance = new Process()
			Process.instantiated = !Process.instantiated
			return this.instance
		} else {
			return Process.instance
		}
	}
}

const processInstance = Process.getInstance() 
const maybeAnotherInstance = Process.getInstance()
// checking for reference identity on variables
console.log(processInstance === maybeAnotherInstance)
// output: references point to the same object on the heap. 
