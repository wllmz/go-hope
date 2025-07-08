import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation pour les endpoints d'authentification",
    },
    servers: [
      {
        url: "http://localhost:5000", // URL de votre serveur
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Ajustez le chemin vers vos fichiers de routes
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  
};

export default setupSwagger;
