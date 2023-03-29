// import { useState } from 'react';
// import { useAuthContext } from '../contexts/AuthContext';

// export const useToast = (status) => {
//     const [values, setValues] = useState(initialValues);
//     const { displayToast } = useAuthContext();

//     var toastData;



//     const changeHandler = (e) => {
//         setValues(state => ({ ...state, [e.target.name]: e.target.value }));
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();

//         onSubmitHandler(values);
//     };

//     const changeValues = (newValues) => {
//         // TODO: Validate newValues shape (like initialValues)

//         setValues(newValues);
//     };

//     return {
//         toastData
//     };
// };