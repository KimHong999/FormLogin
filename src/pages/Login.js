"use client";
import Button from "@/Components/Button";
import MyInput from "@/Components/MyInput";
import { setCookies } from "@/actions/cookie";
import { create } from "@/actions/login";
import { UseSesson } from "@/store/UseSesson";
import { storeToken } from "@/store/storeToken";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import * as yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setSesson } = UseSesson();
  const [isUserRegisters, setIsUserRegisters] = useState(true);
  const [isloading, setIsLoading] = useState(false)

  const SignupSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("please input email"),
    password: yup.string().required("please input password").min(5),
  });

  const onSubmit = async  (values) => {

    const newLogin ={
      email: values.email,
      password: values.password
    }

    console.log("email", values.email)
    console.log("password", values.password)

    try{
      const response = await create(newLogin)
      console.log("values", newLogin)
      console.log("response", response)
      if(response.token){
        setIsLoading(true)
        setIsUserRegisters(true)
        setCookies(response.token)
        router.push('/')
      }

    } catch (error) {
      console.log("error", error)
      setIsLoading(false)
    }
 
    // // const registerEmail = "admin@gmail.com";
    // // if (values.email !== registerEmail) {
    // //   setIsUserRegisters(false);
    // //   setIsLoading(false)
    // //   return;
    // // }

    // // const token = 'https://fakestoreapi.com/users';

    // try{
    //   // const res =  axios.post('https://course-web-service.onrender.com/api/v1/auth/login',values)
    //   // console.log("res", res.data)
    //   // console.log(values)
    //   // setIsUserRegisters(true);
    //   const res = await fetch('https://course-web-service.onrender.com/api/v1/auth/login',{
    //     method: "POST",
    //     body: JSON.stringify(values)
    //   })
    //   if(res){
    //     console.log("res",res)
    //     // storeToken()
    //   } else {
    //     console.log("somthing wrong")
    //   }
    //   setIsLoading(true)
    //   // setSesson({ email: values.email });
    //   router.push("/");
    // } catch (error) {
    //   console.log("error", error);

    // }

    
    // // Cookies.set('token', token)

   
    // // console.log("Value", values);

    
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        // validationSchema={SignupSchema}
        onSubmit={(values, actions)=>{
          onSubmit(values)
        }}
      >
        <Form className="w-96">
          <div className="text-center font-bold text-[35px] p-5">
            LogIn Form
          </div>
          <div>
            <Field
              component={MyInput}
              label="Email"
              name="email"
              placeholder="email"
              type="text"
              showError={true}
            />

            {!isUserRegisters && (
              <div className="text-red-500">
                User not yet registered. Please register first.
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <div>
                  <Field
                    component={MyInput}
                    name="password"
                    id="password"
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                  />
                </div>

                <button
                  className="absolute top-2/4 right-2 transform -translate-y-1/2"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
          </div>

          <div className="mt-5 w-full">
            <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded" type="submit" >

              {
                isloading ? (<ThreeDots
                  visible={true}
                  height="25"
                  width="80"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass="flex justify-center"
                  />) : "Login"
              }
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
