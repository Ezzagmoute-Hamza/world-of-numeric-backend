import Joi from "joi";

type TotalSalesRequestType = {
    period: string[]; // Array with exactly two dates
};

export const validatePeriod = (request: TotalSalesRequestType) => {
    return Joi.object({
        period: Joi.array()
            .items(Joi.string().isoDate())
            .length(2) 
            .required(),
    }).validate(request);
};