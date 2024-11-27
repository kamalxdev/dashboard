import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  role: { type: String },
  status: { type: String },
});

var USERS: mongoose.Model<any>;

try {
  USERS = mongoose.model("Users") as mongoose.Model<any>;
} catch (error) {
  USERS = mongoose.model("Users", UserSchema) as mongoose.Model<any>;
}

export default USERS;
