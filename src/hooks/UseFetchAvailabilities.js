import { useState } from "react";

const UseFetchAppointment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    function fetchAllAppointment() {
        setLoading(true);
        fetch('http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/all')
            .then((response) => response.json())
            .then((appointment) => {
                console.log(appointment);
                setData(appointment);
                // setData([
                //     {
                //       id: 1,
                //       title: 'event 1',
                //       start: '2023-06-08T12:00:00',
                //       end: '2023-06-08T12:30:00',
                //       color: 'green',
                //       disable: true
                //     },
                //     {
                //       id: 2,
                //       title: 'event 2',
                //       start: '2023-06-07T16:00:00',
                //       end: '2023-06-07T18:00:00',
                //     },
                //     {
                //         id: 2,
                //         title: 'event 3',
                //         start: '2023-06-09T10:30:00',
                //         end: '2023-06-09T11:00:00',
                //       },
                //       {
                //         id: 2,
                //         title: 'event 3',
                //         start: '2023-06-09T16:30:00',
                //         end: '2023-06-09T17:00:00',
                //       },
                //       {
                //         id: 3,
                //         title: 'event 33',
                //         start: '2023-06-12T23:30:00',
                //         end: '2023-06-12T24:00:00',
                //       }
                //   ])
                setLoading(false);
            })
            .catch(error => {
                console.log('my error', error);
                setLoading(false)
            })
    }

    return { fetchAllAppointment, data, loading, setLoading };
}


export default UseFetchAppointment;
