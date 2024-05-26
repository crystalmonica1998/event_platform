import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true }
})

const User = models.User || model('User', UserSchema);

export default User;