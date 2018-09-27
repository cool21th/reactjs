const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const User = require('../routes/model/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log('jwt_payload_id', jwt_payload.id);
            User.findOne(jwt_payload)
                .then(user => {
                    console.log('user',user);
                    if(user) {
                        return done(null, user);
                    }
                    return done(null, false);
                    
                })
                .catch(err => console.log(err));
        })
    );
};