import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const initialFormState = {
    username: '',
    password: '',
    instructor: false
};

export default function SignUp (props) {
    // receive function to set current user as props
    const {getUser} = props;
    // use hook to get history props
    const history = useHistory();

    // hold state for user signup form
    const [formState, setFormState] = useState(initialFormState);

    // hold button disabled state to control when form can submit
    const [buttonDisabled, setButtonDisabled] = useState(true);
 
    // hold state for errors from yup validation
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })
    
    const formSchema = yup.object().shape({
        username: yup.string().required('Username is required.').min(6, 'Username must be at least 6 characters.'),
        password: yup.string().required('Password is required.').min(8,'Password must be at least 8 characters.')
    });

    const validateChange = (name, value) => {
        yup
        .reach(formSchema, name)
        .validate(value)
        .then(valid => {
            setErrors({...errors, [name]: ''});
        })
        .catch(err => {
            setErrors({...errors, [name]: err.errors[0]})
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('newuserInfo:', formState);

        // set up axios POST request to sign up a new user
        axios
        .post('https://reqres.in/api/users', formState)
        .then(response => {
            console.log(response.data);
            const username = response.data.username;
            getUser(response.data)
            let newUserMessage = ''
            if (response.data.instructor) {
                newUserMessage = "As an instructor, you can get started creating classes on your dashboard.";
                alert(`Hi, ${username}, Thanks for joining Anywhere Fitness! ${newUserMessage}`);
                history.push('/instructorPage');             
            }else{
                newUserMessage = "Start searching for the classes that work for you on your personal dashboard.";
                alert(`Hi, ${username}, Thanks for joining Anywhere Fitness! ${newUserMessage}`);
                history.push('/clientPage');
            }
            
        })
        setFormState(initialFormState);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox'? e.target.checked: e.target.value;
        const newUser = {...formState, [name]: value};
        if (name != 'instructor'){
            validateChange(name, value);
        }
        setFormState(newUser);
    }
    
   // Monitor changes to check when yup validation is valid
    // When valid will enable submit button by updating button state
    useEffect(()=>{
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
          });
    },[formState]);

    return(
        <div className='signup-wrapper'>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
                <form-group>
                    <label htmlFor='username'>Username:</label>
                    <input type='text'
                    id='username'
                    name='username'
                    value={formState.username}
                    required
                    onChange={handleChange}
                    />
                    {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}
                </form-group>
                <br />
                <form-group>
                    <label htmlFor='password'>Password:</label>
                    <input type='password'
                    id='password'
                    name='password'
                    value={formState.password}
                    required
                    onChange={handleChange}
                    />
                    {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
                </form-group>
                <br />
                <form-group>
                    <label htmlFor='instructor'>Instructor:</label>
                    <input type='checkbox'
                    id='instructor'
                    name='instructor'
                    checked={formState.instructor}
                    onChange={handleChange}
                    />
                </form-group>
                <button disabled={buttonDisabled} type='submit'>Submit</button>
            </form>
        </div>
    )

}