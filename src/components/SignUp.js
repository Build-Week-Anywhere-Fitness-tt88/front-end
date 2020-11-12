import React, {useState} from 'react';
import * as yup from 'yup';

const initialFormState = {
    username: '',
    password: '',
    instructor: false
};

export default function SignUp (props) {
    // receive function to set current user as props
    const {getUser} = props;
    // hold state for user signup form
    const [formState, setFormState] = useState(initialFormState);
    
    const formSchema = yup.object().shape({
        username: yup.string().required('Username is required.').min(6, 'Username must be at least 6 characters.'),
        password: yup.string().required('Password is required.').min(8,'Password must be at least 8 characters.')
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('newuserInfo:', formState);
        setFormState(initialFormState);
    }

    const handleChange = (e) => {
        const newUser = {...formState, [e.target.name]: e.target.type == 'checkbox'? e.target.checked: e.target.value};
        setFormState(newUser);
    }


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
                </form-group>
                <br />
                <form-group>
                    <label htmlFor='instructor'>Instructor:</label>
                    <input type='checkbox'
                    id='instructor'
                    name='instructor'
                    value={formState.instructor}
                    onChange={handleChange}
                    />
                </form-group>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}