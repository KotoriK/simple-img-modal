import React from "react";
import ImageView from "./ImageView";
export interface ModalProps {
    imgSrc?: string,
    opacity: boolean,
    handleChangeOpacity: (newOpacity: boolean, imgSrc?: string) => void
}

export function Modal(props: ModalProps) {

    const opacity = props.imgSrc && props.opacity
    return (<div
        onClick={() => props.handleChangeOpacity(false, props.imgSrc)}
        style={{
            opacity: opacity ? 1 : 0,
            visibility: (opacity ? 'visible' : 'hidden'),
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.50)',
            transition: 'all 550ms cubic-bezier(0.25,0.1,0.25,1)'
        }
        }
    >
        <div style={{ margin: '0.8rem', overflow: 'auto', maxHeight: '98vh' }}>
            <ImageView key={(props.imgSrc ? props.imgSrc : '#').split('/').pop()} src={props.imgSrc} width='100%' height='100%' />
        </div>
    </div >
   )
}