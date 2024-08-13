// S2L23 - Union type

function combine(input1: number | string | boolean, input2: number | string) {
  let result: number | string;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    // result = JSON.stringify(input1).toString() + JSON.stringify(input2).toString();
    // result = JSON.stringify(input1) + JSON.stringify(input2);
    result = input1.toString() + input2.toString();
  }
  return result;
}

console.log(combine(1, 2));
console.log(combine("Peter", "Kate"));
console.log(combine(true, "Kate"));
