import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const LogInWrapperDiv = styled.div`
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
const LogInTitle = styled.h1`
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
const SignUpLink = styled(Link)`
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
    padding-left: 8px;
    font-size: 1.8rem;
    margin-bottom: 16px;
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
    padding: 12px 30px;
    text-transform: uppercase;
    font-size: 1.6rem;
    cursor: pointer;
    color: #ffffff;
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
        <LogInWrapperDiv>
            <FormHeaderDiv>
                <LogInTitle>Log In</LogInTitle>
                <SignUpLink to='/signup'>Create an Account</SignUpLink>
            </FormHeaderDiv>
            <Form onSubmit={handleSubmit} className='login-form'>
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
                <SubmitButton disabled={buttonDisabled} type='submit'>Submit</SubmitButton>
            </Form>
        </LogInWrapperDiv>
    )

}