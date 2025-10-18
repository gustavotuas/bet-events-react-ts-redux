import React, { useEffect } from 'react';
import './App.css';
import EventCard from './components/EventCard';
import useEvent from './hooks/useEvent';
import { LinearProgress, Alert } from '@mui/material';
import { Event } from './redux/event/eventSlice';
import BetSlipCard from './components/BetSlipCard';

const App: React.FC = () => {

  const {isLoading, error, response, fetchEvents} = useEvent();
  const notDataFound = !isLoading && !error && response.length === 0;

  useEffect(()=>{
    fetchEvents();
  },[]);

  return (
    <>
    {isLoading && <LinearProgress />}
    {error && <Alert severity='error'>{error}</Alert>}
    {notDataFound && <Alert severity='info'>Not data found.</Alert>}
    <BetSlipCard />
    {response.map((event: Event) => (  <EventCard key={event.id} event={event} />) )}
    </>
  );
}

export default App;
