import { Modal, ModalProps } from "./Modal";
import React from "react";
import LazyLoad from "./LazyLoad";
export interface MapModalProps extends ModalProps {
    mapSrc: string
}
export default function MapModal({ mapSrc, opacity, handleOpacityChange }: MapModalProps) {
    return (<Modal opacity={opacity} handleOpacityChange={handleOpacityChange}>
        {opacity &&  (<LazyLoad opacity={opacity}><iframe src={mapSrc} style={{ width: "90vw", height: '90vh',border:"0px",position:'absolute',left:'4vw',top:'4vh'}} className='modal' /></LazyLoad>)}
       
    </Modal>)
}