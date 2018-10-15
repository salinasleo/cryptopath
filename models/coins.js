const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinsSchema = new Schema({
    username: { type: String, required: true },
    coin: { type: String, required: true },
    quantity: { type: Number},
    purchasedate: { type: Date, default: Date.now },
    purchaseprice: { type: Number },
    favorite: { type: Boolean, default: false },
    notes: {
        type: String,
        validate: [
            function (input) {
                // If this returns true, proceed. If not, return the error message below
                return input.length < 200;
            },
            // Error Message
            "Note should be shorter."
        ]
    }
});

coinsSchema.methods.fav = function () {
    this.fav = true;
    return this.fav;
};

coinsSchema.methods.unfav = function () {
    this.fav = false;
    return this.unfav;
};


const Coins = mongoose.model("Coins", coinsSchema);

module.exports = Coins;