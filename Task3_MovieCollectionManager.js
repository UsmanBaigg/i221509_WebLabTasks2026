/**
 * Task 3: Movie Collection Manager
 * Marks: 12
 * 
 * A program to manage a personal movie collection.
 * Each movie has title, director, genre, and year.
 * Allows adding, listing, and searching movies.
 */

class MovieCollectionManager {
  constructor() {
    this.movies = [];
  }

  /**
   * Adds a new movie to the collection
   * @param {string} title - Movie title
   * @param {string} director - Director's name
   * @param {string} genre - Movie genre
   * @param {number} year - Release year
   * @returns {boolean} true if movie added successfully, false otherwise
   */
  addMovie(title, director, genre, year) {
    // Validate inputs
    if (!title || !director || !genre || !year) {
      console.error('Error: Title, director, genre, and year are all required.');
      return false;
    }

    if (isNaN(year) || year < 1800 || year > new Date().getFullYear() + 5) {
      console.error('Error: Year must be a valid number between 1800 and current/future year.');
      return false;
    }

    // Check for duplicate movie
    const exists = this.movies.some(
      movie => movie.title.toLowerCase() === title.toLowerCase() && 
                movie.director.toLowerCase() === director.toLowerCase()
    );

    if (exists) {
      console.error(`Error: "${title}" by ${director} is already in the collection.`);
      return false;
    }

    // Add movie
    const movie = {
      id: this.movies.length + 1,
      title: title,
      director: director,
      genre: genre,
      year: year
    };

    this.movies.push(movie);
    console.log(`✓ Added: "${movie.title}" (${movie.year}) - Director: ${movie.director}`);
    return true;
  }

  /**
   * Lists all movies in a readable format
   * Uses map and join to create formatted string
   */
  listMovies() {
    if (this.movies.length === 0) {
      console.log('No movies in your collection yet.');
      return;
    }

    console.log('\n=== Movie Collection ===');
    console.log(`Total Movies: ${this.movies.length}\n`);

    // Use map to transform movies into formatted strings, then join them
    const formattedMovies = this.movies.map((movie, index) => {
      return `${index + 1}. "${movie.title}" (${movie.year})\n` +
             `   Director: ${movie.director}\n` +
             `   Genre: ${movie.genre}`;
    }).join('\n\n');

    console.log(formattedMovies);
    console.log('\n=======================\n');
  }

  /**
   * Searches for movies by director (case-insensitive)
   * Uses filter and string methods for case-insensitive comparison
   * @param {string} director - Director's name to search
   * @returns {array} Array of movies by the given director
   */
  searchByDirector(director) {
    if (!director) {
      console.error('Error: Please provide a director name.');
      return [];
    }

    const results = this.movies.filter(movie => 
      movie.director.toLowerCase().includes(director.toLowerCase())
    );

    return results;
  }

  /**
   * Searches for movies by genre (case-insensitive)
   * Uses filter and string methods for case-insensitive comparison
   * @param {string} genre - Genre to search
   * @returns {array} Array of movies in the given genre
   */
  searchByGenre(genre) {
    if (!genre) {
      console.error('Error: Please provide a genre.');
      return [];
    }

    const results = this.movies.filter(movie => 
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );

    return results;
  }

  /**
   * Displays search results in a formatted way
   * @param {array} results - Array of movies from search
   * @param {string} searchTerm - What was searched for
   * @param {string} searchType - Type of search (director or genre)
   */
  displaySearchResults(results, searchTerm, searchType) {
    if (results.length === 0) {
      console.log(`\nNo movies found by ${searchType}: "${searchTerm}"\n`);
      return;
    }

    console.log(`\n=== Search Results for ${searchType}: "${searchTerm}" ===`);
    console.log(`Found: ${results.length} movie(s)\n`);

    results.forEach((movie, index) => {
      console.log(`${index + 1}. "${movie.title}" (${movie.year})`);
      console.log(`   Director: ${movie.director}`);
      console.log(`   Genre: ${movie.genre}\n`);
    });
  }

