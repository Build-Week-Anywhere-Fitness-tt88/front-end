import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    background-color: #242943;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 75px;
    color: white;
    font-size: 2rem;
    font-family: 'Source Sans Pro', sans-serif;
    @media(max-width: 670px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 0;
    }
`;

export default function Footer() {
    return(
        <FooterDiv>
            <p>&copy; 2020 Anywhere Fitness</p>
        </FooterDiv>
    )
}