// Webpack looks for file ext itself, so removing all the .js from improts
import { ProjectInput } from './components/project-input'
import { ProjectList } from './components/project-list'

new ProjectInput()
new ProjectList('active')
new ProjectList('completed')
console.log('SUP')
