//import mongoose's Schema constuctor and model fx
const { Schema, model, Types } = require('mongoose')


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
        thoughts: [{
            //tell Mongoose to expect a thought
            type: Schema.Types.ObjectId, 
            //tell User model to search Thought doc to find thoughts
            ref: 'Thought' 
        }],
        //friends: array of _id vals referencing User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            //tells User model to search User model (itself)
            ref: 'User' 
        }]
    },
    {
        toJSON: {
            //tell schema that it can use virtuals and getters
            virtuals: true,
            getters: true
        },
        id: false //prevents virtual's duplication of _id as 'id'
    }
);
const User = model('User', UserSchema); //creating User model

//Create virtual friendCount that retrieves length of user's friends array field on query
UserSchema.virtual('friendCount').get( function() {
    //length of array
    return this.friends.length;
});

//export the User model:
module.exports =  User;