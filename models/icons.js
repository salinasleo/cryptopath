const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const iconsSchema = new Schema({
    clicked:{ type: Boolean, required: true },
    url:{ type: String, required: true },
    src: { type: String, required: true },
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    price: { type: String},
    speed: { type: String, required: true },
    styling: { type: String, required: true }
});

const IconsModel = mongoose.model("IconsModel", iconsSchema);

module.exports = IconsModel;
