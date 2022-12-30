import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import SingleMedia from './SingleMedia';

const Media = () => {

    const { loading } = useContext(AuthContext);

    const [allStatus, setAllStatus] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allStatus')
            .then(res => res.json())
            .then(data => {
                setAllStatus(data);
            })
    }, []);

    if (loading) {
        return <progress className="progress w-full"></progress>
    }

    return (
        <div className='grid justify-center gap-5  py-10'>
            {
                allStatus.map(singleStatus =>
                    <SingleMedia
                        key={singleStatus._id}
                        singleStatus={singleStatus}
                    />
                )
            }
        </div>
    );
};

export default Media;