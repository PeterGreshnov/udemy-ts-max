// S9L122 Drag and drop start

enum ProjectStatus {
  Active,
  Finished,
}

// Project class
class Project {
  id: string;
  title: string;
  description: string;
  people: number;
  status: ProjectStatus;

  constructor(id: string, t: string, d: string, p: number, s: ProjectStatus) {
    this.title = t;
    this.description = d;
    this.people = p;
    this.status = s;
    this.id = id;
  }
}

// Project state mangement

type Listener = (items: Project[]) => void;

// Singleton constructor
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
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
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
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

class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    this.templateEl = document.getElementById(
      "project-list",
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

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

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    ) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const projItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = projItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listID = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listID;
    this.element.querySelector("h2")!.innerText =
      `${this.type.toUpperCase()}` + " PROJECTS";
  }

  private attach() {
    this.hostEl.insertAdjacentElement("beforeend", this.element);
  }
}

// S9L123 DOM ELs selection & OOP rendering
class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;

  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    this.templateEl = document.getElementById(
      "project-input",
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputEl = this.element.querySelector(
      "#title",
    ) as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      "#description",
    ) as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      "#people",
    ) as HTMLInputElement;

    console.log(this.titleInputEl, this.descriptionInputEl, this.peopleInputEl);

    this.configure();
    this.attach();
  }

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
      min: 2,
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

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
console.log(projectInput);

// S9L124 Interacting with DOM elements

// S9L126 Fetching user input

// S9L127 Re-usable Validation

// S9L128 Rendering projects list
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");

// S9L129 App State & Singletons

// S9L130 More classes & Custom types

// S9L131 Filtering project with ENUMs
