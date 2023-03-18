import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import themeJson from "./theme.json";
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {
  HttpTransportType,
  HubConnection,
  HubConnectionState,
  HubConnectionBuilder,
  JsonHubProtocol,
} from "@microsoft/signalr";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const connection = new HubConnectionBuilder()
  .withUrl("/hub", {
    transport: HttpTransportType.WebSockets,
    skipNegotiation: true,
  })
  .withHubProtocol(new JsonHubProtocol())
  .withAutomaticReconnect()
  .build();

root.render(
  <ThemeProvider theme={createTheme(themeJson)}>
    <CssBaseline />
    <App connection={connection} />
  </ThemeProvider>
);
