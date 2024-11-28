import { Request, Response } from "express";
import { createRoute } from "../../utils/route";
import SalesTable from "../../models/Sales";


const productApp = createRoute();

productApp.get('/',async(req:Request,res:Response)=>{
   const products = await SalesTable.aggregate([
    {
      $group: {
        _id: "$ProductID",
        totalSales: { $sum: "$Quantity" },
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "ProductID",
        as: "productDetails",
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $project: {
        _id: 0,
        ProductName: "$productDetails.ProductName",
        totalSales: 1,
      }
    }
  ]);

   res.status(200).send({
       products
   })
});

export default productApp;