// S5L73 Interfaces

// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// const user1: Person = {
//   age: 36,
//   name: "Peter",
//   greet(phrase) {
//     console.log(phrase + " " + this.name);
//   },
// };

// user1.greet("Hi, I'm");

// S5L74 Interfaces with classes
interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  // it is possible to extend interfaces;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n: string | undefined) {
    // same as (n?: string)
    if (n) this.name = n;
  }

  greet(phrase: string): void {
    if (this.name) console.log(`${phrase} ${this.name}`);
    else console.log("HI!");
  }
}

const user1: Greetable = new Person("Peter");
console.log(user1);

// S5L76 Readonly Interface Properties
// user1.name = "Other name"; // that fails due to the `const user1: Greetable` "type";
console.log(user1);

// S5L77 Extending Interfaces - inheritance;

// S5L78 Interfaces as Function Types;

// regular function definition:
type AddFn = (a: number, b: number) => number;

const add: AddFn = (a: number, b: number) => {
  return a + b;
};

console.log(add(3, 4));

// Interface could be used as an alternative to custom type:
interface AddFn2 {
  (a: number, b: number): number;
}

const add2: AddFn2 = (n1: number, n2: number) => {
  return n1 + n2;
};

console.log(add2(4, 4));

// S5L79 Optional Parameters and Propetries
