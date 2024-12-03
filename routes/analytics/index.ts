import { Request, Response} from "express";
import { createRoute } from "../../utils/route";
import {subtractMonths,subtractDays} from "../../utils";
import { apiErrorMessage, paths, periods,PeriodType } from "../../constants";

import Sales from '../../models/Sales';

const analyticApp = createRoute();

analyticApp.get(paths.ANALYTIC.TOTAL_SALES,async (req:Request,res:Response)=>{
  try{
      let selectedPeriod = (req.query.period as PeriodType) || periods[0];
      let gettingExactDate:string = "";
    
      const mostRecentSale = await Sales.find({}, { Date: 1 }).sort({ Date: -1 }).limit(1);
    
      if (selectedPeriod && periods.includes(selectedPeriod as PeriodType)) {
        const [numericValue, unit] = [
          +selectedPeriod.slice(0, -1), 
          selectedPeriod.slice(-1),
        ];
    
        const mostRecentDate = mostRecentSale[0].Date!;
    
        gettingExactDate = unit === 'd'
          ? subtractDays(mostRecentDate, numericValue)
          : subtractMonths(mostRecentDate, numericValue);
      }
      const totalSales = await Sales.aggregate([
        {
          $match: {
            Date: {
              $lte: gettingExactDate,
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
        totalSales:totalSales[0].totalSalesAmount
      });
  }catch(err:any){
     console.log('Detailed Error Message:',err.message);
     res.status(400).send({
         message:apiErrorMessage
     })
  }
});

analyticApp.get(paths.ANALYTIC.CATEGORY_SALES,async(req:Request,res:Response)=>{
   try{
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
            category: { $arrayElemAt: ["$categories.category", 0]},
            salesCount: "$categories.salesCount",
            percentage: {
              $multiply: [{ $divide: ["$categories.salesCount", "$totalSales"] }, 100]
            }
          }
        }
      ]);
      
      res.status(200).send({
          categorySales
      })
   }catch(err:any){
      console.log('Detailed Error Message:',err.message);
      res.status(400).send({
          message:apiErrorMessage
      })
   }
});

analyticApp.get(paths.ANALYTIC.TRENDING_PRODUCTS,async(req:Request,res:Response)=>{
   try{
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
      });
   }catch(err:any){
      console.log('Detailed Error Message:',err.message);
      res.status(400).send({
          message:apiErrorMessage
      });
   }
});

export default analyticApp;