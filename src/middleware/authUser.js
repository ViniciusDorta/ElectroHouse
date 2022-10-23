function authUser(request, response, next) {
    if (request.session.user != undefined) {
        next();
    }
    else {
        response.redirect("/login");
    }
}

module.exports = authUser;