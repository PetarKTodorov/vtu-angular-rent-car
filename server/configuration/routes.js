;
const userRouter = require("../routes/user");
const carRouter = require("../routes/car");
const rentRouter = require("../routes/rent");

function initializateRoutes(application) {
    application.use("/user", userRouter);
    application.use("/car", carRouter);
    application.use("/rent", rentRouter);

    // application.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('404 Not Found');
    //     res.end();
    // });
}

module.exports = initializateRoutes;