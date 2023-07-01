const express = require("express");
const cors = require("cors");
const { GracefulShutdownServer } = require("medusa-core-utils");

const loaders = require("@medusajs/medusa/dist/loaders/index").default;

(async () => {
  async function start() {
    const app = express();
    const directory = process.cwd();

    // Customize CORS options
    const corsOptions = {
      origin: "http://localhost:3000", // Replace with your frontend URL
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Set to `true` if you need to pass cookies along with the requests
    };

    app.use(cors(corsOptions));

    try {
      const { container } = await loaders({
        directory,
        expressApp: app,
      });
      const configModule = container.resolve("configModule");
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000;

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return;
          }
          console.log(`Server is ready on port: ${port}`);
        })
      );

      // Handle graceful shutdown
      const gracefulShutdown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.");
            process.exit(0);
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e);
            process.exit(1);
          });
      };
      process.on("SIGTERM", gracefulShutdown);
      process.on("SIGINT", gracefulShutdown);
    } catch (err) {
      console.error("Error starting server", err);
      process.exit(1);
    }
  }

  await start();
})();
