import BaseComponentProps from './BaseComponentProps';
import React, { useState, useEffect, cloneElement, Children, CSSProperties } from 'react';
import Indicator, { IndicatorProps, IndicateLevel } from './Indicator';
export interface LazyLoadProps extends BaseComponentProps {
    width?: string
    height?: string
    onRendered?: () => void
    opacity:boolean
}
/**
 * 显示图片
 * @author KotoriK
 * @export
 * @param props
 * @returns
 */
export default function LazyLoad({ children, refForward, className, style,onRendered,opacity }: LazyLoadProps) {
    const [showIndicator, setShowIndicator] = useState({ level: IndicateLevel.PRELOAD } as IndicatorProps)
    const [loaded,setLoaded]=useState<boolean>(false)
    const nextOpacity=opacity && loaded
    useEffect(onRendered || (() => { }))
    return (
        <>
            {showIndicator && <Indicator {...showIndicator} style={{ ...style, transition: "opacity 2s ease" }} className={className} />}
            {Children.map(children, (child) => {
                return cloneElement(child, {
                    ref: refForward,
                    style:{...child.props.style,visibility:nextOpacity?'visible':'hidden',opacity:nextOpacity?1:0} as CSSProperties,
                    onLoad: () => {
                        setShowIndicator(null)
                        setLoaded(true)
                    },
                    onError: () => {
                        setShowIndicator({ level: IndicateLevel.ERROR })
                        setLoaded(false)
                    }
                })
            })}
        </>
    )
}