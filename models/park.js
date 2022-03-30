const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const parkSchema = new Schema({

    type: {
        type: String,
        enum: ["FeatureCollection"],
        required: true
    },
    features: [{
        type: {
            type: String,
            enum: ["Feature"],
            required: true
        },
        id: Number,
        geometry: {
            type: {
                type: String,
                // enum: ["MultiPolygon"],
                required: true
            },
            coordinates: {
                type: [[[[Number]]]],
                required: true
            }
        },
        properties: {
            ParkName: String,
            WebPage: String
        }
    }]
})

const Park = mongoose.model("Park", parkSchema);
module.exports = Park;