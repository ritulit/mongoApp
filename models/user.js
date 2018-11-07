// Create Model (each collection in the DB will have a new `mongoose.model`): 
let UserCollection = mongoose.model("User", {
    firstName : String,
    lastName: String,
    userName : String,
    password : String,
    cart: []
    
});