import mongoose, { Schema } from 'mongoose';

export interface IGroup extends Document {
    name: string;
    colectionIds: string[];
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  colectionIds: [{ type: Schema.Types.ObjectId ,ref:"Collection"}]
});

const Group = mongoose.model<IGroup>('Group', GroupSchema);
export default Group;
