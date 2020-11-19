// structural typing
type Product = { title: string; price: number; isListed: boolean }

// interface Product {
//   title: string,
//   price: number,
//   isListed: boolean;
// }

function processProduct(product: Product) {
	//
}

processProduct({ title: 'A Book', price: 19.99, isListed: false })

// type definition with union constituent types (switchable)
type User = string | { name: string }

let u: User = 'Michael'
console.log(u)
u = { name: 'Mini' }
console.log(u.name)

