// interfaces can be restated with additional properties, type aliases
// have to compose new type aliases and/or use intersection types
// with interfaces
interface Mammal {
	name: string
}

interface Bear extends Mammal {
	honey: boolean
}

interface Mammal {
	size: string
}

const getBear = (name: string, honey: boolean, size: string) => {
	return { name, honey, size }
}

const bear = getBear('Pooh', true, 'large')
console.log(bear)

// with type alias, using intersection type
type Animal = { name: string }
type Possum = Animal & { house: boolean }

const getPossum = (name: string, house: boolean) => {
	return { name, house }
}

const possum = getPossum('El Possumo', false)
console.log(possum)
