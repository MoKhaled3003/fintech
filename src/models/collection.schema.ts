import mongoose, { Schema } from 'mongoose';

export interface ICollection extends Document {
    name: string;
}

const CollectionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);
export default Collection;