import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Event } from "../redux/event/eventSlice";
import useBetSlip from "../hooks/useBetSlip";
import { BetSlip } from "../redux/betSlip/betSlipSlice";

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { bets, addRemoveBet } = useBetSlip();

  const isBetSelected = (
    eventId: number,
    marketId: number,
    selectionId: number
  ): boolean => {
    return bets.some(
      (bet: BetSlip) =>
        bet.eventId === eventId &&
        bet.marketId === marketId &&
        bet.selectionId === selectionId
    );
  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: 8,
          backgroundColor: "#f9fafc",
        }}
      >
        <CardHeader
          title={event.name}
          subheader={event.description}
          titleTypographyProps={{ fontWeight: "bold", fontSize: "1.25rem" }}
          subheaderTypographyProps={{
            color: "text.secondary",
            fontSize: "0.9rem",
          }}
          sx={{
            textAlign: "center",
            pb: 0,
          }}
        />

        <CardContent>
          <Stack spacing={3}>
            {event.markets?.map((market) => (
              <Card
                key={market.id}
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  boxShadow: 1,
                  transition: "0.25s ease",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  {market.name}
                </Typography>
                
                <Grid container spacing={1.5} justifyContent="left">
                  {market.selections?.map((selection) => {
                    const isSelected = isBetSelected(
                      event.id,
                      market.id,
                      selection.id
                    );

                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={4}
                        key={selection.id}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          fullWidth
                          onClick={() => {
                            const newBet: BetSlip = {
                              eventId: event.id,
                              eventName: event.name,
                              eventDescription: event.description,
                              marketId: market.id,
                              marketName: market.name,
                              selectionId: selection.id,
                              selectionName: selection.name,
                              selectionPrice: selection.price,
                            };
                            addRemoveBet(newBet);
                          }}
                          variant={isSelected ? "contained" : "outlined"}
                          color={isSelected ? "success" : "primary"}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            height: "100%",
                            textTransform: "none",
                            fontWeight: "medium",
                            transition: "0.2s ease",
                            backgroundColor: isSelected ? "#88a785ff" : "#ffffff",
                            borderColor: isSelected ? "#8bc34a" : "#e0e0e0",
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "#cfe1ce"
                                : "#f5f5f5",
                            },
                            "& .MuiTypography-root": { lineHeight: 1.2 },
                            boxShadow: isSelected ? 2 : 0,
                          }}
                        >
                          <Stack spacing={0.3} alignItems="center">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              align="center"
                            >
                              {selection.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight="medium"
                            >
                              {selection.price.toFixed(2)}
                            </Typography>
                          </Stack>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
