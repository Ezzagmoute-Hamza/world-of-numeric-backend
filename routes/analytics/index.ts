import { Request, Response } from "express";
import { createRoute } from "../../utils/route";
import { paths } from "../../constants";

const analyticApp = createRoute();

analyticApp.get(paths.ANALYTIC.TOTAL_SALES,async(req:Request,res:Response)=>{

});

analyticApp.get(paths.ANALYTIC.CATEGORY_SALES,async(req:Request,res:Response)=>{

});

analyticApp.get(paths.ANALYTIC.TRENDING_PRODUCTS,async(req:Request,res:Response)=>{

});

export default analyticApp;