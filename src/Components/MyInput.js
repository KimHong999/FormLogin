import { TextInput } from "flowbite-react";
import { ErrorMessage } from "formik";
import React from "react";

const MyInput = ({label, showError, field, ...props}) => {
    return(
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <TextInput {...field} {...props} />
            {showError && (
                <ErrorMessage name={field.name}>{msg => <div className="text-red-500" >{msg}</div>}</ErrorMessage>
            )}
        </div>
    )
}
export default MyInput;