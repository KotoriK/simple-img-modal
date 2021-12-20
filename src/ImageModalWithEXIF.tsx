
import ImageView from "./ImageView";
import MetaPannel from "./MetaPannel";
import FloatButton from "./FloatButton";
import { Modal } from "./Modal";
import { ImageModalProps } from "./ImageModalProp";


export function ImageModalWithEXIF({ src, onClose, open: opacity }: ImageModalProps) {
    const newOpacity = src && opacity
    const key = src ? (src.split('/').pop()) : '#'
    return (<Modal open={newOpacity}
        onClose={onClose}>
        <FloatButton key={key} eleFloatOn={(ref, onRendered) =>
            <ImageView ref={ref as any} onRendered={onRendered} src={src} width='100%' height='100%' opacity={newOpacity} />}
            open={newOpacity}>
            <MetaPannel imgSrc={src} />
        </FloatButton>
    </Modal>
    )
}