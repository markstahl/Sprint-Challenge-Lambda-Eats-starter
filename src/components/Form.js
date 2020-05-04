import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function Form() {
    const [post, setPost] = useState([]);
    const [formState, setFormState] = useState({
        name: "",
        address: "",
        size: "",
        pepperoni:"",
        onion: "",
        sausage:"",
        peppers: "",
        special: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        address: "",
        size: "",
        pepperoni:"",
        onion: "",
        sausage:"",
        peppers: "",
        specialrequest: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        name: yup.string()
              .required("Please enter a name!"),
        address: yup.string()
              .required("Please enter a valid address!"),      
        size: yup.string(),
        specialrequest: yup.string(),
        pepperoni: yup.mixed(),
        sausage: yup.mixed(),
        onions: yup.mixed(),
        peppers: yup.mixed() 
    });

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name, event.target.address)
        .validate(event.target.value)
        .then(valid => {
            setErrors({...errors,[event.target.name]: "" });
        })
        .catch(err => setErrors({...errors, [event.target.name]: err.errors[0]}));
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid);
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                      name: "",
                      address: "",
                      size: "",
                      pepperoni:"",
                      onions: "",
                      sausage:"",
                      peppers: "",
                      specialrequest: "",
                });
            })
            .catch(err => console.log(err.response));

    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                    data-cy="name"
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="address">
                Address:
                <input
                    id="address"
                    type="text"
                    name="address"
                    onChange={inputChange}
                    value={formState.address}
                    data-cy="address"
                />
                {errors.name.length > 0 ? <p className="error">{errors.address}</p> : null}
            </label>
            
            <label htmlFor="size">
                Size:
                <select
                    id="size"
                    name="size"
                    onChange={inputChange}>
                    <option value ="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                {errors.size.length > 0 ? (<p className="error">{errors.size}</p>) : null}
            </label>
            <div className="toppings">
                <h1>Toppings</h1>
                <label htmlFor="checkbox">
                    <input 
                        id="pepperoni"
                        type="checkbox"
                        name="pepperoni"
                        data-cy="pepperoni"
                        onChange={inputChange}
                        checked={formState.pepperoni}
                    /> Pepperoni
                      <input 
                        id="sausage"
                        type="checkbox"
                        name="sausage"
                        data-cy="sausage"
                        onChange={inputChange}
                        checked={formState.sausage}
                    /> Sausage
                      <input 
                        id="onions"
                        type="checkbox"
                        name="onions"
                        data-cy="onions"
                        onChange={inputChange}
                        checked={formState.onions}
                    /> Onions
                      <input 
                        id="peppers"
                        type="checkbox"
                        name="peppers"
                        data-cy="peppers"
                        onChange={inputChange}
                        checked={formState.peppers}
                    /> Peppers
                </label>
            </div>
            <label htmlFor="specialrequest">
                Please Enter Any Special Requests
                <textarea
                    id="specialrequest"
                    name="specialrequest"
                    onChange={inputChange}
                    value={formState.specialrequest}
                    data-cy="specialrequest"
                />
                {errors.specialrequest.length > 0 ? (
                    <p className="error">{errors.specialrequest}</p>
                ) : null }
            </label>
            
            <button disabled={isButtonDisabled} type ="submit">
                Place Order
            </button>
            {/* <pre>{JSON.stringify(post,null,2)}</pre> */}
        </form>
    )
}