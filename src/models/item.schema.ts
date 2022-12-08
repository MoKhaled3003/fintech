import mongoose, { Schema } from 'mongoose';

export interface IItem extends Document {
    name: string;
    parentId: string;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  parentId: [{ type: Schema.Types.ObjectId ,ref:"Collection"}]
});

const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
