import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Function to create a new category
export const createNewCategory = async (req, res) => {
    try {
      
        let { name } = req.body;

        // Create new category
        const newCategory = new Category({
            name: name
        });

        // Save the new category
        const category = await newCategory.save();

        // Send success response
        res.status(200).json(category);
    } catch (error) {
        // Added error handling
        res.status(500).json({ message: "Failed to create category", error: error.message });
    }
};

// Function to get all products with pagination
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;  // Convert page to integer
        const limit = parseInt(req.query.limit) || 50;  // Convert limit to integer

        // Fetch products with pagination, sorting, and category population
        const products = await Product.find()
                                .sort({ createdAt: -1 })
                                .skip(page * limit)
                                .limit(limit)
                                .populate("category");

        // Send success response
        res.status(200).json(products);
    } catch (error) {
        // Added error handling
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// Function to create a new product
export const createNewProduct = async (req, res) => {
    try {
        // Extract product details from request body
        const { name, description, price, category } = req.body;

        // Create new product
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category
        });

        // Save the new product
        const product = await newProduct.save();

        // Send success response
        res.status(200).json(product);
    } catch (error) {
        // Added error handling
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};
