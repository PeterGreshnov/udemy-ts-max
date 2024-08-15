// S5L73 Interfaces

interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

const user1: Person = {
  age: 36,
  name: "Peter",
  greet(phrase) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi, I'm");
