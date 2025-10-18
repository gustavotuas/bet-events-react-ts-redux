import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import eventJson from "../../data/events.json";

export interface Selection{
    id: number,
    name: string,
    price: number
}

export interface Market{
    id: number,
    name: string,
    selections: Selection[]
}

export interface Event {
    id: number,
    name: string,
    description: string,
    markets: Market[]
}

export interface EventState  {
    isLoading: boolean,
    error: string,
    response: Event[]
}

export const initialState: EventState  = {
    isLoading: false,
    error: '',
    response: []
}

export const eventAsyncThunk = createAsyncThunk<Event[]>(
    "events/fetchAll",
    async(_, {rejectWithValue}) =>{
        try {
            // const url = new URL("http://demo6181469.mockable.io/events/fetchAll");
            // const response = await fetch(url);
            // if(!response.ok) throw new Error("Error fetching data.");
            // const data : Event[] = await response.json();
            const data: Event[] = eventJson;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const eventSlice = createSlice({
    name:"events",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(eventAsyncThunk.pending, (state)=>{
            state.isLoading = true;
            state.error = '';
        })
        .addCase(eventAsyncThunk.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.isLoading = false;
            state.response = action.payload;
        })
        .addCase(eventAsyncThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
});

//export const {startLoading, setError, setEventState} = eventSlice.actions;

export default eventSlice.reducer;