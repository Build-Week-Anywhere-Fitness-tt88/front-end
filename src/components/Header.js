import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    background-color: #887fbb;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    `;
const HeaderDiv = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    @media(max-width: 670px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    `; 

const HeaderH1 = styled.h1`
    font-family: Source Sans Pro, sans-serif;
    font-size: 4rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.65;
    border-bottom: 2px solid white;
    margin-bottom: 20px;
    @media(max-width: 670px){
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0;
        border: none;
    }
`;
const NavLinkDiv = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    @media(max-width: 925px){
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 16px 0;
    }
    @media(max-width: 670px){
        width: 90%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 0 16px 0;
    }
    `;

const NavLinkItem = styled(NavLink)`
    text-decoration: none;
    text-transformation: uppercase;
    font-family: Source Sans Pro, sans-serif;
    font-size: 2rem;
    color: #ffffff;
    &:hover{
        font-weight: 600;
        color: #9bf1ff;
    }
    &.active{
        color: #53e3fb;
    }
    `;
const HomeLink = styled.a`
    text-decoration: none;
    text-transformation: uppercase;
    font-family: Source Sans Pro, sans-serif;
    font-size: 2rem;
    color: #ffffff;
    &:hover{
        font-weight: 600;
        color: #9bf1ff;
    }
    &.active{
        color: #53e3fb;
    }
`;




export default function Header(props){
    const {currentUser} = props;
    console.log(currentUser);

    return(
        <HeaderWrapper>
            <HeaderDiv >
                <HeaderH1>Anywhere Fitness</HeaderH1>
                <NavLinkDiv>
                    <HomeLink href='https://anywhere-fitness-tt88.netlify.app/'>Home</HomeLink>
                    <NavLinkItem to='/signup'>Sign Up</NavLinkItem>
                    <NavLinkItem to='/login'>Log In</NavLinkItem>
                    <NavLinkItem to='/sampleclasses'>Classes</NavLinkItem>
                    <NavLinkItem to='/instructorPage'>Instructor</NavLinkItem>
                    <NavLinkItem to='/clientPage'>Client</NavLinkItem>

                    {/* conditional rendering for links, instrucor and client links 
                        only are rendered with a current user logged in */}
                    {/* {currentUser.username !== '' && (currentUser.instructor ? 
                    <NavLinkItem to='/instructorPage'>Instructors</NavLinkItem> : <NavLinkItem to='/clientPage'>Clients</NavLinkItem>)} */}
                      
                </NavLinkDiv>
            </HeaderDiv>
        </HeaderWrapper>
    )
}