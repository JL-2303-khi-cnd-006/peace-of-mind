import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from './Modal';

import UseFetchAppointment from '../../hooks/UseFetchAvailabilities';
import moment from 'moment';

const Calendar = () => {

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { data, loading, setLoading, fetchAllAppointment } = UseFetchAppointment();
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    fetchAllAppointment();
  }, [])

  useEffect(() => {
    if (data) {
      const formattedEvents = data.map(appointment => {
        const isPast = new Date(appointment.start) < new Date();
        console.log(isPast);
        return {
          id: appointment.id,
          title: isPast ? 'Past Event' : 'Future Event',
          start: appointment.created,
          end: appointment.created,
          color: isPast ? 'green' : 'grey',
        };
      });
      setEvent(formattedEvents);
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDateSelect = (selectInfo) => {

    handleClickOpen();
  }

  const handleEventClick = (clickInfo) => {
    
    console.log(clickInfo.event.endStr);    
    let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');
    console.log(dateNow)

    if(clickInfo.event.endStr < dateNow){
      console.log( 'Date is before');
      
    }else{
      setSelectedEvent(clickInfo.event);
      handleClickOpen();
    }
  }

  const bookAnAppointment = async () => {
    setLoader(true);
    setLoading(true);
    try {
      console.log(selectedEvent);
      let appointment= {
        availability_id : selectedEvent.id,
        patient_id : 3,
        confirmed : false,
        deleted : 0
      }

      const response = await fetch('http://appointment.us-west-2.elasticbeanstalk.com/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
  
      if (response.ok) {
        const responseData = await response.json();

        let newData = data.map(item=>{
          if(item.id === responseData.availability_id){
            return {...item, color: 'red'}
          }
          else{
            return item;
          }})
          
        setEvent([...newData]);
        
        setLoading(false);
        setLoader(false);
        setOpen(false);
        console.log(data);
        console.log('Appointment submitted successfully');
      } else {
        console.error('Failed to submit appointment');
      }
    } catch (error) {
      console.error('Failed to submit appointment:', error);
    }
  };


  return (
    <div>
      <h1>Calendar</h1>

      {
        !loading && event.length > 0 && (
          <main>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              initialView='timeGridWeek'
              editable={false}
              // selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={event}
              select={handleDateSelect}
              eventClick={handleEventClick}
              // timeZone={'UTC'}
            />
          </main>)
      }

      <Modal open={open} handleClose={handleClose} loader={loader} bookAnAppointment={bookAnAppointment} />

    </div>
  )
}

export default Calendar;