const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        username: {type: String, required: true},
        email: {type: String, required: true},
        mobile: {type: Number, required:true},
        comments: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
          }
        ],
        posts: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Post'
            }
          ],
        created_at: {
            type: Date,
            default: Date.now 
        }
});
    
module.exports = mongoose.model('User', userSchema);