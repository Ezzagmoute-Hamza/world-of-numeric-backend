import { Request, Response } from "express";
import { createRoute } from "../../utils/route";
import SalesTable from "../../models/Sales";
import { apiErrorMessage } from "../../constants";

const productApp = createRoute();

productApp.get('/',async(req:Request,res:Response)=>{
  
   try{
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
     });
   }catch(err:any){
    console.log('Detailed Error Message:',err.message);
    res.status(400).send({
      message:apiErrorMessage
    });
   }
});

export default productApp;