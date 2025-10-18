import reducer, { initialState, eventAsyncThunk, EventState, Event } from './eventSlice';

describe('eventSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchAll.pending', () => {
    const action = { type: eventAsyncThunk.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: '',
    });
  });

  it('should handle fetchAll.fulfilled', () => {
    const mockEvents: Event[] = [
      { id: 1, name: 'Match 1', description: 'Team A vs Team B', markets: [] },
      { id: 2, name: 'Match 2', description: 'Team C vs Team D', markets: [] },
    ];

    const action = {
      type: eventAsyncThunk.fulfilled.type,
      payload: mockEvents,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      response: mockEvents,
    });
  });

  it('should handle fetchAll.rejected', () => {
    const action = {
      type: eventAsyncThunk.rejected.type,
      payload: 'Error fetching data',
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error fetching data',
    });
  });
});
