import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const SignUp = () => {
  const nav = useNavigate()
  const [error,setError] = useState(null)
  const initialValues = {
    name: '',
    email:'',
    password: '',
    cpassword:''
  }
  const schema = Yup.object().shape({
    name:Yup.string().min(3).required("Please Enter the name"),
    email: Yup.string().min(3).email("Please Enter Valid Email").required("Please Enter Your username"),
    password: Yup.string().min(3).required("Please Enter Your Password"),
    cpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  const {values,handleBlur,handleChange,handleSubmit,errors}= useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit:(values)=>{
      axios.post('http://localhost:3001/register',{name:values.name,email:values.email,password:values.password,cpassword:values.cpassword})
      .then(result => {console.log(result)  
      nav('/home')
      alert("You have succesfully signed up")})
      .catch(err=>setError(err))
      // console.log(values);
    }
  })
  return (
         <>
    <div className=" sm:mx-auto sm:w-full sm:max-w-sm  p-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_b2b52bf26a769b861fae19c5f65643cf/guvi.png"
          alt="Your Company"
        />
        <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign-Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg shadow-green-200/40 shadow-lg p-8 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.name && <small className="text-red-700">{errors.name}</small>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.email && <small className="text-red-700">{errors.email}</small>}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.password && <small className="text-red-700">{errors.password}</small>}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Conform-Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type='password'
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errors.cpassword && <small className="text-red-700">{errors.cpassword}</small>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign in
            </button>
            <p class="mt-10 text-center text-sm text-gray-500">
            Already having an account?
            <Link to='/signin' className="font-semibold leading-6 text-green-600 hover:text-green-500">click here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </>
   
  )
}

export default SignUp