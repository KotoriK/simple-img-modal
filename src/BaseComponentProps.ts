import { CSSProperties, PropsWithChildren } from "react";

export default interface BaseComponentProps extends PropsWithChildren<{}> {
    style?: CSSProperties
    className?: string
    attachAttributes?: any
    refForward?: React.MutableRefObject<any>
}