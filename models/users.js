const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: {type: Date}
});

// //authenticate input against database
// usersSchema.statics.authenticate = function (username, password) {
//   User.findOne({ username: username })
//     .exec(function (err, user) {
//       if (err) {
//         console.log("error1")
//       } else if (!user) {
//         console.log("thank you for registering");
//       }
//       else {
//         console.log("message 3") 
//         }
//       })
//     };

    //authenticate input against database

  usersSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        var err = new Error('Ooops, something went wrong, please try again.');
        console.log('Unknown Error');
        return callback(err);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

const User = mongoose.model("User", usersSchema);

module.exports = User;
