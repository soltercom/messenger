import * as mongoose from "mongoose";

export class ClientSchema {

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
      },
      name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxlength: 256
      }
    }, { toJSON: { virtuals: true } });

    return schema;

  }
}
