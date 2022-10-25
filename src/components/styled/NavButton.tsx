import React from 'react'
//import styles from './NavButton.module.css'
import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledNavButton = styled(Link)<Omit<TProps, 'linkTo' | 'text'>>`
  color: ${({active})=>active?`#72fa97`:`#dcdcdc`};
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding: 5px 5px 5px 30px;
  position: relative;
  background-color: ${({active})=>active?`#858585`:`transparent`};
  &:hover{
    transition-duration: 0.05s;
    background-color:#858585;
    cursor: pointer;
  }
  &:active{
    background-color: #0a99b9;
    transform: translate(1px, 1px);
    box-shadow: 0px 0px 2px 2px darkgrey;
  }
  &:before{
    content: '';
    width: ${props => props.subCat ? 5 : 10}px;
    height: ${props => props.subCat ? 5 : 10}px;
    border-radius: 50%;
    color: #1ee0a8;
    position: absolute;
    top: ${props => props.subCat ? 12 : 10}px;
    left: ${props => props.subCat ? 30 : 13}px;
    border: 1px solid black;
    background-color: ${({active})=>active?`#77ff00`:`#ffffff`};
  }
`

type TProps = {
    linkTo: string
    text: string
    subCat?: boolean
    active: boolean
    onClick?:()=>void
}
export const NavButton:React.FC<TProps> = (props) => {
    const {text, linkTo, ...rest} = props
    return (
        <StyledNavButton to={linkTo} {...rest}>
           {text.split('').map((v,i)=>i===0?v.toUpperCase():v).join('')}
        </StyledNavButton>
    )
}