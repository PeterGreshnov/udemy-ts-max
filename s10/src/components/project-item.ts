/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="base-component.ts" />
/// <reference path="../models/drag-n-drop.ts" />
/// <reference path="../models/project.ts" />

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      if (this.project.people === 1) return "1 person";
      else return `${this.project.people} persons`;
    }

    constructor(hostID: string, project: Project) {
      super("single-project", hostID, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_event: DragEvent): void {
      console.log("Drag END");
    }

    configure(): void {
      this.element.addEventListener(
        "dragstart",
        this.dragStartHandler.bind(this),
      );
      this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned.";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
