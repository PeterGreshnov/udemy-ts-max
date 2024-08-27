// S9L122 Drag and drop start

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
  if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateEl = document.getElementById("project-list")! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listID = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listID;
    this.element.querySelector("h2")!.innerText = `${this.type.toUpperCase()}` + " PROJECTS";
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
    this.templateEl = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputEl = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector("#people") as HTMLInputElement;

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
    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
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
      console.log(title, description, people);
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
