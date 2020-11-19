namespace App {
	export type Validatable = {
		value: string | number
		required: boolean
		maxLen?: number
		minLen?: number
		maxVal?: number
		minVal?: number
	}

	export function validate(input: Validatable) {
		if (input.required && input.value.toString().trim().length === 0)
			return false

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
}
