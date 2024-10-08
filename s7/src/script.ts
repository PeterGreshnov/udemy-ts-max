// S7L94 Generics Intro

// S7L95 Built-in Generics
// const names = ["Peter", "Kate"]; // array of strings - combination;
// console.log(names);

// const lastNames: Array<string> = []; // generic Array type - same as "string[]";
// console.log(lastNames);

// const promise: Promise<number> = new Promise((res, _rej) => {
//   setTimeout(() => {
//     res(10);
//   }, 2000);
// });

// promise.then(data => {
//   console.log(data);
// });

// S7L96 Generic function

function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// console.log(merge({ name: "Peter" }, { age: 36 }));
const mergedObj = merge({ name: "Peter", hobbies: ["guitar"] }, { age: 36 });
const mergedObj2 = merge<{ name: string; hobbies: string[] }, { age: number }>( // that is redundant
  { name: "Peter", hobbies: ["guitar"] },
  { age: 36 },
);

console.log(mergedObj.name); // can't access name \ age when not using generic function with <T, U>
console.log(mergedObj);
console.log(mergedObj2);

// S7L97 Working with Type constrains

const mergedObj3 = merge({ name: "Peter", hobbies: ["guitar"] }, 36);
console.log(mergedObj3); // 36 is not in the object;
// type constrains are applied with "extends"

function mergeWConstr<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const mergedObj4 = mergeWConstr({ name: "Peter" }, 25); // with constrain ("extends object") that doesn't work
const mergedObj4 = mergeWConstr({ name: "Peter" }, { age: 25 });
console.log(mergedObj4);

// S7L98 Another Generic Function

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
  let description = "Got no value";
  if (el.length === 1) {
    description = `Got 1 element.`;
  } else if (el.length > 0) {
    description = `Got ${el.length} elements.`;
  }
  return [el, description];
}
console.log(countAndDescribe([1]));
console.log(countAndDescribe([1, 2]));
console.log(countAndDescribe("Hello there!"));
console.log(countAndDescribe(["Guitar", "Cooking"]));
// console.log(countAndDescribe(1)); // doesn't work because of the constraint

// S7L99 The keyof Constraint

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "abc" }, "name"));

// S7L100 Generic Classes

class DataStorage<T> {
  // additional constraint may be applied by adding <T extends string | number | boolean>
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Peter");
textStorage.addItem("Kate");
textStorage.removeItem("Peter");
console.log(textStorage.getItems());
// textStorage.addItem(19); // that doesn't work due to type set earlier;

const numberStorage = new DataStorage<number>(); // union type is also allowed;
numberStorage.addItem(10);

const objStorage = new DataStorage<object>();
objStorage.addItem({ name: "Peter" });
objStorage.addItem({ name: "Kate" });
// ...
objStorage.removeItem({ name: "Peter" });
console.log(objStorage.getItems());

// S7L102 Generic Utility Types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// Partial Utility type
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  // return { title, description, completeUntil: date }; // that is the most straightforward
  // let CourseGoal: CourseGoal = {}; // that produces an error (error TS2739: Type '{}' is missing the following properties from type 'CourseGoal': title, description, completeUntil)
  const CourseGoal: Partial<CourseGoal> = {}; // that works
  CourseGoal.title = title;
  CourseGoal.description = description;
  CourseGoal.completeUntil = date;
  return CourseGoal as CourseGoal;
}

// Readonly Utility type
const names: Readonly<string[]> = ["Peter", "Kate"];
// names.push("Lidiia"); // error
console.log(names);
