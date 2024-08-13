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
// S2l31 Never type
// never - is another type functions can return:
// this function does not reaches its end - it crashes on "throw"
// thus it DOES NOT RETURN ANYTHING EVER!
// it does not even return "undefined";
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
var result = generateError("Some error", 405);
console.log(result);
