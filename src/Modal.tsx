import React from "react";
import './Modal.css'
import BaseComponentProps from "./BaseComponentProps";
export interface ModalProps extends BaseComponentProps {
    opacity:boolean
    handleOpacityChange:(newOpacity:boolean)=>void
}
export function Modal({children,handleOpacityChange,opacity,style}: ModalProps) {
    return (<div
        onClick={() => handleOpacityChange(false)}
        style={{
            opacity: opacity ? 1 : 0,
            visibility: (opacity ? 'visible' : 'hidden'),...style
        }}
        className='modal'>
        <div className='modal-body'>
            {children}
        </div>
    </div >
    )
}