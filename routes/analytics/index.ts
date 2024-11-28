import { Request, Response,NextFunction } from "express";
import { createRoute } from "../../utils/route";
import { paths } from "../../constants";
import { checkRequestValidation } from "../../middlewares";
import { validatePeriod } from "../../validators";
import Sales from '../../models/Sales';

const analyticApp = createRoute();

const totalSalesPeriodMiddleware = [
    async (req: Request, res: Response, next: NextFunction) => checkRequestValidation(validatePeriod(req.body), res, next)
];


analyticApp.get(paths.ANALYTIC.TOTAL_SALES,totalSalesPeriodMiddleware,async(req:Request,res:Response)=>{
   const selectedPeriod = req.body.period;
   const totalSales = await Sales.aggregate([
      {
        $match: {
          Date: {
            $gte: selectedPeriod[0],
            $lte: selectedPeriod[1],
          }
        }
      },
      
      {
        $group: {
          _id: null,
          totalSalesAmount: { $sum: "$TotalAmount" } 
        }
      },
     
      {
        $project: {
          _id: 0, 
          totalSalesAmount: 1
        }
      }
    ]);

   res.status(200).send({
      totalSales
   })
});

analyticApp.get(paths.ANALYTIC.CATEGORY_SALES,async(req:Request,res:Response)=>{
   const categorySales = await Sales.aggregate([
      
      {
        $lookup: {
          from: "products",
          localField: "ProductID",
          foreignField: "ProductID",
          as: "productDetails"
        }
      },
    
      {
        $unwind: "$productDetails"
      },
     
      {
        $group: {
          _id: "$productDetails.Category", 
          salesCount: { $sum: 1 }, 
        }
      },
     
      {
        $group: {
          _id: null,
          categories: { $push: { category: "$_id", salesCount: "$salesCount" } },
          totalSales: { $sum: "$salesCount" }
        }
      },
      
      {
        $unwind: "$categories"
      },
     
      {
        $project: {
          _id: 0,
          category: "$categories.category",
          salesCount: "$categories.salesCount",
          percentage: {
            $multiply: [{ $divide: ["$categories.salesCount", "$totalSales"] }, 100]
          }
        }
      },
      {
        $sort: { salesCount: -1 }
      }
    ]);
    
   res.status(200).send({
      categorySales
   })
});

analyticApp.get(paths.ANALYTIC.TRENDING_PRODUCTS,async(req:Request,res:Response)=>{
   const trendingProducts = await Sales.aggregate([
      {
        $group: {
          _id: "$ProductID",
          totalQuantity: { $sum: "$Quantity" },
          totalAmount: { $sum: "$TotalAmount" }
        }
      },

      {
        $sort: { totalQuantity: -1 }
      },
    
      {
        $limit: 3
      },
      
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "ProductID",
          as: "productDetails"
        }
      },
      
      {
        $unwind: "$productDetails"
      },
      
      {
        $project: {
          _id: 0,
          ProductName: "$productDetails.ProductName",
          totalQuantity: 1,
          totalAmount: 1
        }
      }
    ]);
   res.status(200).send({
      trendingProducts
   })
});

export default analyticApp;