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
