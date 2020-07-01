import React from "react";
import ImageView from "./ImageView";
export interface ModalProps {
    imgSrc?: string,
    React: any,
    opacity: boolean,
    handleChangeOpacity: (newOpacity: boolean, imgSrc?: string) => void
}

export class Modal extends React.Component<ModalProps>{
    React
    constructor(props: ModalProps) {
        super(props)
        this.React = props.React
    }
    render() {
        const React = this.React, opacity = this.props.imgSrc && this.props.opacity
        return (<div
            onClick={() => this.props.handleChangeOpacity(false, this.props.imgSrc)}
            style={{
                opacity: opacity ? 1 : 0,
                visibility: (opacity ? 'visible' : 'hidden'),
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                transition: 'all 550ms cubic-bezier(0.25,0.1,0.25,1)'
            }
            }
        >
            <div style={{ margin: '0.8rem' }}>
                <ImageView key={(this.props.imgSrc?this.props.imgSrc:'#').split('/').pop()} src={this.props.imgSrc} width='100%' height='100%' />
            </div>
        </div >

    /* 作者：heibaimeng
    链接：https://juejin.im/post/5cf3d3ba5188257c6b5171fd
    来源：掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */)
    }


}