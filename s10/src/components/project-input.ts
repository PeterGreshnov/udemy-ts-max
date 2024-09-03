// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  export // S9L123 DOM ELs selection & OOP rendering
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
}
