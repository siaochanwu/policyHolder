import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./swagger.json"), "utf-8")
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Policyholder API",
      version: "1.0.0",
      description: "API for Policyholder",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/swagger.json"],
};

export default (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
