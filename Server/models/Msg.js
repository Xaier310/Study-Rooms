const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    msg:{
        type:String,
    },
    time:{
        type:String,
    }
});

module.exports = new mongoose.model("Msg", msgSchema);
module.exports.msgSchema = msgSchema;