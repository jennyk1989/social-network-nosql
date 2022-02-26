//import mongoose's Schema constuctor and model fx
const { Schema, model } = require('mongoose')
//date formatting import

// create user schema
const UserSchema = new Schema(
    {
        //username field: string, unique, required, trimmed
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        //email: string, required, unique, validation
        email: {
            type: String,
            required: true,
            unique: true,
            //validation for email address via regex
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        //thoughts: array of _id vals referencing Thought model
        thoughts: {
            type: Schema.Types.ObjectId, //so Mongoose knows to expect a thought
            ref: 'Thought' //tells User model to search Thought doc to find thoughts
        },
        //friends: array of _id vals referencing User model (self-reference)
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User' //tells User model to search User model (itself)
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