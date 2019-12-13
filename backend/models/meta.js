const { Schema } = require('mongoose');

const MetaSchema = new Schema({
  is_converting: {
    type: Boolean,
    default: false
  },
  in_service: {
    type: Boolean,
    default: false
  }
});

module.exports = MetaSchema;
