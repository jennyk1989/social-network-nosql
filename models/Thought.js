//import Monogooses's things
const { Schema, model, Types } = require('mongoose');
// date formatter here

const ThoughtSchema = new Schema(
    {
        //thoughtText: string, required, btw 1 - 280 characters
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        //createdAt: date, set default value = current timestamp, getter method to format timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdTime => dateFormat(createdTime)
        },
        //username(user who created thought): string, required
        username: {
            type: String,
            required: true
        },
        //reactions(like replies): array of nested docs created w/ reactionSchema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
//schema: create virtual reactionCount that retrieves lenght of thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//create Thought model
const Thought = model('Thought', ThoughtSchema);
//export Thought model
module.exports = Thought;

//Reaction schema...
const ReactionSchema = new Schema (
    {
        //reactionId: ObjectId data type, default value = new ObjectId
        reactionID: {

        },
        //reactionBody: string, required, 280 char max
        reactionBody: {

        },
        //username: string, required
        username: {

        },
        //createdAt: date, set default val to current timestamp, getter method to format timestamp on query
        createdAt: {

        },
    }
)
//settings: not a model, but used as the reactions field's subdoc schema in the Thought model



