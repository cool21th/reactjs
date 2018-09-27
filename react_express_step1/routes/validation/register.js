const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.uname = !isEmpty(data.uname) ? data.uname : '';
    data.uid = !isEmpty(data.uid) ? data.uid : '';
    data.upw = !isEmpty(data.upw) ? data.upw : '';
    data.upw2 = !isEmpty(data.upw2) ? data.upw2 : '';

    if(!Validator.isLength(data.uname, {min:2, max: 30})){
        errors.uname = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.uname)) {
        errors.uname = 'Name field is required';
    }

    if(Validator.isEmpty(data.uid)) {
        errors.uid = 'User id field is required';
    }

    if(!Validator.isEmail(data.uid)) {
        errors.uid = 'User Id is invalid Email';
    }

    if(Validator.isEmpty(data.upw)) {
        errors.upw = 'Password field is required';
    }
    if(!Validator.isLength(data.upw, {min:6, max:30})) {
        errors.upw = 'Password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.upw2)) {
        errors.upw2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.upw, data.upw2)) {
        errors.upw2 = 'Passwords must match';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}