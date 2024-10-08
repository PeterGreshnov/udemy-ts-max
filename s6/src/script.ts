// S6L84 Intersection types

type Admin = {
  name: string;
  priveleges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // in case of object-types - this works as a combination;

/** Same as above might had be been achieved with interfaces
 *
 * interface Admin {}
 * interface Employee {}
 * interface ElevatedEmployee extends Admin, Employee {}
 *
 * */

const e1: ElevatedEmployee = {
  name: "Peter",
  priveleges: ["create-server"],
  startDate: new Date(),
};

console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // here in case of union types - it works as INTERSECTION - not UNION:

// const uni: Universal = true; // error
const uni: Universal = 10; // ok
console.log(uni);

// S6L85 Type guards

function add(a: Combinable, b: Combinable) {
  //1. type-guard using "typeof":
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add(1, 3));

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);

  //2. Checking if obj has a property
  // console.log(`Privs: ${emp.priveleges}`); //  error without a type-guard;
  if ("priveleges" in emp) console.log(`Privs: ${emp.priveleges}`);
  if ("startDate" in emp) console.log(`Start Date: ${emp.startDate}`);
}

printEmployeeInfo(e1);
printEmployeeInfo({ name: "John", startDate: new Date() });

// 3. "instanceof" type guard

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ... ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // option 1:
  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(12);
  }

  // option 2:
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(23);
  }
}

useVehicle(v1);
useVehicle(v2);

// S6L86 Discriminated Union

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // this can work but is cumbersome when having multiple new types added:
  // if ("flyingSpeed" in animal) {
  //   console.log(`Moving with speed: ${animal.flyingSpeed}`);
  // }

  let speed;
  switch (animal.type) {
    case "bird":
      console.log(`Flying with speed: ${animal.flyingSpeed}`);
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      console.log(`Running with speed: ${animal.runningSpeed}`);
      break;
    default:
      console.log("Unknown animal type");
      break;
  }
  console.log(`___ moving with speed: ${speed}`);
}

const anim1: Bird = {
  type: "bird",
  flyingSpeed: 30,
};

const anim2: Horse = {
  type: "horse",
  runningSpeed: 40,
};

moveAnimal(anim1);
moveAnimal(anim2);

// S6L87 Type Casting

const paragraph = document.querySelector("p"); // type is HTMLParagraphElement | null

const parOutput = document.getElementById("message-output"); // this is of general  HTMLElement | null type

// Two options of typecasting
// 1:
// const inpt = <HTMLInputElement>document.getElementById("user-input")!; // by default is HTMLElement | null

//2:
const inpt = document.getElementById("user-input")! as HTMLInputElement; // by default is HTMLElement | null

inpt.value = "Hi there!"; // Property 'value' does not exist on type 'HTMLElement' - without typecasting

// Alternative to using "!" (non null\undefined):
const inpt2 = document.getElementById("user-input");

if (inpt2) {
  (inpt2 as HTMLInputElement).value = "Another HI!";
}

// S6L88 Index Properties

// Describing an interface without knowing the exact keys and the number of these keys
interface ErrorContainer {
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a vaild email",
  username: "Must start with a character",
};

console.log(errorBag);

// S6L89 Function overloads

// reworking the "add" function from above:
function newAdd(a: number, b: string): string;
function newAdd(a: string, b: number): string;
function newAdd(a: string, b: string): string;
function newAdd(a: number, b: number): number;
function newAdd(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const res = newAdd(1, 2);
console.log(res.toPrecision(3));

const fullName = newAdd("Peter", " Greshnov");
console.log(fullName.toUpperCase());

// S6L90 Optional Chaining

const fetchedUserData = {
  id: "u1",
  name: "Peter",
  job: {
    title: "CEO",
    description: "My Company",
  },
};

console.log(fetchedUserData.job.description);

// if "job" might not exist - vanilla JS way of getting around is:
console.log(fetchedUserData.job && fetchedUserData.job.title);

// TS way of hanling - optional chaining:
console.log(fetchedUserData?.job?.title);

// S6L91 Nullish Coalescing

// some value might be null OR undefined OR valid value, for example:

const userInput = 0; // fetching from DOM for example;
console.log(`userinput = ${userInput}`);

const storedData = userInput || "DEFAULT"; // replaces ALL nullish values with DEFAULT
console.log(`short circut value: ${storedData}`);

// It is possible to replace ONLY when null OR undefined:
const data2 = userInput ?? "NULL or Undefined";
console.log(`nullish coalescing value: ${data2}`);
