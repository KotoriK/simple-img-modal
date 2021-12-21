import { css } from "@emotion/css";
import { forwardRef, useEffect, useState } from "react";
import BaseComponentProps from "./BaseComponentProps";
import { useTimeout } from "./utils";

const styleModal = css({
    /*CSS contributor 
作者：heibaimeng
链接：https://juejin.im/post/5cf3d3ba5188257c6b5171fd
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    backdropFilter:'blur(5px)',
    transition: "opacity 400ms ease-in",
    "& > div": {
        margin: "0.8rem",
        overflow: "auto",
        maxHeight: "98vh",
    }
})
export interface ModalProps extends BaseComponentProps {
    open: boolean
    onClose: () => void
    delay?: number
}
export const Modal = forwardRef<HTMLDivElement,ModalProps>(
    function Modal({ children, onClose, open, style, delay = 500 }: ModalProps, refForward) {
        const [setTimeout] = useTimeout()
        const [visibility, setVisibility] = useState(open)
        useEffect(() => {
            if (visibility !== open) {
                if (open) {
                    setVisibility(true)
                } else {
                    setTimeout(() => setVisibility(false), delay)
                }
            }
        }, [open])
        return (<div
            onClick={onClose}
            style={{
                opacity: open ? 1 : 0,
                visibility: (visibility ? 'visible' : 'hidden'),
                ...style
            }}
            className={styleModal}
            ref={refForward}
        >
            <div>
                {children}
            </div>
        </div >
        )
    })