import React, {useState, useEffect} from 'react';
import {Route, Link, useHistory, useRouteMatch} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import SignUpDialog from './SignUpDialog';

const SignUpWrapperDiv = styled.div`
    margin-top: 0;
    width: 100%;
    background-color: #323956;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #ffffff;
    height: auto;
    `;

const FormHeaderDiv = styled.div`
    width: 60%;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    `;

const SignUpTitle = styled.h1`
    margin-right: auto;
    // padding: 20px;
    font-family: Source Sans Pro, sans-serif;
    font-size: 3.4rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.65;
    margin-bottom: 20px;
    @media(max-width: 670px){
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    }`;
const LogInLink = styled(Link)`
    font-family: Source Sans Pro, sans-serif;
    text-decoration: none;
    font-weight: 600;
    font-size: 2.6rem;
    color: #887fbb;
    &:hover{
        color: #9bf1ff;
    }
`;
const Form = styled.form`
    width: 60%;
    max-width: 500px;
    margin: 25px auto;
    display: flex;
    flex-direction: column;
    border: 2px solid #ffffff;
    padding: 25px;
    padding-top: 50px;
    padding-bottom: 50px;
    justify-content: center;
    align-items: center;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const SelectGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    font-size: 1.8rem;
    margin-bottom: 16px;
`;
const Select = styled.select`
    font-size: inherit;
    padding-left: 8px;
    `;
const Label = styled.label`
    margin-right: auto;
    margin-bottom: 10px;
    font-size: 1.8rem;
    font-weight: 600;
`;

const Required = styled.span`
    color: #9bf1ff;
    font-weight: 600;
`;

const Input = styled.input`
    margin: 0;
    height: auto;
    border-radius: 0;
    padding-left: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 1.8rem;
    margin-bottom: 16px;
    background-color: #ffffff;
`;

const Errors = styled.p`
    color: #9bf1ff;
    margin: 0 0 10px 0;
    font-size: 1.6rem;
    text-align: center;
`;
 
const SubmitButton = styled.button`
    border: 1px solid #ffffff;
    background-color: transparent;
    padding: 8px 30px;
    text-transform: uppercase;
    font-size: 1.6rem;
    cursor: pointer;
    color: #ffffff;
    border-radius: 0;
    margin-top: 10px;
    &:hover{
        border-color: #9bf1ff;
        color: #9bf1ff;
    }
    &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const initialFormState = {
    username: '',
    password: '',
    role: ''
};

export default function SignUp (props) {
    // receive function to set current user as props
    const {currentUser, getUser} = props;
    // use hook to get history props
    const history = useHistory();

    // use hook to get match props
    const match = useRouteMatch();

    // hold state for user signup form
    const [formState, setFormState] = useState(initialFormState);

    // hold button disabled state to control when form can submit
    const [buttonDisabled, setButtonDisabled] = useState(true);
 
    // hold state for errors from yup validation
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        role: ''
    })
    
    const formSchema = yup.object().shape({
        username: yup.string().required('Username is required.').min(6, 'Username must be at least 6 characters.'),
        password: yup.string().required('Password is required.').min(8,'Password must be at least 8 characters.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must contain uppercase and lowercase letter, a number, and may contain special characters.'),
        role: yup.string().oneOf(['student', 'instructor'], "Please select a role.")
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
            // getUser will update currentUser state on App component
            getUser(response.data)
            // push to Route for Dialog Welcome Message
            history.push(`${match.url}/success`);  
        })
        setFormState(initialFormState);
    }

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
    },[formState]);

    return(
        <SignUpWrapperDiv>
            <FormHeaderDiv>
                <SignUpTitle>Create an Account</SignUpTitle>
                <LogInLink to='/login'>Log In</LogInLink>
            </FormHeaderDiv>
            <Form onSubmit={handleSubmit} className='signup-form'>
                <FormGroup>
                    <Label htmlFor='username'>Username <Required>*</Required></Label>
                    <Input type='text'
                    id='username'
                    name='username'
                    value={formState.username}
                    required
                    onChange={handleChange}
                    />
                </FormGroup>
                {errors.username.length > 0 ? <Errors>{errors.username}</Errors> : null}
                <FormGroup>
                    <Label htmlFor='password'>Password <Required>*</Required></Label>
                    <Input type='password'
                    id='password'
                    name='password'
                    value={formState.password}
                    required
                    onChange={handleChange}
                    />
                </FormGroup>
                {errors.password.length > 0 ? <Errors>{errors.password}</Errors> : null}
                {/* <CheckBoxGroup>
                    <Label htmlFor='instructor'>Instructor:</Label>
                    <Input type='checkbox'
                    id='instructor'
                    name='instructor'
                    checked={formState.instructor}
                    onChange={handleChange}
                    />
                </CheckBoxGroup> */}
                <SelectGroup>
                    <Label htmlFor="role">Account Type</Label>
                    <Select name="role" id="role" value={formState.role} onChange={handleChange}>
                        <option value="">-- select your role --</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </Select>
                </SelectGroup>
                {errors.role.length > 0 ? <Errors>{errors.role}</Errors> : null}
                <SubmitButton disabled={buttonDisabled} type='submit'>Submit</SubmitButton>
            </Form>
            <Route path={`${match.url}/success`}>
                <SignUpDialog currentUser={currentUser}/>
            </Route>
        </SignUpWrapperDiv>
    )

}