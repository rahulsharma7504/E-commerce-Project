const mongoose=require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
})

const Category = mongoose.model('Category',CategorySchema);

module.exports=Category; 