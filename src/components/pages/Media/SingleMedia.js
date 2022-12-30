import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const SingleMedia = ({ singleStatus }) => {

    // const { user } = useContext(AuthContext);
    const [loved, setLoved] = useState(false);

    const { image, status } = singleStatus;

    const handleClicked = () => {
        setLoved(!loved);
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <p>{status}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleClicked}>
                        {
                            loved ?
                                <AiFillHeart className='text-red-600 ' />
                                :
                                <AiOutlineHeart />
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleMedia;