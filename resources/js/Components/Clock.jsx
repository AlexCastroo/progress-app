import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Clock = () => {
    const [time, setTime] = useState(moment(new Date()).format('hh:mm:ss'));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment(new Date()).format('hh:mm:ss'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{time}</>;
};

export default Clock;
