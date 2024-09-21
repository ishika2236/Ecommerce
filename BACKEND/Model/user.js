const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((error) => console.log('Failed to connect to mongoose', error));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'manufacturer'] },
    createdAt: { type: Date, default: Date.now },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    phoneNumber: { type: String },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isEmailVerified: { type: Boolean, default: false },
    favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
