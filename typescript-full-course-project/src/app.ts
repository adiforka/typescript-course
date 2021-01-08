// Webpack looks for file ext itself, so removing all the .js from improts
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import _ from "lodash";

const list = [2, 3, 4, 5, 6];
console.log(_.shuffle(list));

new ProjectInput();
new ProjectList("active");
new ProjectList("completed");
