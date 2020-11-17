import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

//test data, this will end up coming from server request
const sampleClasses = [
    {
        id: 1,
        name: 'Gentle Flow Yoga',
        imageUrl: 'https://live.staticflickr.com/7294/27698366496_7fc9474f87_b.jpg',
        description: 'Gentle Flow Yoga is geared specifically for those new to yoga or those who are interested in a gentle practice.  This class incorporates simple flowing sequences to warm up the body, as well as slower paced movements focusing on alignment, strength, balance, and flexibility.  Each class will end with an extended period of relaxation.  This class is appropriate for anyone of any age, shape or size. No experience or flexibility required.'
    },
    {
        id: 2,
        name: 'Bodyweight Strength Training',
        imageUrl: 'https://cdn10.picryl.com/photo/1996/05/01/a-group-of-students-do-push-ups-as-part-of-strength-exercises-at-the-parade-bd4494-1600.jpg',
        description: 'Bodyweight Strength Training exercises are a simple, effective way to improve balance, flexibility, and strength without gym machines or equipment. From legs and shoulders to chest and abs, we’ve covered every part of your body that can get stronger with body resistance alone.'
    },
    {
        id: 3,
        name: 'Zumba',
        imageUrl: 'https://p1.pxfuel.com/preview/169/852/62/zumba-party-marathon-sport-exercise-dance.jpg',
        description: "We take the 'work' out of workout, by mixing low-intensity and high-intensity moves for an interval-style, calorie-burning dance fitness party. Once the Latin and World rhythms take over, you'll see why Zumba® Fitness classes are often called exercise in disguise. Super effective? Check. Super fun? Check and check."
    },
    {
        id: 4,
        name: 'Pilates',
        imageUrl: "https://live.staticflickr.com/972/40818243175_33f6e3bd57_b.jpg",
        description: "Pilates is a method of exercise that consists of low-impact flexibility and muscular strength and endurance movements. Pilates emphasizes proper postural alignment, core strength and muscle balance. "
    },
    {
        id: 5,
        name: 'Core Conditioning',
        imageUrl: 'https://cdn.pixabay.com/photo/2020/01/30/08/18/core-4804657_1280.jpg',
        description: "Core conditioning is a non-aerobic, muscle-toning class, usually focused on core strength. Most sculpting classes use weight bars, exercise bands, or dumbbells, or a combination of these gadgets. You perform traditional weight-training moves in a class setting.",
    },
    {
        id: 6,
        name: 'Cycling',
        imageUrl: 'https://p0.pikrepo.com/preview/302/572/time-lapse-photography-of-women-riding-stationary-bikes.jpg',
        description: "Riding a stationary exercise bike is an efficient and effective way to burn calories and body fat while strengthening your heart, lungs, and muscles. Compared to some other types of cardio equipment, a stationary bicycle puts less stress on your joints, but it still provides an excellent aerobic workout."
    },
    {
    id: 7,
        name: 'Kickboxing',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Cardio_Boxing_Group_Fitness_Class.JPG',
        description: "Kickboxing is a stand-up combat sport based on kicking and punching, historically developed from karate mixed with boxing. Kickboxing is practiced for self-defence, general fitness, or as a contact sport."
    },
    {
        id: 8,
        name: 'Tai Chi',
        imageUrl: 'https://cdn.pixabay.com/photo/2017/12/22/17/21/taiji-3033963__340.jpg',
        description: "Tai chi, short for T'ai chi ch'üan or Tàijí quán, is an internal Chinese martial art practiced for defense training, health benefits, and meditation."
    },
    {
        id: 9,
        name: 'Active Older Adults',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/02/14/09/00/swimmers-3996163__340.jpg',
        description: "You're never too old to start exercising and pursuing a healthier lifestyle that can help prevent and manage chronic disease and reduce muscle and joint pain."
    },
    {
        id: 10,
        name: 'Pickleball',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Pickleball_Players.jpg',
        description: "Pickleball is a paddleball sport (similar to a racquet sport) that combines elements of badminton, table tennis, and tennis. Two or four players use solid paddles made of wood or composite materials to hit a perforated polymer ball, much like a wiffle ball, with 26-40 round holes, over a net."
    }
];
const ClassesComponentDiv = styled.div`
   background-color: #323956;
    `;
