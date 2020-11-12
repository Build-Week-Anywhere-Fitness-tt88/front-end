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

    // set up formSchema with yup for form validation
    const formSchema = yup.object().shape({
        username: yup.string().required().min(6, 'Username must be at least 6 characters.'),
        password: yup.string().required().min(8,'Password must be at least 8 characters')
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User LogIn:", formState);
        setFormState(initialFormState);
    }

    const handleChange = (e) => {
        const newUser = {...formState, [e.target.name]: e.target.value};
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
                </form-group>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}