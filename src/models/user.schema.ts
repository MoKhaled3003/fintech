import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: Schema.Types.ObjectId, ref: "Role"}
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
