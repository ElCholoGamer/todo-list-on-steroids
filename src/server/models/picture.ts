import { Document, model, Schema } from 'mongoose';

export interface IPicture extends Document {
	data: Buffer;
	contentType: string;
}

const PictureSchema = new Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true, trim: true },
});

const Picture = model<IPicture>('Picture', PictureSchema);

export default Picture;
