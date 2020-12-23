import { UnmountClosed } from 'react-collapse';
import React, { useState } from 'react';
import { WrapperFunc } from './MetaPannel';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles(()=>{
    return {
        clickable:{
                    cursor: "pointer"
        }
    }
})
export default function SignedCollapse(
    { name, obj, wrapper }: { name: string, obj: Object, wrapper: WrapperFunc }) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const styles = useStyles()
    return (<>
        <strong>{name}</strong>
        <span className={styles.clickable}
            onClick={() => { setOpen(!isOpen) }}>
            {isOpen ? '⮟' : '⮞'}
        </span>
        <UnmountClosed isOpened={isOpen}>
            <ul>
                {Object.entries(obj).map(([key, value], index) =>
                    wrapper(index, key, value)
                )}
            </ul>
        </UnmountClosed></>)
}