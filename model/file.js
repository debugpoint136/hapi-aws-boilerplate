const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = new Schema({
  filename: String,
  upload_end: Date,
  md5sum: String,
  submission: String,
  pulled_by: [{
    username : String,
    when : Date
     }],
  htcf_queue_start: [{
    username : String,
    when : Date
     }],
  htcf_queue_end: [{
    username : String,
    when : Date
     }]
});

// https://github.com/dherault/serverless-offline/issues/258
global.FileSchema = global.FileSchema || mongoose.model('File', FileSchema);
module.exports = global.FileSchema;
