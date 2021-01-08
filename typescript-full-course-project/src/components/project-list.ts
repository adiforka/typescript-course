import { Component } from "../components/base-component";
import { DragTarget } from "../models/drag-drop";
import { Autobind } from "../decorators/autobind";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { ProjectItem } from "../components/project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "completed") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(e: DragEvent): void {
    if (e.dataTransfer && e.dataTransfer?.types[0] === "text/plain") {
      // the default is no drop is allowed
      e.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl?.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(e: DragEvent): void {
    const projectId = e.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.ACTIVE : ProjectStatus.COMPLETED,
    );
  }

  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === "active") {
          return project.status === ProjectStatus.ACTIVE;
        }
        return project.status === ProjectStatus.COMPLETED;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2",
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    console.log(this.element.querySelector("ul")!.id);
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    ) as HTMLUListElement;
    // clear previously rendered items
    listEl.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }
}
