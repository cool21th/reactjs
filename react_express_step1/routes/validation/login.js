const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.uid = !isEmpty(data.uid) ? data.uid : '';
    data.upw = !isEmpty(data.upw) ? data.upw : '';
    
    // if(!Validator.isEmail(data.uid)) {
    //     errors.uid = 'User Id is invalid Email';
    // }

    if(Validator.isEmpty(data.uid)) {
        errors.uid = 'User id field is required';
    }

    if(Validator.isEmpty(data.upw)) {
        errors.upw = 'Password field is required';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}