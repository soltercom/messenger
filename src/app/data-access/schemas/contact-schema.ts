import * as mongoose from "mongoose";

export class ContactSchema {

	static get schema() {

		let schema = new mongoose.Schema({
      _id: {
        type: mongoose.SchemaTypes.String,
        unique: true
      },
      deleted: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
      },
      desc: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxlength: 256
      },
      owner: {
        type: mongoose.SchemaTypes.String,
        ref: 'Person'
      },
			cross: {
				type: mongoose.SchemaTypes.String,
				ref: 'Contact'
			},
			personFrom: {
				type: mongoose.SchemaTypes.String,
				ref: 'Person'
			},
			personTo: {
				type: mongoose.SchemaTypes.String,
				ref: 'Person'
			},
		}, { toJSON: { virtuals: true } });

		return schema;

	}
}