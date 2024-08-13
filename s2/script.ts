// S2L27 Function return types & void

function add(n1: number, n2: number) {
  return n1 + n2;
}

add(1, 2);

// void - used when there is no "return;" statement;
function printResult(num: number): void {
  // if we need return type "undefined" - then there should be a "return;" statement;
  console.log(`Result: ${num}`);
}

printResult(add(1, 2));

// S2L28 Functions as types;

// That is a very generic type - Function - nothging is known about args or return type
// let combineValues: Function;

// This is a specific function type (no need to match parameters names):
const combineValues: (a: number, b: number) => number = add;

// combineValues = add;
// combineValues = printResult; // that throws an error;
// combineValues = 5; // that is an Error;

console.log(combineValues(8, 8));

// S2L29 Function types and Callbacks;

// here we definning the type of the callback function:
function addAndHandle(n1: number, n2: number, callBackFunction: (num: number) => void) {
  const result = n1 + n2;
  callBackFunction(result);
}

addAndHandle(2, 5, (num) => {
  console.log(`Add And Handle result = ${num}`);
});
