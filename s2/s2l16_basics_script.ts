/**
 * Summarize two numbers and optionally print to console log OR return;
 *
 * @param {nubmer} n1 First addition;
 * @param {nubmer} n2 Second addition;
 * @param {boolean} [showResult=true] Optional flag to log our return result
 * @returns {number|undefined}
 */
function add(n1: number, n2: number, showResult: boolean = true, phrase: string = ""): number | undefined {
  const result = n1 + n2;

  if (showResult) console.log(phrase + result);
  else return result;
}

const number1 = 2.5;
const number2 = 5;

add(number1, number2, true, "The result is: ");
