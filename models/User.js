//import mongoose's Schema constuctor and model fx
const { Schema, model } = require('mongoose')
//date formatting import

// create user schema
const UserSchema = new Schema(
    {
        //username field: string, unique, required, trimmed
        username: {
            type: String,

        },
        //email: string, required, unique, validation
        email: {

        },
        //thoughts: array of _id vals referencing Thought model
        thoughts: {

        },
        //friends: array of _id vals referencing User model (self-reference)
        friends: {

        }
    },
    {
        toJSON: {
            //tell schema that it can use virtuals 
            virtuals: true,
            //getters here if needed
        },
        id: false //prevents virtual's duplication of _id as 'id'
    }
);

//Schema: Create virtual friendCount that retrieves length of user's friends array field on query
UserSchema.virtual('friendCount').get( function() {
    //length of array
    return this.friends.length;
});

const User = model('User', UserSchema); //creating User model
//export the User model:
module.exports = User;