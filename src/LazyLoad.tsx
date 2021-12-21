import BaseComponentProps from './BaseComponentProps';
import { useState, useEffect, cloneElement, Children, CSSProperties, createElement } from 'react';
import Indicator, { IndicatorProps, IndicateLevel } from './Indicator';
export interface LazyLoadProps extends BaseComponentProps {
    width?: string
    height?: string
    /**
     * 当lazyload内的元素有变化时触发
     */
    onRendered?: () => void
    opacity?: boolean
}
/**
 * 显示图片
 * @author KotoriK
 * @export
 * @param props
 * @returns
 */
export default function LazyLoad({ children, refForward, className, style, onRendered }: LazyLoadProps) {
    const [showIndicator, setShowIndicator] = useState({ level: IndicateLevel.PRELOAD } as IndicatorProps)
    useEffect(onRendered || (() => { }), [showIndicator])
    return (
        <>
            {showIndicator && <Indicator {...showIndicator} style={{ ...style, transition: "opacity 2s ease" }} className={className} />}
            {Children.map(children, (child: any) => {
                if (typeof child == 'object') {
                    return cloneElement(child, {
                        ref: refForward,
                        ...(child.props || {}),
                        onLoad: () => {
                            setShowIndicator(null)
                        },
                        onError: () => {
                            setShowIndicator({ level: IndicateLevel.ERROR })
                        }
                    })
                } else {
                    return child
                }
            }
            )}
        </>
    )
}