import React from "react";
import ImageView from "./ImageView";
import { Modal, ModalProps } from "./Modal";
export interface ImageModalProps extends ModalProps {
    imgSrc?: string,
    handleOpacityChange: (newOpacity: boolean, imgSrc?: string) => void
}

export function ImageModal({ imgSrc, handleOpacityChange, opacity }: ImageModalProps) {
    const newOpacity = imgSrc && opacity
    const key = imgSrc ? (imgSrc.split('/').pop()) : '#'
    return (<Modal opacity={newOpacity}
        handleOpacityChange={() => handleOpacityChange(false, imgSrc)}>
        <ImageView key={key} src={imgSrc} width='100%' height='100%' opacity={newOpacity} />
    </Modal>
    )
}