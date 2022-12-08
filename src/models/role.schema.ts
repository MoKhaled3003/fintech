import mongoose, { Schema } from 'mongoose';

export interface IRole extends Document {
    name: string;
    groupId: string;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  groupId: { type: Schema.Types.ObjectId ,ref:"Group"}
});

const Role = mongoose.model<IRole>('Role', RoleSchema);
export default Role;
