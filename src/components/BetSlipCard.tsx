import React, { useMemo } from "react";
import useBetSlip from "../hooks/useBetSlip";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { BetSlip } from "../redux/betSlip/betSlipSlice";

const BetSlipCard: React.FC = () => {
  const { bets, removeBet } = useBetSlip();

  // Calcula el total usando useMemo (solo se recalcula cuando bets cambia)
  const total = useMemo(
    () => bets.reduce((acc: number, bet: BetSlip) => acc + bet.selectionPrice, 0),
    [bets]
  );

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        minHeight: "70vh",
      }}
    >
      <Card
        sx={{
          p: 2,
          width: "100%",
          maxWidth: 480,
          boxShadow: 6,
          borderRadius: 3,
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          title="My Bets"
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
          sx={{ textAlign: "center", pb: 0 }}
        />

        <CardContent sx={{ flexGrow: 1, mt: 1 }}>
          {bets.length === 0 ? (
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mt: 4, fontStyle: "italic" }}
            >
              No bets added yet. Select an event to get started!
            </Typography>
          ) : (
            <Stack spacing={2}>
              {bets.map((bet) => (
                <Card
                  key={`${bet.eventId}-${bet.marketId}-${bet.selectionId}`}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 2,
                    backgroundColor: "#ffffff",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: 3,
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight="bold" noWrap>
                      {bet.selectionName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {bet.marketName}
                    </Typography>
                  </Box>

                  <Typography fontWeight="bold" sx={{ mx: 2 }}>
                    {bet.selectionPrice.toFixed(2)}
                  </Typography>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      borderRadius: 2,
                    }}
                    onClick={() => removeBet(bet)}
                  >
                    Remove
                  </Button>
                </Card>
              ))}

              <Divider sx={{ my: 1 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: 4,
                }}
                disabled={bets.length === 0}
                onClick={() => alert("✅ Bet placed successfully!")}
              >
                Place Bet
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BetSlipCard;
