import { useState } from "react";

const UseFetchAppointment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    function fetchAllAppointment() {
        setLoading(true);
        fetch('http://localhost:8080/appointments/getall')
            .then((response) => response.json())
            .then((appointment) => {
                console.log(appointment);
                setData(appointment);
                setLoading(false);
            })
            .catch(error => {
                console.log('my error', error);
                setLoading(false)
            })
    }

    return { fetchAllAppointment, data, loading };
}


export default UseFetchAppointment;
