var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

module.exports = function (app) {
    app.route('/sign-up')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/sign-in')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/sign-in',
            failureFlash: true
        }));

    app.get('/sign-out', users.signout);
};
