import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {eventAsyncThunk} from "../redux/event/eventSlice";

const useEvent = () =>{

    const {isLoading, error, response} = useSelector((state: RootState) => state.events);
    const dispatch = useDispatch<AppDispatch>();

    return{
        isLoading,
        error,
        response,
        fetchEvents: () => dispatch(eventAsyncThunk())
    };
};


export default useEvent;