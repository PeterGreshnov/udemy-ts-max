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

interface Greetable {
  name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

const user1 = new Person("Peter");
console.log(user1);
