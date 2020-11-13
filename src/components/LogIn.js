import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';


const initialFormState = {
    username: '',
    password: ''
};

export default function LogIn (props) {
    // receive function to set current user as props
    const {getUser} = props;
   
    // get history props using useHistory hook
    const history = useHistory();

    // hold state for user login form
    const [formState, setFormState] = useState(initialFormState);

    // hold state for submit button status
    // will prevent form submission if yup validation errors are present
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // hold state for yup validation errors
    const [errors, setErrors] = useState(initialFormState);

    // set up formSchema with yup for form validation
    const formSchema = yup.object().shape({
        username: yup.string().required('Username is requred.').min(6, 'Username must be at least 6 characters.'),
        password: yup.string().required('Password is required').min(8,'Password must be at least 8 characters')
    });

    // use yup.reach to validate inputs at each user input
    // function fired from handleChange function
    const validateChange = (name, value) => {
        yup
        .reach(formSchema, name)
        .validate(value) 
        .then(valid => {
          setErrors({ ...errors, [name]: "" });
        })
        .catch(err => {
          setErrors({ ...errors, [name]: err.errors[0] });
          console.log(err);
        });
    }

    // function fires with button click
    // Will send POST request to BE to log user in
    // If successful, will fire getUser to update state on App component
    // will use useHistory hook to push to url route for client or instructor
    // based on conditional check of BE response.data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User LogIn:", formState);

        // sample axios POST request -- switch to BE when routes are ready
        axios
        .post('https://reqres.in/api/users', formState)
        .then((response)=> {
            console.log(response.data);
            getUser(response.data);
            const currentUser = response.data.username;
            alert(`Success! Welcome Back, ${currentUser}.`);
            if (response.data.instructor){
                history.push('/instructorPage');
            }else{
                history.push('/clientPage');
            }
        })
        .catch((err) => {
            console.log(err);
            alert(`No account exists, please create an account.`);
            history.push('/signup');
        });

        //resets form
        setFormState(initialFormState);
    }

    // function fires with each change to form inputs
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newUser = {...formState, [name]: value};
        validateChange(name, value);
        setFormState(newUser);
    }

    // Monitor changes to check when yup validation is valid
    // When valid will enable submit button by updating button state
    useEffect(()=>{
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
          });
    },[formState])

    return(
        <div className='login-wrapper'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <form-group>
                    <label htmlFor='username'>Username:</label>
                    <input type='text'
                    id='username'
                    name='username'
                    value={formState.username}
                    required
                    onChange={handleChange}
                    />
                    {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
                </form-group>
                <form-group>
                    <label htmlFor='password'>Password:</label>
                    <input type='password'
                    id='password'
                    name='password'
                    value={formState.password}
                    required
                    onChange={handleChange}
                    />
                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                </form-group>
                <button disabled={buttonDisabled} type='submit'>Submit</button>
            </form>
        </div>
    )

}