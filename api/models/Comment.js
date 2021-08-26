var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    post_id:[
      {type: Schema.Types.ObjectId, ref: 'Post'}
    ],
    user_id:[
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    body: String,
    created_at: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Comment', commentSchema);