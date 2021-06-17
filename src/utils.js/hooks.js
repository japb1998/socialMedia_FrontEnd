import {useState} from 'react';

export const useForm = (callback,initialState = {}) => {
    const [values,setValues] = useState(initialState);
    function onChange ({target}) {
        const {value,name} = target;
        setValues({
            ...values, [name]: value 
        })
        // console.log(values);
            }
const onSubmit = event => {
    event.preventDefault();
    callback();
}

return {
    onChange,
    onSubmit,
values
}
}