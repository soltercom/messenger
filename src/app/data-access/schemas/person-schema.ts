import * as mongoose from "mongoose";

export class PersonSchema {

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
        ref: 'Client'
      },
      name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxlength: 256
      },
      client: {
        type: mongoose.SchemaTypes.String,
        ref: 'Client'
      },
      admin: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
      },
      pin: {
        type: mongoose.SchemaTypes.String,
        maxlength: 16
      }
    }, { toJSON: { virtuals: true } });

    return schema;

  }
}