export function Autobind(_: any, _2: string, propDesc: PropertyDescriptor) {
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
