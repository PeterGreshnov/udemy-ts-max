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
