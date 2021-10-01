import React, { forwardRef } from 'react';
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
const ImageView = forwardRef<HTMLImageElement, ImageViewProps>(function ImageView(props, ref) {
    return (
        <LazyLoad {...props}>
            <img ref={ref}
                src={props.src}
                referrerPolicy={props.refererPolicy} alt={props.alt}
            />
        </LazyLoad>)
})
export default ImageView