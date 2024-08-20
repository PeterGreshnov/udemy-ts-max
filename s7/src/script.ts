// S7L94 Generics Intro

// S7L95 Built-in Generics
const names = ["Peter", "Kate"]; // array of strings - combination;
console.log(names);

const lastNames: Array<string> = []; // generic Array type - same as "string[]";
console.log(lastNames);

const promise: Promise<number> = new Promise((res, _rej) => {
  setTimeout(() => {
    res(10);
  }, 2000);
});

promise.then(data => {
  console.log(data);
});
