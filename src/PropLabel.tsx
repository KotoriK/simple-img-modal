import React from "react";

export interface PropLabelProps {
caption:string
value:string
}
export default function PropLabel(props: PropLabelProps) {
    return (
         <>
         <strong>{props.caption}</strong>:<span>{props.value}</span>
         </>
    );
}