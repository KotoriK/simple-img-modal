import BaseComponentProps from './BaseComponentProps';
import React from 'react';
import { IndicatorProps, Indicator, IndicateLevel } from './Indicator';
export interface ImageViewProps extends BaseComponentProps {
    src: string
    alt?: string
    refererPolicy?: ReferrerPolicy,
    width?:string
    height?:string
}
export interface ImageViewState {
    loaded: boolean
    showIndicator?: IndicatorProps
}
/**
 * 显示图片
 *
 * @author KotoriK
 * @class FaceView
 * @extends {React.Component<ImageViewProps, ImageViewState>}
 */
export default class ImageView extends React.Component<ImageViewProps, ImageViewState> {
    constructor(props: ImageViewProps) {
        super(props)
        this.state = {
            showIndicator: { level: IndicateLevel.PRELOAD,style:{...props.style,width:props.width,height:props.height} },
            loaded: false
        }
    }
    render() {
        return (
            <div>
                {this.state.showIndicator && <Indicator {...this.state.showIndicator} style={{ ...this.props.style, transition: "opacity 2s ease" }} className={this.props.className} />}
                <img src={this.props.src}
                    style={{ ...this.props.style }} className={this.props.className}
                    onLoad={() => {
                        this.setState({ loaded: true, showIndicator: null })
                    }}
                    hidden={!this.state.loaded}
                    onError={() => {
                        this.setState({ showIndicator: { level: IndicateLevel.ERROR }, loaded: false })
                    }}  width={this.props.width} height={this.props.height}/></div>
        )
    }
}