// Create Model (each collection in the DB will have a new `mongoose.model`): 
let BookCollection = mongoose.model("Book", {
    id: Number,
    title: String,
    subtitle: String,
    authors: String,
    publisher: String,
    publishedDate: String,
    description: String,
    pageCount: Number


    
});