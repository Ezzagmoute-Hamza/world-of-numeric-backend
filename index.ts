
import { Express } from "express";
import { connectToDatabase } from "./utils/db";
import bodyParser from "body-parser";
import { createRoute } from "./utils/route";
import { checkNullable } from "./utils";
import { paths } from "./constants";
import analyticApp from "./routes/analytics";
import productApp from "./routes/products";
import dotenv from "dotenv";

const app: Express = createRoute();
const port =checkNullable(process.env.PORT,8080);

dotenv.config();
connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.text());


app.use(paths.ANALYTIC.ROOT,analyticApp);
app.use(paths.PRODUCT.ROOT,productApp);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} with profile ${process.env.NODE_ENV}`);
});

export default app;