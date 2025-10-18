import reducer, { addRemoveBet, BetSlip, BetSlipState, initialState, removeBet } from "./betSlipSlice";

const exampleBet: BetSlip = {
  eventId: 1,
  eventName: 'eventName',
  eventDescription: 'eventDescription',
  marketId: 1,
  marketName: 'marketName',
  selectionId: 1,
  selectionName: 'selectionName',
  selectionPrice: 3.50,
};

describe('betSlip reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {type: ''})).toEqual(initialState);
    });

    it('should remove the existing with AddRemoveBet', () => {

        const initialState: BetSlipState = {
            bets: [
                exampleBet,
            ]
        };

        expect(reducer(initialState, addRemoveBet(exampleBet))).toEqual({bets: []});
    });

    it('should add a new Bet', () => {

        const initialLocalState: BetSlipState = {
            bets: []
        }

        expect(reducer(initialLocalState,addRemoveBet(exampleBet))).toEqual({bets: [exampleBet]});
    });

    it('should remove existing with RemoveBet', () => {
        const initialLocalState: BetSlipState = {
            bets: [
                exampleBet
            ]
        };

        expect(reducer(initialLocalState, removeBet(exampleBet))).toEqual({bets: []})
    })


})