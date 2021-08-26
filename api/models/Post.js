var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user_id:[
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    name: String,
    body: String,
    created_at: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Post', postSchema);