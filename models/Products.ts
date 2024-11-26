import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    ProductID: Number,
    Price: Number,
    ProductName: String,
    Category: String
});

const productTable = mongoose.model('Product', productSchema);
export default productTable;