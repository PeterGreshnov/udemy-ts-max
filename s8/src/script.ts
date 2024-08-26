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
  console.log("TEMPLATE FACTORY!");
  return function (originalConstructor: new () => Person) {
    return class extends originalConstructor {
      constructor() {
        super();
        console.log("Rendering template for instance...");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger // class decorators are executed when the class is defined, not when it is instasiated;
@LoggerFactory("LOGGGING _ PERSON") // this one runs 2nd
@WithTemplate("<h1>MY PERSON OBJECT</h1>", "app") // decorator functions are executed bottom to top - this on runs 1st
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

// S8L109 Adding multiple Decorators

// S8L110 Property Decorators

function Log(target: any, propertyName: string | symbol) {
  console.log("Prop decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(`target`, target);
  console.log(`propertyName`, propertyName);
  console.log(`propertyDescriptor`, propertyDescriptor);
}

function Log3(target: any, propertyName: string | symbol, propertyDescriptor: PropertyDescriptor) {
  console.log("METHOD decorator!");
  console.log(`target`, target);
  console.log(`propertyName`, propertyName);
  console.log(`propertyDescriptor`, propertyDescriptor);
}

function Log4(target: any, propertyName: string | symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(`target`, target);
  console.log(`propertyName`, propertyName);
  console.log(`position`, position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  set price(val: number) {
    if (val > 0) this._price = val;
    else {
      throw new Error("Price should be positive");
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// S8L111 Accessor & Parameter Decorators

// S8L112 When Do Decorators Execute?

// they all executed when defining a class, not when creating an instance;
const p1 = new Product("book", 19);
const p2 = new Product("another book", 29);

// S8L113 Returning and changing a Class in a Class Decorator

// S8L115 Creating an autobind decorator

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this); // this will be the original this of the method
      return boundFn;
    },
  };
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const btn = document.querySelector("button")!; /*  */
btn.addEventListener("click", printer.showMessage.bind(printer));
