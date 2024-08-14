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
