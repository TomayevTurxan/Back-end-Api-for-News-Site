const users_router  = require("./users.router")
const publishers_router = require("./publishers.router")
const router = {
    users: users_router,
    publishers: publishers_router,
}

module.exports = router