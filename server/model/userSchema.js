const mongooose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongooose.Schema({
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
   }]
})


// we are hashing the password

userSchema.pre('save', async function (){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password ,12)
    }
})

//we are generating token 
userSchema.methods.generateAuthToken = async function () {
    try{
          let tokenvar = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
          this.tokens = this.tokens.concat({ token: tokenvar})
          await this.save()
          return token
    } catch(err) {
          console.log(err)
    }
}




const User = mongooose.model('USER', userSchema);
module.exports = User

