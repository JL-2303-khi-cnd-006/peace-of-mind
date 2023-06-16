import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Modal from './Modal';

import UseFetchAvailabilities from '../../hooks/UseFetchAvailabilities';
import moment from 'moment';
import UseFetchAppointment from '../../hooks/UseFetchAppointment';

import './Calendar.css'

const Calendar = () => {

  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { data, loading, setLoading, fetchAllAvailability } = UseFetchAvailabilities();
  const { appointmentData, fetchAllAppointment } = UseFetchAppointment();
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    fetchAllAvailability();
    fetchAllAppointment();
  },[])

  useEffect(() => {
    if (data && appointmentData) {
      const formattedEvents = data.map(availabilities => {
        
        const startDate = new Date(availabilities.date);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

        const isPast = new Date(startDate) < new Date();
        const isBooked = appointmentData.some(item => item.availability_id === availabilities.id);

        
        if (isPast) {
          return {
            id: availabilities.id,
            title: 'Past Appointment',
            start: availabilities.date,
            end: endDate.toISOString(),
            color: '#888888',
          };
        } else {
          return {
            id: availabilities.id,
            title: isBooked ? 'Booked Appointment' : 'Available Appointment',
            start: availabilities.date,
            end:  endDate.toISOString(),
            color: isBooked ? '#dc3545' : '#007bff',
          };
        }
      });

      console.log(formattedEvents);
    
      setEvent(formattedEvents);
    }
  }, [data, appointmentData]);

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
    
    console.log(clickInfo.event);    
    let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');
    console.log(dateNow)

    if(clickInfo.event.startStr < dateNow || clickInfo.event.backgroundColor === '#dc3545' ){
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

        let newData = event.map(item=>{
          if(item.id === responseData.availability_id){
            return { ...item , title : 'Booked', color: '#dc3545' }
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
    <div style={{ height :'50%', width: '50%' }}>
      <h1>Calendar</h1>

      {
        !loading && event.length > 0 && (
          <main>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin , bootstrapPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              initialView='timeGridWeek'
              editable={false}
              // selectable={true}
              themeSystem = 'bootstrap'
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={event}
              select={handleDateSelect}
              eventClick={handleEventClick}
              height={700}
            />

          </main>)
      }

    <Modal open={open} handleClose={handleClose} loader={loader} bookAnAppointment={bookAnAppointment} />

    </div>
  )
}

export default Calendar;