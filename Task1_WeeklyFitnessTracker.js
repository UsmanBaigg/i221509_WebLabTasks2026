class WeeklyFitnessTracker {
  // Initial data: [4500, 6200, 5800, 7100, 4900, 8300, 6700]
  constructor(initialData = [4500, 6200, 5800, 7100, 4900, 8300, 6700]) {
    this.steps = initialData;
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  /**
   * Updates the step count for a specific day (0-based index)
   * @param {number} dayIndex - The day index (0-6)
   * @param {number} steps - The number of steps for that day
   */
  addSteps(dayIndex, steps) {
    if (dayIndex < 0 || dayIndex > 6) {
      console.error('Invalid day index. Please use 0-6.');
      return;
    }
    this.steps[dayIndex] = steps;
    console.log(`Updated ${this.daysOfWeek[dayIndex]}: ${steps} steps`);
  }

  /**
   * Returns the highest step count of the week
   * @returns {number} The highest step count
   */
  getHighestSteps() {
    return Math.max(...this.steps);
  }

  /**
   * Returns the lowest step count of the week
   * @returns {number} The lowest step count
   */
  getLowestSteps() {
    return Math.min(...this.steps);
  }

  /**
   * Calculates and returns the average steps for the week
   * @returns {number} The average step count
   */
  getAverageSteps() {
    const total = this.steps.reduce((sum, stepCount) => sum + stepCount, 0);
    return total / this.steps.length;
  }

  /**
   * Returns an array of step counts that are above the weekly average
   * @returns {array} Array of step counts above average
   */
  getAboveAverageDays() {
    const average = this.getAverageSteps();
    return this.steps.filter(stepCount => stepCount > average);
  }

  /**
   * Helper method to get day names and step counts for above-average days
   * @returns {array} Array of objects with day names and step counts
   */
  getAboveAverageDaysDetails() {
    const average = this.getAverageSteps();
    return this.steps
      .map((stepCount, index) => ({
        day: this.daysOfWeek[index],
        steps: stepCount
      }))
      .filter(entry => entry.steps > average);
  }

  /**
   * Displays a summary of the weekly fitness data
   */
  displaySummary() {
    console.log('\n=== Weekly Fitness Tracker Summary ===');
    console.log('Daily Steps:');
    this.steps.forEach((stepCount, index) => {
      console.log(`  ${this.daysOfWeek[index]}: ${stepCount} steps`);
    });
    console.log(`\nHighest Steps: ${this.getHighestSteps()}`);
    console.log(`Lowest Steps: ${this.getLowestSteps()}`);
    console.log(`Average Steps: ${this.getAverageSteps().toFixed(2)}`);
    console.log(`\nDays Above Average (${this.getAverageSteps().toFixed(2)} steps):`);
    const aboveAverageDays = this.getAboveAverageDaysDetails();
    if (aboveAverageDays.length > 0) {
      aboveAverageDays.forEach(entry => {
        console.log(`  ${entry.day}: ${entry.steps} steps`);
      });
    } else {
      console.log('  No days exceeded the average.');
    }
    console.log('=====================================\n');
  }
}

// Demo: Using the Weekly Fitness Tracker
console.log('Creating a Weekly Fitness Tracker with initial data...\n');
const tracker = new WeeklyFitnessTracker();

// Display initial summary
tracker.displaySummary();

// Update steps for a specific day
console.log('Updating Wednesday (index 2) to 9000 steps...');
tracker.addSteps(2, 9000);

// Display updated summary
tracker.displaySummary();

// Get specific insights
console.log('Test Individual Functions:');
console.log(`Highest Steps: ${tracker.getHighestSteps()}`);
console.log(`Lowest Steps: ${tracker.getLowestSteps()}`);
console.log(`Average Steps: ${tracker.getAverageSteps().toFixed(2)}`);
console.log(`Steps Above Average: ${tracker.getAboveAverageDays()}`);

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeeklyFitnessTracker;
}
