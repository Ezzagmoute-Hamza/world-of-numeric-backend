import { Request, Response } from "express";
import { createRoute } from "../../utils/route";

const productApp = createRoute();

productApp.get('/',async(req:Request,res:Response)=>{

});

export default productApp;