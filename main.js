import express from "express"
import { config } from "dotenv"
import mainRoute from "./routes/index.js"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

config()
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "OboiShop",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const app = express()
app.use(express.json())


app.use("/", mainRoute)
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT, () => {
    console.log(`server is run on PORT ${process.env.PORT}`);
})
