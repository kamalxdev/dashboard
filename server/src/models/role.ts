import mongoose, { Schema } from "mongoose";

const RoleSchema = new Schema({
  name: { type: String },
  permissions: { type: [], default:[] },
});

var ROLES: mongoose.Model<any>;

try {
  ROLES = mongoose.model("Roles") as mongoose.Model<any>;
} catch (error) {
  ROLES = mongoose.model("Roles", RoleSchema) as mongoose.Model<any>;
}

export default ROLES;
