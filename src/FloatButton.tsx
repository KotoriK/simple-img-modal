import React, { useState, useRef, useEffect } from "react";
import BaseComponentProps from "./BaseComponentProps";
import { usePopper } from 'react-popper'
import { createUseStyles } from "react-jss";
const useFloatBtn = createUseStyles(() => {
    return {
        "btn-float": {
            position: "fixed",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2078"><path d="M512 179.2a332.8 332.8 0 1 1 0 665.6 332.8 332.8 0 0 1 0-665.6z m0 51.2a281.6 281.6 0 1 0 0 563.2 281.6 281.6 0 0 0 0-563.2z" p-id="2079"></path><path d="M512.768 339.968a38.7072 38.7072 0 1 1 0 77.3632 38.7072 38.7072 0 0 1 0-77.3632zM546.4576 678.6048h-27.2384c-14.2848 0-29.0304-12.3904-29.0304-23.7056V498.0224h-9.728a25.8048 25.8048 0 1 1 0-51.6096s31.488-0.1024 32.3072 0c13.1072 0.9728 22.5792 6.656 22.5792 17.3568v163.2768h11.1104a25.8048 25.8048 0 1 1 0 51.5584z" p-id="2080"></path></svg>')`,
            width: "30px",
            height: "30px",
        },
        "icon": {
            fill: "white"
        },

        "popper": {
            opacity: 0,
            visibility: "hidden",
            background: "#33333380",
            color: "white",
            padding: "4px 8px",
            fontSize: "13px",
            borderRadius: "4px",
            maxHeight: "20vh",
            overflow: "auto",
            '&[data-show="true"]': {
                opacity: 1,
                visibility: "visible",
                backdropFilter: "blur(3px)",
            },
        },
        "opacity-trans": {
            transition: "opacity 500ms ease-in-out",
        },
    }
})
export interface FloatButtonProps extends BaseComponentProps {
    eleFloatOn: (ref: React.MutableRefObject<HTMLElement>, onRendered: () => void) => JSX.Element
    children: React.ReactElement
    opacity: boolean
}
export default function FloatButton({ children, eleFloatOn, opacity }: FloatButtonProps) {
    const [buttonOpacity, setOpacity] = useState<number>(0.3)
    const [showChildren, setShowChildren] = useState<boolean>(false)
    const [top, setTop] = useState<number>(0)
    const [left, setLeft] = useState<number>(0)
    const root = useRef()
    const childRef = useRef()
    const arrow = useRef()
    const { styles, attributes, update } = usePopper(root.current, childRef.current,
        { placement: 'bottom', modifiers: [{ name: 'arrow', options: { element: arrow.current } }] })
    const refFloat = useRef<HTMLElement>()
    const refresh = () => {
        const ele = refFloat.current,
            computedLeft = ele.offsetLeft + ele.offsetWidth,
            innerWidth = document.body.clientWidth
        setTop(ele.offsetTop)
        setLeft((computedLeft > innerWidth ? (innerWidth - 10) : computedLeft) - 30)
    }
    const cssStyles = useFloatBtn()
    useEffect(refresh, [])
    return (
        <>
            {eleFloatOn(refFloat, refresh)}
            <div ref={root} style={{ top, left, opacity: buttonOpacity }}
                className={cssStyles['btn-float'] + ' ' + cssStyles['opacity-trans']}
                onPointerOver={() => {
                    setOpacity(1)
                }} onPointerOut={() => {
                    if (!showChildren) setOpacity(0.3)
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.stopPropagation()
                    setShowChildren(!showChildren)
                    update()
                }}
            />
            <div className={cssStyles['popper'] + ' ' + cssStyles['opacity-trans']}
                style={styles.popper} {...attributes.popper}
                ref={childRef}
                data-show={showChildren && opacity}
                onClick={(e) => { e.stopPropagation() }}>
                <div ref={arrow} />
                {children}
            </div>
        </>
    )
}