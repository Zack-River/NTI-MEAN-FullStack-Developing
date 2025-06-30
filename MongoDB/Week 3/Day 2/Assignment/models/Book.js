const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  author: {
    type: String,
    required: [true, "Author is required"]
  },
  publishedYear: {
    type: Number,
    min: [1900, "Year must be >= 1900"],
    max: [currentYear, `Year must be <= ${currentYear}`]
  },
  genres: {
    type: [String]
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Instance method
bookSchema.methods.getBookInfo = function () {
  return `The book '${this.title}' is written by ${this.author}.`;
};

// Static method
bookSchema.statics.findByGenre = function (genre) {
  return this.find({ genres: genre });
};

// Middleware
bookSchema.pre('save', function (next) {
  console.log(`Saving book: ${this.title}`);
  next();
});

bookSchema.post('save', function (doc) {
  console.log(`Saved book: ${doc.title}`);
});

module.exports = mongoose.model('Book', bookSchema);
