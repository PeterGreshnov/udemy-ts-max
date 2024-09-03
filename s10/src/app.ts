// S9L143 Working with Namespace
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="drag-n-drop-interfaces.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="project-model.ts" />

// S9L122 Drag and drop start
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  // Project state mangement

  type Listener<T> = (items: T[]) => void;

  // base State class
  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // Singleton constructor
  class ProjectState extends State<Project> {
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

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active,
      );
      // {
      //   id: Math.random().toString(),
      //   title,
      //   description,
      //   people: numOfPeople,
      // };

      this.projects.push(newProject);
      this.updateListeners();
    }

    switchProjectStatus(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);

      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  const projectState = ProjectState.getInstance();

  // Validation
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
  }

  // parent project class

  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor(
      templateID: string,
      hostElementID: string,
      insertAtStart: boolean,
      newElementID?: string,
    ) {
      this.templateEl = document.getElementById(
        templateID,
      )! as HTMLTemplateElement;
      this.hostEl = document.getElementById(hostElementID)! as T;

      const importedNode = document.importNode(this.templateEl.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElementID) this.element.id = newElementID;

      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      this.hostEl.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element,
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  class ProjectItem
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

  class ProjectList
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

  // S9L123 DOM ELs selection & OOP rendering
  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputEl = this.element.querySelector(
        "#title",
      ) as HTMLInputElement;
      this.descriptionInputEl = this.element.querySelector(
        "#description",
      ) as HTMLInputElement;
      this.peopleInputEl = this.element.querySelector(
        "#people",
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    renderContent(): void {}

    private getUserInput(): [string, string, number] | void {
      const inputTitle = this.titleInputEl.value;
      const inputDescription = this.descriptionInputEl.value;
      const inputPeople = this.peopleInputEl.value;

      const titleValidatable: Validatable = {
        value: inputTitle,
        required: true,
      };

      const descriptionValidatable: Validatable = {
        value: inputDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: +inputPeople,
        required: true,
        min: 1,
        max: 5,
      };

      // if (inputTitle.trim().length === 0 || inputDescription.trim().length === 0 || inputPeople.trim().length === 0) {
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        // throw new Error("Invalid Inputs");
        alert("Invalid Input, pls try again!");
        return;
      } else {
        return [inputTitle, inputDescription, +inputPeople];
      }
    }

    private clearInputs() {
      this.titleInputEl.value = "";
      this.descriptionInputEl.value = "";
      this.peopleInputEl.value = "";
    }

    private submitHandler(e: Event) {
      e.preventDefault();
      console.log("FORM SUBMITTED!");
      const userInput = this.getUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }

  new ProjectInput();

  // S9L124 Interacting with DOM elements

  // S9L126 Fetching user input

  // S9L127 Re-usable Validation

  // S9L128 Rendering projects list
  new ProjectList("active");
  new ProjectList("finished");

  // S9L129 App State & Singletons

  // S9L130 More classes & Custom types

  // S9L131 Filtering project with ENUMs

  // S9L132 Adding inheritance & generics

  // S9L133 Rendering project Items with a Class

  // S9L134 Using a Getter

  // S9L135 Using interfaces for Drag N Drop

  // S9L136 Drag Events & Current State

  // S9L137 Adding a droppable area

  // S9L138 Finishing drag n drop
}
