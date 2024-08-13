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
