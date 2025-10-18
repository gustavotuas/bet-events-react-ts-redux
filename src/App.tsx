import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Grid,
  LinearProgress,
  Alert,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import EventCard from "./components/EventCard";
import BetSlipCard from "./components/BetSlipCard";
import useEvent from "./hooks/event/useEvent";
import { Event } from "./redux/event/eventSlice";

const App: React.FC = () => {
  const { isLoading, error, response, fetchEvents } = useEvent();
  const [tabValue, setTabValue] = useState(0);

  const notDataFound = !isLoading && !error && response.length === 0;

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {notDataFound && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No data found.
        </Alert>
      )}

      <Box textAlign="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🏟️ Sports Betting App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse events and manage your bets easily.
        </Typography>
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Tab label="Events" />
          <Tab label="My Bets" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {response.map((event: Event) => (
            <Grid item xs={12} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BetSlipCard />
        </Box>
      )}
    </Container>
  );
};

export default App;
