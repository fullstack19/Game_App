const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CRUD_DB',(err)=>{
    if(!err)
        console.log('Mongo connection succeeded.');
    else
        console.log('Error in DB connections ' + JSON.stringify(err,undefined,2));
    
});
module.exports = mongoose