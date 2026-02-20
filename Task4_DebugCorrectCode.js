/**
 * Task 4: Debug & Correct the Code
 * Marks: 15
 * 
 * This file contains buggy code that needs to be debugged and corrected.
 * Each section identifies the bugs and provides the corrected version.
 */

console.log('========================================');
console.log('TASK 4: DEBUG & CORRECT THE CODE');
console.log('========================================\n');

// ========================================
// SECTION A: getAverage Function
// ========================================
console.log('SECTION A: getAverage Function\n');

console.log('--- BUGGY CODE ---');
console.log(`
const getAverage = (arr) => {
  let sum = 0;
  arr.map(num => sum + num);
  return sum / arr.length;
};
console.log(getAverage([10,20,30]));
`);

console.log('BUG IDENTIFIED:');
console.log('  - map() does not modify the sum variable');
console.log('  - map() returns a new array but its result is ignored');
console.log('  - sum remains 0, so the function returns 0\n');

console.log('--- CORRECTED CODE ---');
console.log(`
const getAverage = (arr) => {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
};
console.log(getAverage([10,20,30]));
`);

console.log('EXPLANATION:');
console.log('  - Use reduce() to accumulate the sum properly');
console.log('  - reduce() starts with initial value 0');
console.log('  - Each iteration adds the current number to the accumulator\n');

// CORRECTED IMPLEMENTATION
const getAverage = (arr) => {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
};
console.log('OUTPUT: getAverage([10,20,30]) =', getAverage([10, 20, 30]));
console.log('');

// ========================================
// SECTION B: findLongestWord Function
// ========================================
console.log('SECTION B: findLongestWord Function\n');

console.log('--- BUGGY CODE ---');
console.log(`
function findLongestWord(str) {
  let words = str.split(" ");
  return words.reduce((a,b)=>{
    if(a.length > b.length)
      return a
  });
}
console.log(findLongestWord("JavaScript is very powerful language"));
`);

console.log('BUG IDENTIFIED:');
console.log('  - The reduce callback only returns a value when a.length > b.length');
console.log('  - When b.length >= a.length, nothing is returned (returns undefined)');
console.log('  - Missing else clause to handle the case when b is longer\n');

console.log('--- CORRECTED CODE ---');
console.log(`
function findLongestWord(str) {
  let words = str.split(" ");
  return words.reduce((a, b) => {
    if (a.length > b.length)
      return a;
    else
      return b;
  });
}
console.log(findLongestWord("JavaScript is very powerful language"));
`);

console.log('EXPLANATION:');
console.log('  - Add an else clause to return b when b is longer than a');
console.log('  - This ensures the callback always returns a word (never undefined)\n');

// CORRECTED IMPLEMENTATION
function findLongestWord(str) {
  let words = str.split(" ");
  return words.reduce((a, b) => {
    if (a.length > b.length)
      return a;
    else
      return b;
  });
}
console.log('OUTPUT: findLongestWord("JavaScript is very powerful language") =', findLongestWord("JavaScript is very powerful language"));
console.log('');

// ========================================
// SECTION C: checkPass Function
// ========================================
console.log('SECTION C: checkPass Function\n');

console.log('--- BUGGY CODE ---');
console.log(`
const checkPass = (marks)=>{
  if(marks.filter(m => m >= 50))
    return "Pass"
  else
    return "Fail"
}
console.log(checkPass([20,30,40]));
`);

console.log('BUG IDENTIFIED:');
console.log('  - filter() always returns an array (even if empty)');
console.log('  - An empty array is truthy in JavaScript');
console.log('  - The condition will always be true, even when no marks >= 50');
console.log('  - checkPass([20,30,40]) incorrectly returns "Pass"\n');

console.log('--- CORRECTED CODE (Option 1: Using some()) ---');
console.log(`
const checkPass = (marks) => {
  if(marks.some(m => m >= 50))
    return "Pass"
  else
    return "Fail"
}
console.log(checkPass([20,30,40]));
`);

console.log('EXPLANATION:');
console.log('  - some() returns true if at least one element passes the test');
console.log('  - some() returns false if no elements pass the test\n');

// CORRECTED IMPLEMENTATION (Option 1)
const checkPass = (marks) => {
  if (marks.some(m => m >= 50))
    return "Pass";
  else
    return "Fail";
};
console.log('OUTPUT: checkPass([20,30,40]) =', checkPass([20, 30, 40]));
console.log('OUTPUT: checkPass([30,50,40]) =', checkPass([30, 50, 40]));
console.log('');

console.log('--- CORRECTED CODE (Option 2: Using filter().length) ---');
console.log(`
const checkPass = (marks) => {
  if(marks.filter(m => m >= 50).length > 0)
    return "Pass"
  else
    return "Fail"
}
`);

console.log('EXPLANATION:');
console.log('  - Check if the filtered array has length > 0');
console.log('  - This counts how many marks are >= 50\n');

// CORRECTED IMPLEMENTATION (Option 2)
const checkPass2 = (marks) => {
  if (marks.filter(m => m >= 50).length > 0)
    return "Pass";
  else
    return "Fail";
};
console.log('OUTPUT: checkPass2([20,30,40]) =', checkPass2([20, 30, 40]));
console.log('OUTPUT: checkPass2([30,50,40]) =', checkPass2([30, 50, 40]));
console.log('');

// ========================================
// SUMMARY TABLE
// ========================================
console.log('========================================');
console.log('SUMMARY OF BUGS AND FIXES');
console.log('========================================\n');

const bugSummary = [
  {
    section: 'A',
    function: 'getAverage',
    bug: 'map() result ignored, sum never updated',
    fix: 'Use reduce() to accumulate sum properly',
    expected: 20,
    got_buggy: 0
  },
  {
    section: 'B',
    function: 'findLongestWord',
    bug: 'Missing else clause returns undefined',
    fix: 'Add else clause to return longer word',
    expected: 'powerful',
    got_buggy: 'undefined'
  },
  {
    section: 'C',
    function: 'checkPass',
    bug: 'Empty array is truthy, always returns "Pass"',
    fix: 'Use some() to check if any mark >= 50',
    expected: 'Fail',
    got_buggy: 'Pass'
  }
];

bugSummary.forEach(bug => {
  console.log(`${bug.section}. ${bug.function.toUpperCase()}`);
  console.log(`   Bug: ${bug.bug}`);
  console.log(`   Fix: ${bug.fix}`);
  console.log('');
});

console.log('========================================');
console.log('All bugs have been corrected!');
console.log('========================================');

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAverage,
    findLongestWord,
    checkPass,
    checkPass2
  };
}
