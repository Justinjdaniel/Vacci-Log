const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const vaccineSchema = new Schema({
    uid: Number,
    vaccineName: String,
    manufacturer: String,
    batch: String,
    slNo: Number,
    mfd: Date,
    recordAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('vaccine', vaccineSchema, 'Vaccines');  //'vaccine' model name & 'Vaccines' collection name created in DB