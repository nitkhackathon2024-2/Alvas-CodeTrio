const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: false , unique: true },
  
  dob: { type: Date, required: false  },
  location: { type: String, required: false  },
  academicLevel: { type: String, required: false  },
  major: { type: String, required: false  },
  learningPreferences: String,
  learningGoals: String,
  collaborationStyle: String,
  availability: String,
  profilePicture: String,
  bio: String,
  languagesSpoken: String,
  skills: String
});

module.exports = mongoose.model('User', userSchema);
