const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//a basket of goods goes to one household
//a basket of goods is delivered by a user
const BasketOfGoodsSchema = new Schema({
  householdId: {
    type: Schema.Types.ObjectId,
    ref: "households"
  }
});
