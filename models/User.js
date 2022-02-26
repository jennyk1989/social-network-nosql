//username: string, unique, required, trimemed

//email: string, required, unique, validation

//thoughts: array of _id vals referencing Thought model

//friends: array of _id vals referencing User model (self-reference)

//Schema: Create virtual friendCount that retrieves length of user's friends array field on query