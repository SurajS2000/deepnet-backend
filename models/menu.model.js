const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    menuName:{
        type:String,
        required: [true, "please enter menu name"]
    },
    description:{
        type:String,
        required: [true, "please enter menu name"]
    },
    items: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
        }
      ]
});

const Menu = mongoose.model("Menu", MenuSchema)

module.exports = Menu;