const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    joining: {
        type: String,
        required: true
    },
    password: {  //confirm password
        type: String,
        required: true
    }
}
)
userSchema.pre('save', async function (next) {  //save method se pehle chalana hai islie 'pre' use hua or fir 'save's likha hai
    console.log("registe is running")
    // if(this.isModified('password'))  //means jab likha gya h password toh mtlb password hi modify krke hash mai banana h
    // {
    //     this.password = await bcrypt.hash(this.password,12);
    //     this.cpassword = await bcrypt.hash(this.cpassword,12); 
    // }
    next();
})
const User = mongoose.model('USER',userSchema); //(nameOfCollectionJoAtlasPeDikhe,kisStructureKoFollowKrkeBane)
module.exports = User;
