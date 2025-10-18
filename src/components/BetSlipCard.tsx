import React from 'react'
import useBetSlip from '../hooks/useBetSlip';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { BetSlip } from '../redux/betSlip/betSlipSlice';

const BetSlipCard: React.FC = () => {

const {bets, removeBet} = useBetSlip();

const total = bets.reduce((acc: number, bet: BetSlip): number => {
    return acc += bet.selectionPrice;
},0);

  return (
    <>
    <Box>
        <Card sx={{boxShadow: 9}}>
            <CardHeader title="Bets"/>
            <p>Total Bets: {total.toFixed(2)} </p>
            {
                bets.map((bet: BetSlip) => (
                    <CardContent key={`${bet.eventId}-${bet.marketId}-${bet.selectionId}`}>
                        <Typography>{`${bet.selectionName} - ${bet.marketName}`}</Typography>
                        <Typography>{bet.selectionPrice}</Typography>
                        <Button onClick={()=> removeBet(bet)} >Delete</Button>
                    </CardContent>
                ))
            }
        </Card>
    </Box>
    </>
  )
}

export default BetSlipCard