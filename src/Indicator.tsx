import React from 'react';
import BaseComponentProps from './BaseComponentProps';
const SVG_PRELOAD = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg"
/* const SVG_WARNING = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/warning.svg"
const SVG_INFO = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/info.svg" */
const SVG_ERROR = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg"
export enum IndicateLevel {
    PRELOAD,
    /*     INFO , 
        WARNING ,  */
    ERROR
}
const IndicateLevelSVG = [SVG_PRELOAD,/* SVG_WARNING,SVG_INFO, */SVG_ERROR]
export interface IndicatorProps extends BaseComponentProps {
    level: IndicateLevel
    description?: string
}

/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
export default function Indicator(props: IndicatorProps) {
    return (
        <img src={IndicateLevelSVG[props.level]} alt={props.description} style={props.style} />
    )
}


