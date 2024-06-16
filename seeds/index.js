const express = require('express');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const path = require('path');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp-data');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author : '66632e653746205130c2ba26',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dixoxtrut/image/upload/v1718301486/Yelpcamp/jcbzzj0hqkc5br0tgwcj.png',
                  filename: 'Yelpcamp/jcbzzj0hqkc5br0tgwcj',
                },
                {
                  url: 'https://res.cloudinary.com/dixoxtrut/image/upload/v1718301487/Yelpcamp/pxpcrcmufns580o01itr.png',
                  filename: 'Yelpcamp/pxpcrcmufns580o01itr',
                }
              ],
           
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})