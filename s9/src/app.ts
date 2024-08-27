// S9L122 Drag and drop start

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

  private submitHandler(e: Event) {
    e.preventDefault();
    console.log("FORM SUBMITTED!");
    console.log(this.titleInputEl.value);
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
