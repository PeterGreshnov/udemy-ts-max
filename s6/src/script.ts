// S56L84 Intersection types

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

// S56L85 Type guards

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