  /**
   * Gets statistics about the collection
   */
  getStatistics() {
    if (this.movies.length === 0) {
      console.log('No movies in collection.');
      return;
    }

    console.log('\n=== Collection Statistics ===');
    console.log(`Total Movies: ${this.movies.length}`);

    // Count by genre
    const genreCount = {};
    this.movies.forEach(movie => {
      genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
    });

    console.log('\nMovies by Genre:');
    Object.entries(genreCount).forEach(([genre, count]) => {
      console.log(`  ${genre}: ${count} movie(s)`);
    });

    // Count by director
    const directorCount = {};
    this.movies.forEach(movie => {
      directorCount[movie.director] = (directorCount[movie.director] || 0) + 1;
    });

    console.log('\nDirectors with Multiple Films:');
    const multiFilmDirectors = Object.entries(directorCount).filter(([_, count]) => count > 1);
    if (multiFilmDirectors.length > 0) {
      multiFilmDirectors.forEach(([director, count]) => {
        console.log(`  ${director}: ${count} movie(s)`);
      });
    } else {
      console.log('  None (each director has only one film)');
    }

    // Year range
    const years = this.movies.map(m => m.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    console.log(`\nYear Range: ${minYear} - ${maxYear}`);
    console.log('=============================\n');
  }

  /**
   * Removes a movie from the collection
   * @param {string} title - Movie title to remove
   * @returns {boolean} true if removed, false otherwise
   */
  removeMovie(title) {
    const index = this.movies.findIndex(movie => movie.title.toLowerCase() === title.toLowerCase());
    if (index > -1) {
      const removed = this.movies.splice(index, 1);
      console.log(`✓ Removed: "${removed[0].title}"`);
      return true;
    }
    console.error(`Error: Movie "${title}" not found in collection.`);
    return false;
  }
}

// ===== DEMO: Using the Movie Collection Manager =====
console.log('Creating Movie Collection Manager...\n');
const collection = new MovieCollectionManager();

// Add movies
console.log('--- Adding Movies ---');
collection.addMovie('The Shawshank Redemption', 'Frank Darabont', 'Drama', 1994);
collection.addMovie('The Godfather', 'Francis Ford Coppola', 'Crime', 1972);
collection.addMovie('The Godfather Part II', 'Francis Ford Coppola', 'Crime', 1974);
collection.addMovie('Inception', 'Christopher Nolan', 'Science Fiction', 2010);
collection.addMovie('Interstellar', 'Christopher Nolan', 'Science Fiction', 2014);
collection.addMovie('The Dark Knight', 'Christopher Nolan', 'Action', 2008);
collection.addMovie('Pulp Fiction', 'Quentin Tarantino', 'Crime', 1994);
collection.addMovie('Kill Bill Vol. 1', 'Quentin Tarantino', 'Action', 2003);
collection.addMovie('Forrest Gump', 'Robert Zemeckis', 'Drama', 1994);
collection.addMovie('The Matrix', 'The Wachowskis', 'Science Fiction', 1999);

// Try to add duplicate
console.log('');
collection.addMovie('The Shawshank Redemption', 'Frank Darabont', 'Drama', 1994);

// List all movies
collection.listMovies();

// Display statistics
collection.getStatistics();

// Search by director
console.log('=== Search by Director ===');
const nolan = collection.searchByDirector('Christopher Nolan');
collection.displaySearchResults(nolan, 'Christopher Nolan', 'Director');

// Search by director (case-insensitive)
const tarantino = collection.searchByDirector('QUENTIN TARANTINO');
collection.displaySearchResults(tarantino, 'QUENTIN TARANTINO', 'Director');

// Search by genre
console.log('=== Search by Genre ===');
const scifi = collection.searchByGenre('Science Fiction');
collection.displaySearchResults(scifi, 'Science Fiction', 'Genre');

// Search by genre (case-insensitive)
const drama = collection.searchByGenre('drama');
collection.displaySearchResults(drama, 'drama', 'Genre');

// Search with no results
const horror = collection.searchByGenre('Horror');
collection.displaySearchResults(horror, 'Horror', 'Genre');

// Remove a movie
console.log('--- Removing a Movie ---');
collection.removeMovie('Forrest Gump');
collection.listMovies();

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MovieCollectionManager;
}
