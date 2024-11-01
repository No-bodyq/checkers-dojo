import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa Routes y Route
import "./index.css";
import { init } from "@dojoengine/sdk";
import { Schema, schema } from "./bindings.ts";
import { dojoConfig } from "../dojoConfig.ts";
import { DojoContextProvider } from "./DojoContext.tsx";
import { setupBurnerManager } from "@dojoengine/create-burner";
import Home from "./components/Home.tsx";
import Checker from "./components/Checker.tsx";
// import CheckerTest from "./components/CheckerTest.tsx";

async function main() {
    const sdk = await init<Schema>(
        {
            client: {
                rpcUrl: dojoConfig.rpcUrl,
                toriiUrl: dojoConfig.toriiUrl,
                relayUrl: dojoConfig.relayUrl,
                worldAddress: dojoConfig.manifest.world.address,
            },
            domain: {
                name: "WORLD_NAME",
                version: "1.0",
                chainId: "KATANA",
                revision: "1",
            },
        },
        schema
    );

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <Router>
                <DojoContextProvider
                    burnerManager={await setupBurnerManager(dojoConfig)}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/checkers" element={<Checker sdk={sdk} />} />
                        {/* <Route path="/checkerstest" element={<CheckerTest sdk={sdk} />} /> */}
                    </Routes>

                </DojoContextProvider>
            </Router>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
