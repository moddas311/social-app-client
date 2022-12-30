import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Login = () => {

    const { logIn, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const handleLogin = (data) => {
        setLoginError('');
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate(from, { replace: true });
                }
            })
            .catch(er => {
                toast.error(er.message);
                setLoginError(er.message);
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user);
                if (user) {
                    saveUser(user.displayName, user.email, user.photoURL);
                    toast.success(`Welcome ${user.displayName}`);
                    navigate(from, { replace: true });
                };
            })
            .catch(er => console.error(er))
    }

    const saveUser = (name, email, image) => {
        const user = { name, email, image }
        fetch('https://social-media-server-virid.vercel.app/users', {
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

    return (
        <div className='flex justify-center items-center'>
            <div className='py-10'>
                <div className='text-center '>
                    <h2 className='text-xl text-green-400'>Login</h2>
                    <h3 className='text-2xl text-sky-400'>Welcome Back</h3>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='email'
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='pt-3 text-[12px] text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password'
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='pt-3 text-[12px] text-red-600'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                    <div>
                        {
                            loginError &&
                            <p className='pt-3 text-[12px] text-red-600'>{loginError}</p>
                        }
                    </div>
                </form>
                <p className='mt-3'>
                    <span className='text-blue-300'>New to Phone's Bazar's?
                        <Link className='text-red-400' to='/register'> Create new account</Link>
                    </span>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-accent w-full'>
                    Login With Google
                </button>
            </div>
        </div>
    );
};

export default Login;