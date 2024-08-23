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

// @Logger // class decorators are executed when the class is defined, not when it is instasiated;
@LoggerFactory("LOGGGING _ PERSON")
class Person {
  name = "Peter";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// S8L107 Decorator Factories
