export const paths = {
    ANALYTIC: {
        ROOT: "/analytics",
        TOTAL_SALES: "/total_sales",
        TRENDING_PRODUCTS: "/trending_products",
        CATEGORY_SALES: "/category_sales"
    },
    PRODUCT:{
        ROOT:"/products"
    }
}

export const apiErrorMessage = "Something went wrong";
export const periods = ['7d', '30d', '12m'];
export type PeriodType = '7d' | '30d' | '12m';
