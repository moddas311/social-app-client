import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const About = () => {

    const { user, loading } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserDetails(data);
            })
    }, [user?.email]);


    if (loading) {
        return <progress className="progress w-full"></progress>
    }

    return (
        <div className='flex justify-center py-10'>
            <div>
                <img className='rounded-full' src={userDetails.image} alt="" />
                <p className='text-orange-600 text-center text-5xl'><span className='text-blue-     600'>Name<span className='text-black'>:</span> </span> {userDetails.name}</p>
                <p className='text-center mt-3'>Email: {userDetails.email}</p>
            </div>
        </div>
    );
};

export default About;