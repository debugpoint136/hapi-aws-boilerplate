const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubmissionSchema = new Schema({
  username: String,
  registered: Date,
  assay: String,
  lab: String,
  description: String,
  comments: String,
  files_uploaded: String,
  experiment_design: {
    type: Object,
    "default": {}
  },
  numFiles: String,
  files: [
    {
      md5sum: String,
      filename: String
    }
  ]
});

// https://github.com/dherault/serverless-offline/issues/258
global.SubmissionSchema = global.SubmissionSchema || mongoose.model('Submission', SubmissionSchema);
module.exports = global.SubmissionSchema;
