const express = require("express");
const mongoose = require("mongoose");
const Menu = require('./models/menu.model');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

mongoose.connect(
    mongoURI
  ).then(()=>{
    console.log("connected database");
    app.listen(3000,()=>{
        console.log('server running')
    })
  }).catch((error) => {
    console.log(error);
  });

  app.get('/',(req, res) => {
    console.log('server running')
  });

  app.get('/api/menus', async (req, res) => {
    try {
      const menus = await Menu.find({},{menuName:1}); 
      res.json(menus);
    } catch (error) {
      res.status(500).send('Error fetching menus');
    }
  });

  app.get('/api/items/:menuId', async (req, res) => {
    const { menuId } = req.params;
    try {
      const menu = await Menu.findById(menuId);
      if (!menu) {
        return res.status(404).send('Menu not found');
      }
      res.json(menu.items); 
    } catch (error) {
      res.status(500).send('Error fetching menu items');
    }
  });

  app.post('/api/menus', async (req, res) => {
    const { menuName, description } = req.body;
    try {
      const newMenu = await Menu.insertOne({ menuName, description, items: [] });
      res.status(201).json(newMenu);
    } catch (error) {
      res.status(500).send('Error creating menu');
    }
  });

  app.post('/api/items/:menuId', async (req, res) => {
    const { menuId } = req.params;
    const { name, description, price } = req.body;
    console.log(menuId);
  
    try {
      const newItem = { name, description, price };
      const result = await Menu.updateOne({ _id: menuId },{$push:{items:newItem}});
      res.status(201).json(result);
    } catch (error) {
        console.log(error)
      res.status(500).send('Error adding menu item');
    }
  });

  