
import { ImageModalProps } from "./ImageModalProp";
import ImageView from "./ImageView";
import { Modal } from "./Modal";

export function ImageModal({ src: imgSrc, onClose, open: opacity }: ImageModalProps) {
    const newOpacity = imgSrc && opacity
    const key = imgSrc ? (imgSrc.split('/').pop()) : '#'
    return (<Modal open={newOpacity}
        onClose={onClose}>
        <ImageView key={key} src={imgSrc} width='100%' height='100%'/>
    </Modal>
    )
}