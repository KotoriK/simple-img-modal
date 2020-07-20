import React from 'react';
import LazyLoad, { LazyLoadProps } from './LazyLoad';
export interface ImageViewProps extends LazyLoadProps {
    src: string
    alt?: string
    refererPolicy?: "no-referrer" | "origin" | "unsafe-url",
}
/**
 * 显示图片
 * @author KotoriK
 * @export
 * @param props
 * @returns
 */
export default function ImageView(props: ImageViewProps) {
    return (
        <LazyLoad {...props}>
            <img ref={props.refForward}
                src={props.src}
                referrerPolicy={props.refererPolicy} alt={props.alt}
            />
        </LazyLoad>)
}