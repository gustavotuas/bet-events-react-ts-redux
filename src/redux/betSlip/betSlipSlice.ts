import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BetSlip{
    eventId: number,
    eventName: string,
    eventDescription: string,
    marketId: number,
    marketName: string,
    selectionId: number,
    selectionName: string,
    selectionPrice: number
}

export interface BetSlipState {
    bets: BetSlip[]
}

export const initialState: BetSlipState={
    bets: []
}

const findBetByIndex = (state: BetSlipState ,bet: BetSlip): number => {
    return state.bets.findIndex((b: BetSlip) => b.marketId === bet.marketId && b.selectionId === bet.selectionId );
} ;

const betSlipSlice = createSlice({
    name:'betSlips',
    initialState,
    reducers:{
        addRemoveBet: (state, action: PayloadAction<BetSlip>)=>{
            const alreadyExistsIndex: number = findBetByIndex(state, action.payload);
            if(alreadyExistsIndex === -1 ){
                state.bets.push(action.payload);
            }else{
                state.bets.splice(alreadyExistsIndex, 1);
            }
        },
        removeBet: (state, action: PayloadAction<BetSlip>)=>{
            const alreadyExistsIndex: number = findBetByIndex(state, action.payload);
            if(alreadyExistsIndex >= 0){
                state.bets.splice(alreadyExistsIndex, 1);
            }
        }
    }
});

export const {addRemoveBet, removeBet} = betSlipSlice.actions;

export default betSlipSlice.reducer;