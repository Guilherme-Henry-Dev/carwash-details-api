import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Carwash API",
            version: "1.0.0",
            description: "API para agendamento de serviços automotivos",
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/modules/**/*.ts"]
});
