import express from "express";

const app = express();
const PORT = 3000;

async function Main() {
    // routes

    app.listen(PORT, (e) => {
        if(typeof e === "undefined") {
            /**
             * Server started successfully
             */
            console.log(`Server running on port: ${PORT}.`);
        } else {
            /**
             * Error starting server
             */
            console.error(`ERROR: Could not start server on port: ${PORT}.`);
            console.error(e);
            process.exit(1);
        }
    })
}

await Main();