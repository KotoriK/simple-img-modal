import { Modal, ModalProps } from "./Modal";
import LazyLoad from "./LazyLoad";
import { css, cx } from "@emotion/css";
export interface MapModalProps extends ModalProps {
    mapSrc: string
}
const styleIFrame = css({ width: "90vw", height: '90vh', border: "0px", position: 'absolute', left: '4vw', top: '4vh' })
export default function MapModal({ mapSrc, open: show, onClose }: MapModalProps) {
    return (<Modal open={show} onClose={onClose}>
        {show && (<LazyLoad opacity={show}>
            <iframe src={mapSrc} className={styleIFrame + ' modal'} />
        </LazyLoad>)}
    </Modal>)
}