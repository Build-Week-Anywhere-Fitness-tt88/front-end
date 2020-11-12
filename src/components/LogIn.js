import React, {useState} from 'react';
import * as yup from 'yup';

const initialFormState = {
    username: '',
    password: ''
};

export default function LogIn (props) {
    // receive function to set current user as props
    const {getUser} = props;

    // hold state for user login form
    const [formState, setFormState] = useState(initialFormState);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User LogIn:", formState);
        setFormState(initialFormState);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newUser = {...formState, [name]: value};
        validateChange(name, value);
        setFormState(newUser);
    }

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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}