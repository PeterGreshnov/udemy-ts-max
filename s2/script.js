// S2L27 Function return types & void
function add(n1, n2) {
    return n1 + n2;
}
add(1, 2);
// void - used when there is no "return;" statement;
function printResult(num) {
    // if we need return type "undefined" - then there should be a "return;" statement;
    console.log("Result: ".concat(num));
}
printResult(add(1, 2));
// S2L8 Functions as types;
// That is a very generic type - Function - nothging is known about args or return type
// let combineValues: Function;
// This is a specific function type (no need to match parameters names):
var combineValues;
combineValues = add;
// combineValues = printResult; // that throws an error;
// combineValues = 5; // that is an Error;
console.log(combineValues(8, 8));
