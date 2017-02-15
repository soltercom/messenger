import * as mongoose from "mongoose";

export class OrderSchema {

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
				maxlength: 1024
			},
			owner: {
				type: mongoose.SchemaTypes.String,
				ref: 'Contact'
			},
			contact: {
				type: mongoose.SchemaTypes.String,
				required: true,
				ref: 'Contact'
			},
			date: {
				type: mongoose.SchemaTypes.Date,
				default: Date.now
			},
			text: {
				type: mongoose.SchemaTypes.String,
				trim: true,
				maxlength: 1024
			},
			status: {
				type: mongoose.SchemaTypes.Number,
				default: 0
			},
			phone: {
				type: mongoose.SchemaTypes.String,
				trim: true,
				maxlength: 1024
			},
			done: {
				type: mongoose.SchemaTypes.Date,
			}
		}, { toJSON: { virtuals: true } });

		return schema;

	}
}