;
const configurationObject = {
    development: {
        dbConnectionString: "mongodb://localhost:27017/RentCar",
        port: 11011,
        decodedToken: "resntCar11011rentCar",
        codedToken: "rentCar"
    },
    production: {}
}

module.exports = configurationObject;