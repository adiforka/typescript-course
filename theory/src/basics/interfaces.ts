// no trace of interfaces is left in transpiled js code (they're just a safety and code organization feature for compile time)
// our neat type contracts
interface Prod {
	price: string
	name: string
	description: string
	categories: string[]
}

interface Order {
	id: string
	products: Prod[]
	addProduct(product: Prod): this
	calculateTotal(): string
}

// factory functions to implement the interfaces
function createProduct(
	price: string,
	name: string,
	description: string,
	categories: string[]
) {
	return {
		price,
		name,
		description,
		categories
	}
}

function createOrder(id: string) {
	return {
		id,
		products: [],
		addProduct: function (this: Order, p: Prod) {
			this.products.push(p)
			return this
		},
		calculateTotal: function (this: Order) {
			return this.products
				.map((p: Prod) => +p.price)
				.reduce((acc, cur) => acc + cur)
				.toFixed(2)
		}
	}
}

let product1: Prod
let product2: Prod
let order1: Order

product1 = createProduct(
	`19.99`,
	`D'Addario 10-52`,
	`medium gauge guitar strings`,
	[`guitar strings`, `guitar accessories`]
)

product2 = createProduct(
	`2199.99`,
	`Gibson Les Paul Standard`,
	`LP solid body guitar`,
	[`guitars`, `instruments`]
)

order1 = createOrder('231df43-32f4-234f-234f-546tf4345yre')
order1.addProduct(product1).addProduct(product2)

console.log(product1)
console.log(product2)
console.log(order1)
console.log(order1.calculateTotal())
