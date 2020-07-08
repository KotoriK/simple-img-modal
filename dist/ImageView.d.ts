import BaseComponentProps from './BaseComponentProps';
import React from 'react';
import { IndicatorProps } from './Indicator';
export interface ImageViewProps extends BaseComponentProps {
    src: string;
    alt?: string;
    refererPolicy?: ReferrerPolicy;
    width?: string;
    height?: string;
}
export interface ImageViewState {
    loaded: boolean;
    showIndicator?: IndicatorProps;
}
/**
 * 显示图片
 *
 * @author KotoriK
 * @class FaceView
 * @extends {React.Component<ImageViewProps, ImageViewState>}
 */
export default class ImageView extends React.Component<ImageViewProps, ImageViewState> {
    constructor(props: ImageViewProps);
    render(): JSX.Element;
}
//# sourceMappingURL=ImageView.d.ts.map