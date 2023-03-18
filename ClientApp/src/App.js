import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Card, Box, Typography } from "@mui/material";
import Sentiment from "./Sentiment";
import { HubConnectionState } from "@microsoft/signalr";

const defaultState = { score: [0, 0] };

const App = ({ connection }) => {
  const [result, setResult] = useState(defaultState);

  useEffect(() => {
    if (
      connection.state !== HubConnectionState.Connected &&
      connection.state !== HubConnectionState.Connecting
    ) {
      connection.on("ReceiveSentiment", (result) => {
        console.log(result);
        setResult(result);
      });
      connection.start().catch((err) => console.error(err.toString()));
    }
  }, [connection]);

  const handleChanged = (event) => {
    const text = event.target.value;
    if (text.length > 0) {
      connection.invoke("RecieveText", text);
    } else {
      setResult(defaultState);
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
                <Sentiment
                  positiveSentiment={result.score[0]}
                  negativeSentiment={result.score[1]}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Typography variant="h6">
                {`Positive sentiment score: ${result.score[0]}, Negative sentiment score: ${result.score[1]}`}
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
