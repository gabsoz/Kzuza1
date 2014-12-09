var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchems = new Schema({
    email: String,
    username: String,
    password: String,
    name: {
        first: String,
        last: String
    }
});

userSchems.virtual('name.full').get(function(){
    return this.name.first + ' ' + this.name.last;
});

/*
userSchems.virtuals = {
    'name.full': {
        get: function() {
            return this.name.first + ' ' + this.name.last;
        }
    }
}
*/

module.exports = mongoose.model('user', userSchems);