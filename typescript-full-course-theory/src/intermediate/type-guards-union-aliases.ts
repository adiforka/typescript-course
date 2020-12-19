type Fish = { swim: () => void }
type Bird = { fly: () => void }
type Pet = Fish | Bird

// using casting and checking undefinedness of prop
function usePet1(pet: Pet) {
  let fishPet = pet as Fish
  let birdPet = pet as Bird
  if (fishPet.swim) fishPet.swim()
  else if (birdPet.fly) birdPet.fly
}

// using 'in' operatior
function usePet2(pet: Pet) {
  if ('swim' in pet) pet.swim()
  else pet.fly()
}

// using own type checking function (type predicate)
function isFish(pet: Pet): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function usePet3(pet: Pet) {
  if (isFish(pet)) pet.swim()
  else pet.fly()
}

const obj1: Pet = { swim: () => console.log('swimming') }
const obj2: Pet = { fly: () => console.log('flying') }

usePet1(obj1)
usePet1(obj2)
usePet2(obj1)
usePet2(obj2)
usePet3(obj1)
usePet3(obj2)
