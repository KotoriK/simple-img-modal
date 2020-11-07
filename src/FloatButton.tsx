import React, { useState, useRef, cloneElement, useEffect } from "react";
import BaseComponentProps from "./BaseComponentProps";
import { usePopper } from 'react-popper'
import './FloatButton.css'
export interface FloatButtonProps extends BaseComponentProps {
    eleFloatOn: JSX.Element
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
        const ele = refFloat.current, computedLeft = ele.offsetLeft + ele.offsetWidth, innerWidth = document.body.clientWidth
        setTop(ele.offsetTop)
        setLeft((computedLeft > innerWidth ? (innerWidth - 10) : computedLeft) - 30)
    }
    useEffect(refresh,[])
    return (
        <>
            {cloneElement(eleFloatOn, {
                ref: refFloat, onRendered: refresh
            })}
            <div ref={root} style={{ top, left, opacity: buttonOpacity }} className='btn-float opacity-trans'
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
            <div className='popper opacity-trans' style={styles.popper} {...attributes.popper}
                ref={childRef} data-show={showChildren && opacity} onClick={(e) => { e.stopPropagation() }}>
                <div ref={arrow} />
                {children}
            </div>
        </>
    )
}