import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Card, Box, Typography } from "@mui/material";
import Sentiment from "./Sentiment";
import { HubConnectionState } from "@microsoft/signalr";

const App = ({ connection }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (
      connection.state !== HubConnectionState.Connected &&
      connection.state !== HubConnectionState.Connecting
    ) {
      connection.on("ReceiveSentiment", (value) => {
        setValue(value.value);
      });
      connection.start().catch((err) => console.error(err.toString()));
    }
  }, [connection]);

  const handleChanged = (event) => {
    const text = event.target.value;
    if (text.length > 0) {
      connection.invoke("RecieveText", text);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 32 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10.5}>
          <Card variant="outlined">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ margin: 16 }}>
                Language Sentiment Analysis
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: 100,
                }}
              >
                <Sentiment value={value} />
              </Typography>
            </Box>
            <Box
              sx={{
                padding: 16,
                marginTop: 16,
              }}
            >
              <TextField
                label="Text"
                variant="outlined"
                fullWidth
                multiline
                onChange={handleChanged}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
