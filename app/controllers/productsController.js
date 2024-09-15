import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createNewCategory = async (req,res) => {
    let {name } = req.boby;

    const newCategory = new Category({
        name: name
    })

    const category = newCategory.save();

    res.status(200).json(category);
}

export const getAllProducts = async (req,res) => {
    try {
        const page = req.query.page || 0;
        const limit = req.query.limit || 50;
        const products = await Product.find()
                                .sort({createdAt : -1})
                                .skip(page * limit)
                                .limit(limit)
                                .populate("category");

        res.status(200).json(products)
    } catch (error) {
        
    }
}

export const createNewProduct = async (req,res) => {
    try {
        const { name, description,price,category } = req.body;

        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category
        })

        const product = await newProduct.save();

        res.status(200).json(product)
    } catch (error) {
        
    }
}