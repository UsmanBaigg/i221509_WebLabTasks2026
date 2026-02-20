/**
 * Task 2: Conference Attendee Management
 * Marks: 12
 * 
 * A system to manage attendee registrations for a tech conference.
 * Each attendee has name, email, and ticketType (General, VIP, Speaker).
 * Maximum capacity: 100 attendees
 */

class ConferenceAttendeeManager {
  constructor(maxCapacity = 100) {
    this.attendees = [];
    this.maxCapacity = maxCapacity;
    this.ticketTypes = ['General', 'VIP', 'Speaker'];
  }

  /**
   * Adds a new attendee if capacity not reached
   * @param {string} name - Attendee's full name
   * @param {string} email - Attendee's email address
   * @param {string} ticketType - Type of ticket (General, VIP, Speaker)
   * @returns {boolean} true if attendee added successfully, false otherwise
   */
  addAttendee(name, email, ticketType) {
    // Validate inputs
    if (!name || !email || !ticketType) {
      console.error('Error: Name, email, and ticket type are required.');
      return false;
    }

    if (!this.ticketTypes.includes(ticketType)) {
      console.error(`Error: Invalid ticket type. Allowed types: ${this.ticketTypes.join(', ')}`);
      return false;
    }

    // Check if conference is full
    if (this.isFull()) {
      console.error('Error: Conference has reached maximum capacity (100 attendees).');
      return false;
    }

    // Check for duplicate email
    const emailExists = this.attendees.some(attendee => attendee.email === email);
    if (emailExists) {
      console.error(`Error: An attendee with email "${email}" is already registered.`);
      return false;
    }

    // Add new attendee
    const attendee = {
      id: this.attendees.length + 1,
      name: name,
      email: email,
      ticketType: ticketType,
      registeredAt: new Date().toLocaleString()
    };

    this.attendees.push(attendee);
    console.log(`✓ Successfully registered: ${name} (${ticketType} Ticket)`);
    return true;
  }

  /**
   * Checks if the conference has reached maximum capacity
   * @returns {boolean} true if conference is full, false otherwise
   */
  isFull() {
    return this.attendees.length >= this.maxCapacity;
  }

  /**
   * Lists all registered attendees in a formatted list
   * Uses forEach to iterate through attendees
   */
  listAttendees() {
    if (this.attendees.length === 0) {
      console.log('No attendees registered yet.');
      return;
    }

    console.log('\n=== Registered Attendees ===');
    console.log(`Total: ${this.attendees.length}/${this.maxCapacity}\n`);

    this.attendees.forEach((attendee, index) => {
      console.log(`${index + 1}. ${attendee.name}`);
      console.log(`   Email: ${attendee.email}`);
      console.log(`   Ticket Type: ${attendee.ticketType}`);
      console.log(`   Registered: ${attendee.registeredAt}`);
      console.log('');
    });
  }

  /**
   * Counts attendees by ticket type
   * Uses filter to find matching ticket types
   * @param {string} type - The ticket type to count (General, VIP, Speaker)
   * @returns {number} The number of attendees with the given ticket type
   */
  countByTicketType(type) {
    if (!this.ticketTypes.includes(type)) {
      console.error(`Error: Invalid ticket type "${type}".`);
      return 0;
    }

    const count = this.attendees.filter(attendee => attendee.ticketType === type).length;
    return count;
  }

  /**
   * Gets a detailed count of all ticket types
   * @returns {object} Object with count of each ticket type
   */
  getTicketTypeBreakdown() {
    const breakdown = {};
    this.ticketTypes.forEach(type => {
      breakdown[type] = this.countByTicketType(type);
    });
    return breakdown;
  }

  /**
   * Displays summary statistics
   */
  displayStatistics() {
    console.log('\n=== Conference Statistics ===');
    console.log(`Total Attendees: ${this.attendees.length}/${this.maxCapacity}`);
    console.log(`Remaining Capacity: ${this.maxCapacity - this.attendees.length}`);
    console.log(`Conference Status: ${this.isFull() ? 'FULL' : 'ACCEPTING REGISTRATIONS'}`);
    console.log('\nTicket Type Breakdown:');

    const breakdown = this.getTicketTypeBreakdown();
    Object.entries(breakdown).forEach(([type, count]) => {
      const percentage = ((count / this.attendees.length) * 100).toFixed(1);
      console.log(`  ${type}: ${count} attendee(s) (${this.attendees.length > 0 ? percentage : 0}%)`);
    });
    console.log('=============================\n');
  }

  /**
   * Removes an attendee by email
   * @param {string} email - Email of attendee to remove
   * @returns {boolean} true if removed, false otherwise
   */
  removeAttendee(email) {
    const index = this.attendees.findIndex(attendee => attendee.email === email);
    if (index > -1) {
      const removed = this.attendees.splice(index, 1);
      console.log(`✓ Removed: ${removed[0].name}`);
      return true;
    }
    console.error(`Error: No attendee found with email "${email}".`);
    return false;
  }
}

// ===== DEMO: Using the Conference Attendee Manager =====
console.log('Creating Conference Attendee Manager...\n');
const manager = new ConferenceAttendeeManager(100);

// Add some attendees
console.log('--- Adding Attendees ---');
manager.addAttendee('Alice Johnson', 'alice@example.com', 'VIP');
manager.addAttendee('Bob Smith', 'bob@example.com', 'General');
manager.addAttendee('Carol Davis', 'carol@example.com', 'Speaker');
manager.addAttendee('David Wilson', 'david@example.com', 'General');
manager.addAttendee('Emma Brown', 'emma@example.com', 'VIP');
manager.addAttendee('Frank Miller', 'frank@example.com', 'General');
manager.addAttendee('Grace Lee', 'grace@example.com', 'Speaker');
manager.addAttendee('Henry Taylor', 'henry@example.com', 'VIP');

// Try to add duplicate email
console.log('');
manager.addAttendee('John Doe', 'alice@example.com', 'General');

// List all attendees
manager.listAttendees();

// Display statistics
manager.displayStatistics();

// Count by ticket type
console.log('=== Count by Ticket Type ===');
console.log(`General Tickets: ${manager.countByTicketType('General')}`);
console.log(`VIP Tickets: ${manager.countByTicketType('VIP')}`);
console.log(`Speaker Tickets: ${manager.countByTicketType('Speaker')}`);
console.log('');

// Check if conference is full
console.log(`=== Conference Status ===`);
console.log(`Is Full? ${manager.isFull()}`);
console.log('');

// Remove an attendee
console.log('--- Event: Removing an Attendee ---');
manager.removeAttendee('bob@example.com');

// Display updated statistics
manager.displayStatistics();

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConferenceAttendeeManager;
}
