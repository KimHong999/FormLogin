"use client";
import Button from "@/Components/Button";
import MyInput from "@/Components/MyInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import React from "react";
import * as yup from "yup";

const Register = () => {

  const router = useRouter();

  const SignupSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("please input name"),
    gender: yup.string().required("please select gender"),
    password: yup.string().min(5).required("Please input password"),
    email: yup.string().email("Invalid email").required("please input email"),
    phone: yup.string().min(9).required("please input phone number"),
    comfirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Please Comfirm Password"),
  });

  const onSubmit = (values) => {
    console.log("Register:", values)
    router.push('/')
  }

  return (
    <div className="p-5">
      <div className="text-center font-bold text-[35px]">Register Form</div>
      <Formik
        initialValues={{
          name: "",
          gender: "",
          password: "",
          email: "",
          phone: "",
          comfirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        <div>
          <Form className="p-5">
            <div className="grid grid-cols-3 gap-4">
              <Field
                component={MyInput}
                label="name"
                type="text"
                name="name"
                placeholder="name"
                showError={true}
              />

              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <Field as="select" name="gender" className="w-full rounded-md">
                  <option value="">Please Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender">{msg => <div className="text-red-500" >{msg}</div>}</ErrorMessage>
              </div>

              <Field
                component={MyInput}
                label="Password"
                type="password"
                name="password"
                placeholder="password"
                showError={true}
              />

              <Field
                component={MyInput}
                label="Email"
                type="email"
                name="email"
                placeholder="email"
                showError={true}
              />

              <Field
                component={MyInput}
                label="Phone Number"
                type="text"
                name="phone"
                placeholder="phone number"
                showError={true}
              />

              <Field
                component={MyInput}
                label="Comfirm Password"
                type="password"
                name="comfirmPassword"
                placeholder="Comfirm Password"
                showError={true}
              />
            </div>
            <div className="flex justify-end">
              <Button label="Register" type="submit" className="mt-5"  />
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Register;
