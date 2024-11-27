import { exec } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { checkNullable } from "../utils";

dotenv.config();

const MONGO_URI = checkNullable(process.env.MONGO_DB_URI,""); 
const filesInfo = [{name:"products",path:'/dataset/products.csv'},{name:"sales",path:'/dataset/sales.csv'}];

if (!MONGO_URI) {
  console.error("MongoDB URI is missing");
  process.exit(1);
}

filesInfo.forEach(fileInfo => {
     const filePath = path.resolve(__dirname,`..${fileInfo.path}`);

    const mongoImportCommand = `mongoimport --uri="${MONGO_URI}" --collection="${fileInfo.name}" --type=csv --headerline --file="${filePath}"`;
  
    exec(mongoImportCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`Error executing mongoimport: ${error.message}`);
            return;
        }

        if (stderr) {
            console.log(`mongoimport standard error: ${stderr}`);
            return;
        }

        console.log(`mongoimport executed successfully for ${fileInfo.name} file`);
        console.log(stdout);
    });
});


