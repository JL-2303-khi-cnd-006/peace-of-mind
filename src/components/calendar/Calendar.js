import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from './Modal';
import { Button } from '@mui/material';

import UseFetchAppointment from '../../hooks/UseFetchAppointment';
import moment from 'moment';

const Calendar = () => {

  const [open, setOpen] = useState(false);
  const { data, loading, fetchAllAppointment } = UseFetchAppointment();
  const [event, setEvent] = useState([]);


  useEffect(() => {
    fetchAllAppointment();
  }, [])

  useEffect(() => {

    if (data) {
      const formattedEvents = data.map(appointment => ({
        id: appointment.id,
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
        color: appointment.color

      }));

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

    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect()

    // if (title) {
    // calendarApi.addEvent({
    //     id: events.length++,
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    // })data
    // }
  }

  const handleEventClick = (clickInfo) => {
    
    console.log(clickInfo.event.endStr);
    //const dateIsBefore = moment('2023-06-08T10:15:00Z').isBefore(moment(clickInfo.event.endStr));
    
    let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');

    console.log(dateNow)

    if(clickInfo.event.endStr < dateNow){
      
      console.log( 'Date is before');
      
    }else{
      
      // console.log(clickInfo.event.endStr);
      handleClickOpen();
    }


    // console.log(clickInfo);
    // if (prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove()
    // }
  }


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
              timeZone={'UTC'}
            />
          </main>)
      }

      <Modal open={open} handleClose={handleClose} />

    </div>
  )
}

export default Calendar;