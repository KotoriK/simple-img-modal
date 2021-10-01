import { CSSProperties } from "react";

export default interface BaseComponentProps{
    style?:CSSProperties
    className?:string
    attachAttributes?:any
    refForward?:React.MutableRefObject<any>
    children?:JSX.Element |JSX.Element[]
}