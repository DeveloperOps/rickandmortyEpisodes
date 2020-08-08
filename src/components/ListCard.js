import React  from 'react'
import classes from './main.module.css'
import {  Row , Col , ListGroup , Badge } from 'react-bootstrap';

function ListCard(props) {
    let arr = ['primary' , 'success' , 'danger']
    return (
    <Col  className={classes.marginTop} md={6}>
        <ListGroup.Item>
            <Row>
                <Col md={8}><h5>{props.name}</h5></Col>
                <Col><Badge className={classes.floatRight} variant={arr[Math.floor(Math.random() * arr.length)]}>{props.episode}</Badge></Col>
            </Row>
            <p>{props.date}</p>
        </ListGroup.Item>
    </Col>
    )
} 

export default ListCard;
