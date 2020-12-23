import { UnmountClosed } from 'react-collapse';
import React, { useState } from 'react';
import './SignedCollapse.css'
import { WrapperFunc } from './MetaPannel';
export default function SignedCollapse(
    { name, obj, wrapper }: { name: string, obj: Object, wrapper: WrapperFunc }) {
    const [isOpen, setOpen] = useState<boolean>(false)
    return (<>
        <strong>{name}</strong>
        <span className='clickable-sign'
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