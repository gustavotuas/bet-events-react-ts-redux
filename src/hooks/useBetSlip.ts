import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {addRemoveBet, BetSlip, removeBet} from  "../redux/betSlip/betSlipSlice";

const useBetSlip = () =>{

    const {bets} = useSelector((state: RootState) => state.bets);
    const dispatch = useDispatch<AppDispatch>();

    return{
        bets,
        addRemoveBet: (betSlip: BetSlip)=> dispatch(addRemoveBet(betSlip)),
        removeBet: (betSlip: BetSlip) => dispatch(removeBet(betSlip))
    }
};

export default useBetSlip;
