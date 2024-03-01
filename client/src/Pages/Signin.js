import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Signin = () => {
  const nav = useNavigate()
  const [error,setError] = useState(null)
  const initialValues = {
    email: '',
    password:''
  }
  const schema = Yup.object().shape({
    email: Yup.string().min(3).required("Please the valid email").required('Please enter you email'),
    password: Yup.string().min(3).required("Please Enter ypur password")
  })
    axios.default.withCredentials = true;
  const{handleSubmit,handleChange,handleBlur,errors,values} = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit:(values)=>{
      axios.post('https://guvi-task-git-main-prospers-projects-d9ccee31.vercel.app/login',{email:values.email,password:values.password})
      .then(result => {console.log(result)
        if(result.data === "Success"){
          nav('/home')
          alert("You have succesfully signed in")
        }else{
          setError(result.data)
        }
      })
      .catch(err=>console.log(err))
     }
  })
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_b2b52bf26a769b861fae19c5f65643cf/guvi.png"
          alt="Your Company"
        />
        <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg shadow-green-200/40 shadow-lg p-8 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 border border-gray-100">
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
              Email address
            </label>
            <div className="my-2">
              <input
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.email && <small className="text-red-700">{errors.email}</small>}

          <div className='my-4'>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="my-2">
              <input
                id="password"
                name="password"
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.password && <small className="text-red-700">{errors.password}</small>}
          <div className='my-2'>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign In
            </button>
            <p class="mt-10 text-center text-sm text-gray-500">
            Doesn't have an account?
            <Link to='/' className="font-semibold leading-6 text-green-600 hover:text-green-500">join us</Link>
            </p>
            <p className='text-xl text-center text-red-500 my-4'>{error}</p>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default Signin
