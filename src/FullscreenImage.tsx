import debounce from "@mui/utils/debounce"
import { useRef, useState, CSSProperties, useCallback, useEffect, ImgHTMLAttributes, forwardRef } from "react"
import { useTimeout } from "./utils"
import { awaitImage } from 'await-res'
import { Modal } from "./Modal"
import { css } from "@emotion/css"

const modalPadding = 10
const styleTransition = css({
    transition: 'all 0.2s ease-in-out',
})
export interface FullscreenImageProp extends ImgHTMLAttributes<HTMLImageElement> {
    img: HTMLImageElement
    onRendered?: () => void
}
const lockBody = (lock: boolean) => {
    document.documentElement.style.overflow = lock ? 'hidden' : ''
}

const FullscreenImage = forwardRef<HTMLImageElement, FullscreenImageProp>(
    function FullscreenImage({ className, style, img, onRendered, ...prop }: FullscreenImageProp, refForward) {

        const [fullscreen, setFullscreen] = useState(false)

        const [startStyle, setStartStyle] = useState<CSSProperties>()
        const [endStyle, setEndStyle] = useState<CSSProperties>()
        const [stillStyle, setStillStyle] = useState<CSSProperties>()

        const rectHeight = useRef<number>()

        const [setTimeout, clearAll] = useTimeout()
        const [showImage, setShowImage] = useState(false)
        const resize = useCallback(debounce(async () => {
            const height = rectHeight.current//要求与stillStyle一致
            await awaitImage(img)
            const { naturalWidth, naturalHeight } = img
            const width = height * naturalWidth / naturalHeight
            setStillStyle({
                position: 'absolute',
                top: 0, left: 0,
                width: width, height: height,
            })
            let targetHeight: number
            let targetWidth: number
            targetHeight = innerHeight - (modalPadding * 4)
            targetWidth = targetHeight * naturalWidth / naturalHeight

            if (targetWidth > innerWidth) {
                targetWidth = innerWidth - (modalPadding * 4)
                targetHeight = targetWidth / naturalWidth * naturalHeight
            }

            const scaleX = targetWidth / width
            const scaleY = targetHeight / height
            setEndStyle({
                zIndex: 9999,
                //`translate(${(targetWidth-width)/2+(window.innerWidth-targetWidth)/2}px,${(targetHeight-height)/2+(window.innerHeight-targetHeight)/2}px) scale(${scaleX},${scaleY})`
                transform: `translate(${(innerWidth - width) / 2}px,${(innerHeight - height) / 2}px) scale(${scaleX},${scaleY})`
            })
        }), [img])
        const refreshPos = useCallback(async () => {
            const { x, y, height } = img.getBoundingClientRect()
            rectHeight.current = height
            setStartStyle({
                transform: `translate(${x}px,${y}px)`
            })
            resize()
        }, [img])
        useEffect(() => {
            refreshPos()
        }, [className, style, img])

        useEffect(() => {
            resize()
            window.addEventListener('resize', resize)
            return () => {
                window.removeEventListener('resize', resize)
            }
        }, [img])

        useEffect(() => {
            if (fullscreen) {
                clearAll()
                setTimeout(() => setShowImage(true), 100)
            } else {
                setShowImage(false)
            }
            lockBody(fullscreen)
        }, [fullscreen])

        useEffect(() => {
            const open = () => {
                setFullscreen(true)
            }
            img.addEventListener('click', open)
            open()
            return () => {
                img.removeEventListener('click', open)
            }
        }, [img])
        return <Modal open={fullscreen} onClose={() => { setFullscreen(false) }}>
            <img ref={refForward} style={{ ...stillStyle, ...showImage ? endStyle : startStyle }} className={styleTransition} {...prop} onTransitionEnd={onRendered} />
        </Modal>
    })
export default FullscreenImage