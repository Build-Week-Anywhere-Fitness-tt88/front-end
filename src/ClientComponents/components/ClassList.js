
import React, {useState, useEffect} from 'react';
import { useContext } from 'react'
import { ClassListContext } from '../contexts/ClassListContext'


export const ClassList = () => {

    //const { products, addItem } = useContext(ProductContext)
    const { classes } = useContext(ClassListContext)
    
    return (
        <p>Context is working!</p>
    )
}