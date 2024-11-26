
export const conditionalObjectReturn = (isValid: boolean, conditionalObject: any, defaultValue: any) => {
    if (isValid)
        return conditionalObject;
    return defaultValue;
}

export const isStringEmpty = (str: string | undefined | null) => str === null || str === undefined || str.length === 0;

export const checkNullable = (object: any, defaultValue: any) => (object === null || object === undefined || (typeof (object) === "string" && isStringEmpty(object))) ? defaultValue : object;







