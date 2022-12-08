import mongoose, { Schema } from 'mongoose';

export interface ICollection extends Document {
    name: string;
    groupId: string;
}

const CollectionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  groupId: { type: Schema.Types.ObjectId ,ref:"Group"}
});

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);
export default Collection;