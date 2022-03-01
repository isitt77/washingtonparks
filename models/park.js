const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const parkSchema = new Schema({

    type: {
        type: String,
        enum: ["Feature"],
        required: true
    },
    id: Number,
    geometry: {
        type: {
            type: String,
            enum: ["Polygon"],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    properties: {
        parkName: String,
        webPage: String
    }

})

const Park = mongoose.model("Park", parkSchema);
module.exports = Park;