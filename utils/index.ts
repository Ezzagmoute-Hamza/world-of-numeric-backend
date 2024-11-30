
export const conditionalObjectReturn = (isValid: boolean, conditionalObject: any, defaultValue: any) => {
    if (isValid)
        return conditionalObject;
    return defaultValue;
}

export const isStringEmpty = (str: string | undefined | null) => str === null || str === undefined || str.length === 0;

export const checkNullable = (object: any, defaultValue: any) => (object === null || object === undefined || (typeof (object) === "string" && isStringEmpty(object))) ? defaultValue : object;

export const  subtractMonths = (dateString:string, months:number) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() - months);
    return date.toISOString().split('T')[0];
}

export const  subtractDays = (dateString:string, days:number) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
}


