import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);
    };

    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)
        
        validateValues(newValues);



        setValues(newValues);
    };

    const validateValues = (toValidate) => {
        console.log(toValidate)
    }


    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    };
};