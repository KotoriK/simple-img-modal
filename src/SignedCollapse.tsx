import { UnmountClosed } from 'react-collapse';
import { useState } from 'react';
import { WrapperFunc } from './MetaPannel';
import { css } from '@emotion/css';

const cliclable = css({
    cursor: "pointer"
})
export default function SignedCollapse(
    { name, obj, wrapper }: { name: string, obj: Object, wrapper: WrapperFunc }) {
    const [isOpen, setOpen] = useState<boolean>(false)

    return (<>
        <strong>{name}</strong>
        <span className={cliclable}
            onClick={() => { setOpen(!isOpen) }}>
            {isOpen ? '\u25b2' : '\u25bc'}
        </span>
        <UnmountClosed isOpened={isOpen}>
            <ul>
                {Object.entries(obj).map(([key, value], index) =>
                    wrapper(index, key, value)
                )}
            </ul>
        </UnmountClosed></>)
}