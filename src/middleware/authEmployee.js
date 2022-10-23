function authEmployee(request, response, next) {
    if (request.session.employee != undefined) {
        next();
    }
    else {
        response.redirect("/loginEmployee");
    }
}

module.exports = authEmployee;