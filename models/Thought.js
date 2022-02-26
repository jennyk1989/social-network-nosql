//thoughtText: string, required, btw 1 - 280 characters

//createdAt: date, set default value = current timestamp, getter method to format timestamp on query

//username(user who created thought): string, required

//reactions(like replies): array of nested docs created w/ reactionSchema

//schema: create virtual reactionCount that retrieves lenght of thought's reactions array field on query

//Reaction schema...
//reactionId: ObjectId data type, default value = new ObjectId

//reactionBody: string, required, 280 char max

//username: string, required

//createdAt: date, set default val to current timestamp, getter method to format timestamp on query

//settings: not a model, but used as the reactions field's subdoc schema in the Thought model