import React from "react";
import ImageView from "./ImageView";
import MetaPannel from "./MetaPannel";
import FloatButton from "./FloatButton";
import { Modal, ModalProps } from "./Modal";
export interface ImageModalProps extends ModalProps {
    imgSrc?: string,
    handleOpacityChange: (newOpacity: boolean, imgSrc?: string) => void
}

export function ImageModalWithEXIF({ imgSrc, handleOpacityChange, opacity }: ImageModalProps) {
    const newOpacity = imgSrc && opacity
    const key = imgSrc ? (imgSrc.split('/').pop()) : '#'
    return (<Modal opacity={newOpacity}
        handleOpacityChange={() => handleOpacityChange(false, imgSrc)}>
        <FloatButton key={key} eleFloatOn={(ref,onRendered)=>
            <ImageView ref={ref as any} onRendered={onRendered} src={imgSrc} width='100%' height='100%' opacity={newOpacity}/>} opacity={newOpacity}>
            <MetaPannel imgSrc={imgSrc} />
        </FloatButton>
    </Modal>
    )
}