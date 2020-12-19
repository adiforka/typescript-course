// generic types lock in a type: when you instantiate it, you specify it to the exact type you want

// union types say that at instantiation/call type we can still have a union of different types present, so we don't know which one we're getting and we need to be ready for all of them. we get more flexibility, but need to have code robust enough to handle them all.

type NumStrTuple = [string, number]

// an array of NumStrTuples
const tuples: Array<NumStrTuple> = []
tuples.push(['kevin', 23])
tuples.push(['jackson', 66])
tuples.push(['brosef', 235])
tuples.push(['malone', 342])
console.log(tuples)

// generic promise
const prom: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => resolve('this has been resolved'), 1000)
  setTimeout(() => reject('error error error'), 1000)
})

prom.then(res => console.log(res))
