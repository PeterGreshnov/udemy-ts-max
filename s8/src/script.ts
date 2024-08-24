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
    console.log("Rendering template...");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
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
