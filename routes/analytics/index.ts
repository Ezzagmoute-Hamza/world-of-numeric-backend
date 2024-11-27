import { Request, Response,NextFunction } from "express";
import { createRoute } from "../../utils/route";
import { paths } from "../../constants";
import { checkRequestValidation } from "../../middlewares";
import { validatePeriod } from "../../validators";

const analyticApp = createRoute();

const totalSalesPeriodMiddleware = [
    async (req: Request, res: Response, next: NextFunction) => checkRequestValidation(validatePeriod(req.body.period), res, next)
];


analyticApp.get(paths.ANALYTIC.TOTAL_SALES,totalSalesPeriodMiddleware,async(req:Request,res:Response)=>{
   
});

analyticApp.get(paths.ANALYTIC.CATEGORY_SALES,async(req:Request,res:Response)=>{
   
});

analyticApp.get(paths.ANALYTIC.TRENDING_PRODUCTS,async(req:Request,res:Response)=>{
   
});

export default analyticApp;