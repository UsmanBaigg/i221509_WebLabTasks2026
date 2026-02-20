/**
 * Task 5: Username Formatter & Validator
 * Marks: 10
 * 
 * A university messaging portal username cleaner and validator.
 * Students enter messy usernames that need to be cleaned and validated.
 */

/**
 * Cleans a username by:
 * - Removing leading & trailing spaces
 * - Converting to lowercase
 * - Replacing multiple spaces with single underscore
 * 
 * Must Use: trim(), toLowerCase(), replace()
 * 
 * @param {string} name - The username to clean
 * @returns {string} The cleaned username
 */
function cleanUsername(name) {
  // Remove leading & trailing spaces using trim()
  let cleaned = name.trim();
  
  // Convert to lowercase using toLowerCase()
  cleaned = cleaned.toLowerCase();
  
  // Replace multiple spaces with single underscore using replace()
  // Pattern: /\s+/ matches one or more whitespace characters
  cleaned = cleaned.replace(/\s+/g, '_');
  
  return cleaned;
}

/**
 * Validates a username according to rules:
 * - Must be 5–20 characters long
 * - Must start with a letter
 * - Only letters, numbers, and underscore allowed
 * 
 * Must Use: length, charAt()
 * 
 * @param {string} name - The username to validate
 * @returns {object} Object with isValid (boolean) and reasons (array of error messages)
 */
function validateUsername(name) {
  const reasons = [];
  
  // Check length (5-20 characters)
  if (name.length < 5) {
    reasons.push('Username must be at least 5 characters long.');
  }
  if (name.length > 20) {
    reasons.push('Username must be at most 20 characters long.');
  }
  
  // Check first character is a letter (using charAt())
  const firstChar = name.charAt(0);
  if (!isLetter(firstChar)) {
    reasons.push('Username must start with a letter.');
  }
  
  // Check only letters, numbers, and underscore allowed
  const validCharsRegex = /^[a-z0-9_]*$/;
  if (!validCharsRegex.test(name)) {
    reasons.push('Username can only contain letters, numbers, and underscores.');
  }
  
  return {
    isValid: reasons.length === 0,
    reasons: reasons
  };
}

/**
 * Helper function to check if a character is a letter
 * @param {string} char - Single character to check
 * @returns {boolean} true if character is a letter
 */
function isLetter(char) {
  return /^[a-z]$/.test(char.toLowerCase());
}

/**
 * Main function that combines cleaning and validation
 * @param {string} username - The username to process
 * @returns {object} Result object with cleaned name and validation status
 */
function processUsername(username) {
  const cleaned = cleanUsername(username);
  const validation = validateUsername(cleaned);
  
  return {
    original: username,
    cleaned: cleaned,
    isValid: validation.isValid,
    errors: validation.reasons
  };
}

// ===== DEMO: Testing Username Formatter & Validator =====
console.log('========================================');
console.log('TASK 5: USERNAME FORMATTER & VALIDATOR');
console.log('========================================\n');

const testCases = [
  ' AHMAD_kHan123 ',               // Example from task (should be valid)
  '  John_Doe  ',                  // Valid with extra spaces
  '   AliceSmith2024   ',           // Valid
  'bob',                            // Too short (3 chars)
  'Charlie_Brown_The_Best_Student', // Too long (32 chars)
  '_john',                          // Starts with underscore
  '123john',                        // Starts with number
  'sarah@smith',                    // Contains invalid character (@)
  'john smith',                     // Contains space (should be replaced with _)
  'A',                              // Single character
  'student123',                     // Valid
  'Maria_Garcia_2024',              // Valid
  '  TEST  USER  NAME  ',           // Multiple spaces (should become TEST_USER_NAME)
  'MixedCase2023',                  // Mixed case
  'valid_name_5',                   // Valid with multiple underscores
];

console.log('=== TEST CASES ===\n');

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: "${testCase}"`);
  const result = processUsername(testCase);
  console.log(`  Original: "${result.original}"`);
  console.log(`  Cleaned:  "${result.cleaned}"`);
  console.log(`  Valid:    ${result.isValid ? '✓ YES' : '✗ NO'}`);
  
  if (!result.isValid) {
    console.log('  Errors:');
    result.errors.forEach(error => {
      console.log(`    - ${error}`);
    });
  }
  console.log('');
});

// ===== DETAILED EXAMPLES =====
console.log('========================================');
console.log('DETAILED EXAMPLES');
console.log('========================================\n');

console.log('Example 1: Task Example');
console.log('Input:  " AHMAD_kHan123 "');
const example1 = processUsername(' AHMAD_kHan123 ');
console.log(`Output: "${example1.cleaned}"`);
console.log(`Valid:  ${example1.isValid}`);
console.log('');

console.log('Example 2: Multiple Spaces');
console.log('Input:  "  John  Doe  Smith  "');
const example2 = processUsername('  John  Doe  Smith  ');
console.log(`Output: "${example2.cleaned}"`);
console.log(`Valid:  ${example2.isValid}`);
console.log('');

console.log('Example 3: Invalid Characters');
console.log('Input:  "alice@email.com"');
const example3 = processUsername('alice@email.com');
console.log(`Output: "${example3.cleaned}"`);
console.log(`Valid:  ${example3.isValid}`);
console.log('Errors: ' + example3.errors.join(', '));
console.log('');

console.log('Example 4: Starts with Symbol');
console.log('Input:  "_username"');
const example4 = processUsername('_username');
console.log(`Output: "${example4.cleaned}"`);
console.log(`Valid:  ${example4.isValid}`);
console.log('Errors: ' + example4.errors.join(', '));
console.log('');

// ===== VALIDATION RULES DEMO =====
console.log('========================================');
console.log('VALIDATION RULES SUMMARY');
console.log('========================================\n');

console.log('Rules for Valid Username:');
console.log('  1. Length: Must be 5–20 characters');
console.log('  2. Start: Must start with a letter (a-z)');
console.log('  3. Characters: Only letters, numbers (0-9), and underscore (_) allowed');
console.log('');

console.log('Cleaning Process:');
console.log('  1. Remove leading & trailing spaces (trim)');
console.log('  2. Convert to lowercase');
console.log('  3. Replace multiple spaces with single underscore');
console.log('');

console.log('Required Methods Used:');
console.log('  - trim(): Remove whitespace from both ends');
console.log('  - toLowerCase(): Convert all characters to lowercase');
console.log('  - replace(): Find and replace patterns');
console.log('  - length: Check string length');
console.log('  - charAt(): Get character at specific position');
console.log('');

// ===== VALIDATION STATISTICS =====
console.log('========================================');
console.log('TEST RESULTS SUMMARY');
console.log('========================================\n');

const validCount = testCases.filter(test => processUsername(test).isValid).length;
const invalidCount = testCases.length - validCount;

console.log(`Total Test Cases: ${testCases.length}`);
console.log(`Valid Usernames:  ${validCount}`);
console.log(`Invalid Usernames: ${invalidCount}`);
console.log(`Success Rate: ${((validCount / testCases.length) * 100).toFixed(1)}%`);
console.log('');

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    cleanUsername,
    validateUsername,
    processUsername,
    isLetter
  };
}
