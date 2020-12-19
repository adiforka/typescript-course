// i don't know the NAMES of properties beforehand or their NUMBER, but I can be sure, for instance, that they'll be expressed as string values, and then can separately set the type of the values they store / objects they reference / these are index signature parameters

interface ErrorHolder {
  [key: string]: string | {}
}

const errorCol: ErrorHolder = {
  email: 'malformatted email adddress',
  username: 'username must start with an alphabetic character'
}
