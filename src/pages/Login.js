"use client";
import Button from "@/Components/Button";
import MyInput from "@/Components/MyInput";
import { UseSesson } from "@/store/UseSesson";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setSesson } = UseSesson();

  const SignupSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("please input email"),
    password: yup.string().required("please input password").min(5),
  });

  const onSubmit = (values) => {
    setSesson({ email: values.email });
    console.log("Value", values);

    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
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
            <Button className="w-ful" label="LogIn" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
