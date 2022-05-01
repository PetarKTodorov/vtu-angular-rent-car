const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/user');
const Car = require('../models/car');

const encryption = require("../utilities/encryption");

function initializateDatabase(configuration) {
    mongoose.connect(configuration.dbConnectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

    const database = mongoose.connection;

    database.once('open', err => {
        if (err) {
            throw err;
        }

        seedDatabase()
            .then(() => {
                console.log('Database ready');
            })
            .catch((reason) => {
                console.log('Something went wrong');
                console.log(reason);
            });
    });

    database.on('error', reason => {
        console.log(reason);
    });
};

module.exports = initializateDatabase;

async function seedDatabase() {
    const hasUsers = await User.find().then((users) => users.length > 0);
    const hasCars = await Car.find().then((cars) => cars.length > 0);

    if (hasUsers === false) {
        await seedUsers();
    }

    if (hasCars === false) {
        await seedCars();
    }
}

async function seedUsers() {
    // Seed admin
    const saltAdmin = encryption.generateSalt();
    const passwordHashAdmin = encryption.hashPassword("1234", saltAdmin);

    const admin = {
        salt: saltAdmin,
        password: passwordHashAdmin,
        email: "admin@mail.net",
        roles: ["Admin"],
        rentedCars: [],
        isBlocked: false
    }

    await User.create(admin);

    // Seed user pesho
    const saltPesho = encryption.generateSalt();
    const passwordHashPesho = encryption.hashPassword("1234", saltPesho);

    const pesho = {
        salt: saltPesho,
        password: passwordHashPesho,
        email: "pesho@mail.net",
        roles: ["User"],
        rentedCars: [],
        isBlocked: false
    }

    await User.create(pesho);
}

async function seedCars() {
    const bmw = { 
        model: "BMW X5", 
        horsePower: 308, 
        engineType: "Gas/Electric", 
        fuelCapacity: 70, 
        transmission: "Automatic", 
        kilometersTraveld: 400, 
        description: "Very good car",
        imageUrl: "https://cdn.ddaudio.com.ua/assets/images/REnault/traf-panjur/5b4c83c2131d8.jpeg",
        priceForDayRent: 100,
        counterRents: 0
    };
    const honda = { 
        model: "Honda Accord EX-L", 
        horsePower: 200, 
        engineType: "Gasoline", 
        fuelCapacity: 50, 
        transmission: "Manual", 
        kilometersTraveld: 4000, 
        description: "Very good car",
        imageUrl: "https://www.cstatic-images.com/supersized/in/v1/424546/1HGCR2F87GA200911/3a4efaad7851646e0102b92a18487c03.jpg",
        priceForDayRent: 80,
        counterRents: 0
    };
    const audi = { 
        model: "Audi A4", 
        horsePower: 131, 
        engineType: "Diesel", 
        fuelCapacity: 30, 
        transmission: "Manual", 
        kilometersTraveld: 15000, 
        description: "Good car",
        imageUrl: "https://g2.cars.bg/2018-11-04_2/25845979o.jpg",
        priceForDayRent: 20,
        counterRents: 0
    };
    const mercedes = { 
        model: "Mercedes-Benz E 350 ", 
        horsePower: 265, 
        engineType: "Diesel", 
        fuelCapacity: 70, 
        transmission: "Automatic", 
        kilometersTraveld: 10000, 
        description: "Very good car",
        imageUrl: "https://1.bp.blogspot.com/-99J6QSjLVpE/WNIW7-4IJ4I/AAAAAAAAiAk/MuEn2nJ-J_wHmSu5nfhifegvcz_e__BcgCLcB/s1600/2014-mercedes-w212-facelift-e350-4matik-all-black-1.jpg",
        priceForDayRent: 50,
        counterRents: 0
    };
    const subaru = { 
        model: "Subaru Forester", 
        horsePower: 147, 
        engineType: "Diesel", 
        fuelCapacity: 50, 
        transmission: "Manual", 
        kilometersTraveld: 25000, 
        description: "Good car",
        imageUrl: "https://g1.cars.bg/2019-01-13_2/27130254o.jpg",
        priceForDayRent: 25,
        counterRents: 0
    };

    const cars = [bmw, honda, audi, mercedes, subaru];

    await Car.insertMany(cars);
}