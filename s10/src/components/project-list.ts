/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="base-component.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-n-drop.ts" />
/// <reference path="../models/project.ts" />

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DropTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();

      this.renderContent();
    }

    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    dropHandler(event: DragEvent): void {
      console.log("Drop Event");
      const projectId = event.dataTransfer!.getData("text/plain");

      projectState.switchProjectStatus(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished,
      );
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    dragLeaveHandler(_event: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure(): void {
      this.element.addEventListener(
        "dragover",
        this.dragOverHandler.bind(this),
      );
      this.element.addEventListener("drop", this.dropHandler.bind(this));
      this.element.addEventListener(
        "dragleave",
        this.dragLeaveHandler.bind(this),
      );
      projectState.addListener((projects: Project[]) => {
        const filteredProjects = projects.filter((prj, _i, _arr) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          } else {
            return prj.status === ProjectStatus.Finished;
          }
        });

        this.assignedProjects = filteredProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listID = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listID;
      this.element.querySelector("h2")!.innerText =
        `${this.type.toUpperCase()}` + " PROJECTS";
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`,
      ) as HTMLUListElement;
      listEl.innerHTML = "";
      for (const projItem of this.assignedProjects) {
        // const listItem = document.createElement("li");
        // listItem.textContent = projItem.title;
        // listEl.appendChild(listItem);
        new ProjectItem(this.element.querySelector("ul")!.id, projItem);
      }
    }
  }
}
