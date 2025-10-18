import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./event/eventSlice";
import  betSlipReducer from "./betSlip/betSlipSlice";

export const store = configureStore({
    reducer:{
        events: eventReducer,
        bets: betSlipReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;