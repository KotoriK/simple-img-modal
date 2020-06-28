import "./Modal.css";
import React from "react";
export interface ModalProps {
    imgSrc?: string,
    React: any,
    opacity:boolean,
    handleChangeOpacity:(newOpacity:boolean,imgSrc?:string)=>void
}


export class Modal extends React.Component<ModalProps>{
    React
    constructor(props: ModalProps) {
        super(props)
        this.React = props.React
    }

    render() {
        const React = this.React
        const opacity=this.props.imgSrc && this.props.opacity
        return (<div className="modal" 
        onClick={()=>this.props.handleChangeOpacity(!this.props.opacity,this.props.imgSrc)} 
        style={{ opacity:opacity ? 1 : 0,visibility:opacity ? 'visible' : 'hidden' }} 
>
            <div className="modal-body">
                <img src={this.props.imgSrc} width='100%' height='100%'  />
            </div>
        </div>

    /* 作者：heibaimeng
    链接：https://juejin.im/post/5cf3d3ba5188257c6b5171fd
    来源：掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */)
    }


}