import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    SaleID: Number,
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    Quantity: Number,
    Date: String,
    TotalAmount:Number
});

const saleTable = mongoose.model('Sale', saleSchema)
export default saleTable;