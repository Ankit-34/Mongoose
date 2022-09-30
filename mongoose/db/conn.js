const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://Sgaar:Sagar@cluster0.0gxt8f8.mongodb.net/school?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(e);
})