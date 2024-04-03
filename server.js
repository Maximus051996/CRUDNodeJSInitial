const express = require('express')
const mongose = require('mongoose')
const app = express()
const productModel = require('./models/productModel');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// routes

app.get('/getProduct', async (req, res) => {
    try {
        const productData = await productModel.find({});
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/getProductbyID/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await productModel.findById(id);
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.put('/updateProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await productModel.findByIdAndUpdate(id, req.body);
        if (!productData) {
            return res.status(404).json({ message: `Product Id -${id} not exist !!` });
        }
        const updatedData = await productModel.findById(id);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/insertProduct', async (req, res) => {
    try {
        const productData = await productModel.create(req.body);
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await productModel.findByIdAndDelete(id);
        if (!productData) {
            return res.status(404).json({ message: `product Id -${id} already deleted or not exist !!` });
        }
        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})





mongose.
    connect('mongodb+srv://sayanp06:8yeQNYs0GJFC6KHC@sp0.ojfcvit.mongodb.net/Node-API?retryWrites=true&w=majority&appName=SP0')
    .then(() => {
        console.log("Database connected ...")
        app.listen(3000, () => {
            console.log("APP STARTED ...")
        })
    }).catch((error) => {
        console.log(error)
    })