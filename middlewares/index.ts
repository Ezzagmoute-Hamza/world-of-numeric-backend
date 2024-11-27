import Joi from "joi";
import {Response} from "express";

export const checkRequestValidation = (validationResult: Joi.ValidationResult<any>, res: Response, next: any) => {
    if (validationResult.error)
        res.status(400).json(
            {message:validationResult.error.message}
        )
    else next();
}