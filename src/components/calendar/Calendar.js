import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import  Modal  from './Modal';
import { Button } from '@mui/material';
import UseFetchAppointment from '../../hooks/UseFetchAppointment';


const events = [
    {
      id: 1,
      title: 'event 1',
      start: '2023-06-08T12:00:00',
      end: '2023-06-08T13:00:00',
    },
    {
      id: 2,
      title: 'event 2',
      start: '2023-06-07T16:00:00',
      end: '2023-06-07T18:00:00',
    }
  ];

const Calendar = () => {
    
    const [open, setOpen] = useState(false);
    const {data, loading,fetchAllAppointment } = UseFetchAppointment();


    useEffect(()=>{
        fetchAllAppointment();
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const handleDateSelect = (selectInfo)=>{
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
        // })
        // }
    }

    const handleEventClick = (clickInfo)=>{
        handleClickOpen();
        // console.log(clickInfo);
        // if (prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove()
        // }
    }


  return (
    <div>
        <h1>Calendar</h1>

        {
            !loading && 
                <main>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    initialEvents={data}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    timeZone={'UTC'}
                />
            </main>
        }

        

        <Modal open={open} handleClose={handleClose} />

    </div>
  )
}

export default Calendar;