const PageTitle = styled.h1`
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    font-family: Source Sans Pro, sans-serif;
    font-size: 3rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.65;
    border-bottom: 2px solid #ffffff;
    margin-bottom: 20px;
    @media(max-width: 670px){
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0;
    }`;
const ClassDisplayDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;
const ClassCard = styled.div`
    width: 90%;   
    margin: 0 auto; 
    display: flex;
    align-items:center;
    justify-content: space-between;
    color: #ffffff;
    @media(max-width: 850px){
        flex-direction: column;
    };
`;
const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding: 20px;
    @media(max-width: 850px){
        width: 80%;
        order: -99;
    };
    `;

const InfoDiv = styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    @media(max-width: 850px){
        width: 80%;
    };
    `;

const ClassTitle = styled.h3`
    font-family: Source Sans Pro, sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #ffffff;
     `;

const ClassDescription = styled.p`
    font-family: Source Sans Pro, sans-serif;
    font-size: 2rem;
    `;

const Button = styled.button`
    border: 1px solid #ffffff;
    background-color: transparent;
    padding: 16px 30px;
    border-radius: 0;
    text-transform: uppercase;
    font-size: 1.6rem;
    color: #ffffff;
    cursor: pointer;
    &:hover{
        border-color: #9bf1ff;
        color: #9bf1ff;
    }
    @media(max-width: 850px){
        padding: 12px 20px;
    };
    `;

export default function SampleClasses() {
    const [classes, setClasses] = useState([]);
    const history = useHistory();
    // Set up axios get request to get classlist object from server
    useEffect(()=> {
        axios.get('https://anywhere-fitness-tt-webpt-88.herokuapp.com/')
        .then(response => setClasses(response.data))
        .catch(err => console.log(err))
    }, [])

    // temp test data submit to reqres.in/api/users to get response for state
    // useEffect(()=>{
    //     axios
    //     .post('https://reqres.in/api/users', sampleClasses)
    //     .then(response => {
    //         console.log(response.data);
    //         setClasses(response.data);
    //     })
    //     .catch(err => console.log(err))
    // },[])

    return (
        <ClassesComponentDiv >
            <PageTitle>Sample Classes</PageTitle>
            <ClassDisplayDiv >
                {classes.map(sampleClass => (
                <ClassCard key={sampleClass.id}>
                { !!(Number(sampleClass.id) % 2) ?
                   (<>
                    <ImageDiv>
                        <img
                        src={sampleClass.imageUrl}
                        alt={sampleClass.name}
                        width="100%"
                        />
                    </ImageDiv>
                    <InfoDiv>
                        <ClassTitle>{sampleClass.name}</ClassTitle>
                        <ClassDescription>{sampleClass.description}</ClassDescription>
                        <Button onClick={()=> history.push('/signup')}>Get Started</Button>
                    </InfoDiv>
                    </>
                   ): 
                   (<>
                    <InfoDiv>
                        <ClassTitle>{sampleClass.name}</ClassTitle>
                        <ClassDescription>{sampleClass.description}</ClassDescription>
                        <Button onClick={()=> history.push('/signup')}>Get Started</Button>
                    </InfoDiv>
                    <ImageDiv>
                        <img
                        src={sampleClass.imageUrl}
                        alt={sampleClass.name}
                        width="100%"
                        />
                    </ImageDiv>
                    </>)
                }
                </ClassCard>
                ))}
                </ClassDisplayDiv>
                
        </ClassesComponentDiv>
    )

}