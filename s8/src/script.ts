// S8L106 Class decorators

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

function LoggerFactory(logString: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return function (constructor: new () => Person) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @Logger // class decorators are executed when the class is defined, not when it is instasiated;
// @LoggerFactory("LOGGGING _ PERSON")
@WithTemplate("<h1>MY PERSON OBJECT</h1>", "app")
class Person {
  name = "Peter";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// S8L107 Decorator Factories

// S8L108 More useful Decorators
