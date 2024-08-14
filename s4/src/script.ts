// S4L50 let and const

// S4L51 Arrow functions
const add = (a: number, b: number) => a + b;
console.log(add(3, 5));

const printOutput: (a: string | number) => void = output => console.log(output);

printOutput(add(3, 4));

const btn = document.querySelector("button");

if (btn) {
  btn.addEventListener("click", event => {
    console.log("clicked !!!", event);
  });
}

// S4L52 Default Function parameters

const addWithDefault = (a: number, b: number = 2) => a + b;

printOutput(addWithDefault(3));

// S4L52 The Spread Operator (...)

const hobbies = ["sports", "cooking"];
const activeHobbies = ["hiking"];

// activeHobbies.push(hobbies); // doesn't work as expected
// activeHobbies.push(hobbies[0], hobbies[1]); // to long

activeHobbies.push(...hobbies);
console.log(activeHobbies);

const otherHobbies = ["gaming", ...hobbies];
console.log(otherHobbies);

const person = {
  name: "peter",
  age: 36,
};

// const personCopyWrong = person; // that would not "copy" the object, but copy the pointer;

const personCopy = { ...person };

person.age = 37;

console.log(person);
console.log(personCopy);

// S4L53 Rest parameters

const addWithRest = (...numbers: number[]) =>
  numbers.reduce((curRes, curValue) => {
    return curRes + curValue;
  }, 0);
console.log(addWithRest(1, 2));
console.log(addWithRest(1, 2, 5, 10));
