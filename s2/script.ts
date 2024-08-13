// S2l30 Unknown type

let userInput: unknown; // that is a safer type compared to "any";
let userName: string;

userInput = 36;
userInput = "Peter";

console.log(userInput);

// that would work with userInput as any type, but does not work with userInput: unknown type;
// userName = userInput;

// with  unknown type we have to validate the type first before doing something with it:
if (typeof userInput === "string") {
  userName = userInput;
  console.log(userName);
}
