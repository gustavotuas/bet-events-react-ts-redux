import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  ButtonGroup,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { Event } from '../redux/event/eventSlice';
import useBetSlip from '../hooks/useBetSlip';
import { BetSlip } from '../redux/betSlip/betSlipSlice';

type EventCardProps = {
  event: Event;
};


const EventCard: React.FC<EventCardProps> = ({ event }: EventCardProps) => {

    const {bets,addRemoveBet} = useBetSlip();

    const isBetSelected = (eventId: number, marketId: number, selectionId: number): boolean =>{
      return bets.some((bet: BetSlip) => bet.eventId === eventId && bet.marketId === marketId && bet.selectionId === selectionId );
    };

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 10 }}>
        <CardHeader
          title={event.name}
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
                  bgcolor: 'grey.50',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ mb: 1 }}
                >
                  {market.name}
                </Typography>

                <ButtonGroup
                  variant="outlined"
                  color="primary"
                  aria-label="market selections"
                  fullWidth
                  sx={{
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {market.selections?.map((selection) => {

                    const isSelected = isBetSelected(event.id, market.id, selection.id);

                   return( <Button
                      key={selection.id}
                      sx={{
                        flex: '1 1 45%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textTransform: 'none',
                        p: 1.5,
                        background: isSelected ? "#dfeade" :"white"
                      }}
                      onClick={()=>{
                        const newBet: BetSlip = {
                            eventId: event.id,
                            eventName: event.name,
                            eventDescription: event.description,
                            marketId: market.id,
                            marketName: market.name,
                            selectionId: selection.id,
                            selectionName: selection.name,
                            selectionPrice: selection.price
                        };
                        addRemoveBet(newBet);
                      }}
                    >
                      <Typography variant="body2">{selection.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selection.price.toFixed(2)}
                      </Typography>
                    </Button>
                   );
})}
                </ButtonGroup>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
