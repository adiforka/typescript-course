// getting rid of null
function check(param: string | null) {
  if (param === null) return 'default'
  else return param
}

function checkNullish(param: string | null) {
  return param ?? 'default'
}

// type assertion when compiler cannot determine type
const button = document.getElementById('big-button')!
button.addEventListener('click', function () {
  console.log(this.textContent)
})
