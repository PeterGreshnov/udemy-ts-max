// S2l30 Unknown type
var userInput; // that is a safer type compared to "any";
var userName;
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
