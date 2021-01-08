import { Project, ProjectStatus } from "../models/project";

export type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, desc: string, people: number) {
    const newProject = new Project(
      Math.floor(Math.random() * 10_000).toString(),
      title,
      desc,
      people,
      ProjectStatus.ACTIVE,
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  // switch project status
  moveProject(projectId: string, newStatus: ProjectStatus) {
    // get searched project obj and change its status
    const project = this.projects.find(p => p.id === projectId);
    // update project status and notify the listeners only if it's different
    // from the new state, i.e. only if there's an actual status change
    // we do this check to make sure we don't re-render an unchanged element
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
