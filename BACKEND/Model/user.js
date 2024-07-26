const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(()=>console.log('database connected'))
.catch((error)=>console.log('failed to connect to mongoose',error));


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim:true },
    email: { type: String, required: true, unique: true,trim:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
  });


  const User = mongoose.model('User', userSchema,'users');

module.exports = User;