import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';



const Register = () => {

    const { createUser, updateUserProfile, verifyEmail, setLoading, googleLogin } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = "63c5a465131ad915049433acceb5a5fb";



    const handleRegister = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;


        setRegisterError('');


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {

                // createUser
                createUser(data.email, data.password)
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        updateUserProfile(data.name, imageData.data.display_url)
                            .then(
                                verifyEmail()
                                    .then(() => {
                                        saveUser(data.name, data.email, imageData.data.display_url);
                                        toast.success('Please check your e mail froe verification!');
                                        navigate('/');
                                    })
                            )
                            .catch(er => console.error(er));
                    })
                    .catch(er => {
                        setLoading(false);
                        console.error(er);
                    })
                    .catch(er => {
                        console.error(er.message);
                    })
            });

        const saveUser = (name, email, image) => {
            const user = { name, email, image }
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }


    }




    //     createUser(data.email, data.password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user);
    //             toast.success('User Created Successfully');
    //             navigate('/');

    //             // update
    //             const profile = {
    //                 displayName: data.name,
    //             }

    //             fetch(url, {
    //                 method: 'POST',
    //                 body: formData
    //             })
    //                 .then(res => res.json())
    //                 .then(imgData => {
    //                     if (imgData.success) {
    //                         profile.photoURL = imgData.data.url;
    //                         console.log(profile.photoURL);
    //                         updateUser(profile)
    //                             .then(() => {
    //                                 saveUser(data.name, data.email);

    //                             })
    //                             .catch(er => {
    //                                 toast.error(er.message);
    //                             })
    //                     }
    //                 })
    //         })
    //         .catch(err => {
    //             toast.error(err.message);
    //             setRegisterError(err.message);
    //         });
    // }

    // const saveUser = (name, email) => {
    //     const user = { name, email }
    //     fetch('', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         })



    return (
        <div className='flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-center text-xl text-green-400'>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type='text'  {...register("name", {
                            required: 'Without your name you can not register'
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-[12px] text-red-600 pt-3'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Profile Photo</span>
                        </label>
                        <input type='file' {...register("image", {
                            required: 'image is required',
                        })} />
                        {errors.password && <p className='text-[12px] text-red-600 pt-3'>{errors.password.message}</p>}
                    </div >
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='email' {...register("email", {
                            required: 'Email is required'
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-[12px] text-red-600 pt-3'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password' {...register("password", {
                            required: 'Password is Required',
                            minLength: { value: 6, message: 'Your password must be at least 6 characters or longer' },
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-[12px] text-red-600 pt-3'>{errors.password.message}</p>}
                    </div >
                    <input className='btn btn-accent w-full mt-5' value='Register' type="submit" />
                    {
                        registerError && <p className='text-[12px] text-red-600 pt-3'>{registerError}</p>
                    }
                </form>
                <p className='mt-3'>
                    <span>Already have an account?
                        <Link className='text-secondary' to='/login'> Please Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
