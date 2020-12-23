import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import BaseComponentProps from "./BaseComponentProps";
const useModalStyle = createUseStyles(() => {
    /*CSS contributor 
    作者：heibaimeng
    链接：https://juejin.im/post/5cf3d3ba5188257c6b5171fd
    来源：掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
    return {
        modal: {
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
            transition: "opacity 400ms ease-in",
            "& > div": {
                margin: "0.8rem",
                overflow: "auto",
                maxHeight: "98vh",
            }
        }
    }
})
export interface ModalProps extends BaseComponentProps {
    opacity: boolean
    handleOpacityChange: (newOpacity: boolean) => void
}
export function Modal({ children, handleOpacityChange, opacity, style }: ModalProps) {
    const handleClick = useCallback(() => handleOpacityChange(false), [handleOpacityChange])
    const modalStyles = useModalStyle()
    return (<div
        onClick={handleClick}
        style={{
            opacity: opacity ? 1 : 0,
            visibility: (opacity ? 'visible' : 'hidden'), ...style
        }}
        className={modalStyles.modal}>
        <div>
            {children}
        </div>
    </div >
    )
}