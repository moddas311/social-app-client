import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';


const Home = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const { loading } = useContext(AuthContext);


    const handleUpload = data => {
        const image = data.image[0];
        const formData = new FormData();



        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const allStatus = {
                        image: imgData.data.url,
                        status: data.status
                    }

                    fetch('https://social-media-server-virid.vercel.app/allStatus', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(allStatus)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Uploaded your status.!');
                        });
                }
            });
    }

    if (loading) {
        return <progress className="progress w-full"></progress>
    }

    return (
        <div className='flex justify-center items-center border-rounded bg-base-100 shadow-xl'>
            <div className='w-96 p-10'>
                <h2 className='text-2xl text-center text-sky-400'>Upload Your Photo & Status</h2>
                <form onSubmit={handleSubmit(handleUpload)}>
                    <div className="form-control py-3 w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type='file' {...register("image", {
                            required: 'image is required',
                        })} />
                        {errors.password && <p className='text-[12px] text-red-600 pt-3'>{errors.password.message}</p>}
                    </div >
                    <div className="form-control w-full max-w-xs">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Type Your Status</span>
                            </label>
                            <textarea {...register("status", {
                                required: 'Status are required'
                            })} className="textarea textarea-bordered h-24" placeholder="Write your status here."></textarea>
                        </div>
                        {errors.email && <p className='text-[12px] text-red-600 pt-3'>{errors.email.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-5' value='Submit' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Home;