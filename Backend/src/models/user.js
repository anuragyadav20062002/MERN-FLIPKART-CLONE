const { timeStamp } = require("console")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contact: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password)
})

userSchema.method = {
  authenticate: function (password) {
    return bcrypt.compare(password, this.hash_password)
  },
}

module.exports = mongoose.model("User", userSchema)
