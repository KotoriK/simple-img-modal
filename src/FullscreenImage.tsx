import debounce from "@mui/utils/debounce"
import { useRef, useState, CSSProperties, useEffect, ImgHTMLAttributes, forwardRef, } from "react"
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
}

const FullscreenImage = forwardRef<HTMLImageElement, FullscreenImageProp>(
    function FullscreenImage({ className, style, img, children, ...prop }: FullscreenImageProp, refForward) {

        const [fullscreen, setFullscreen] = useState(false)

        const [startStyle, setStartStyle] = useState<CSSProperties>()
        const [endStyle, setEndStyle] = useState<CSSProperties>()
        const [stillStyle, setStillStyle] = useState<CSSProperties>()

        const rectHeight = useRef<number>()

        const [setTimeout, clearAll] = useTimeout()
        const [showImage, setShowImage] = useState(false)

        useEffect(() => {
            const refreshPos = () => {
                const { x, y, height } = img.getBoundingClientRect()
                rectHeight.current = height
                setStartStyle({
                    transform: `translate(${x}px,${y}px)`
                })
            }
            const open = () => {
                refreshPos()
                setFullscreen(true)
            }
            const resize = debounce(async () => {
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
                    //`translate(${(targetWidth-width)/2+(window.innerWidth-targetWidth)/2}px,${(targetHeight-height)/2+(window.innerHeight-targetHeight)/2}px) scale(${scaleX},${scaleY})`
                    transform: `translate(${(innerWidth - width) / 2}px,${(innerHeight - height) / 2}px) scale(${scaleX},${scaleY})`
                })
            })
            resize()
            refreshPos()
            window.addEventListener('resize', resize)
            img.addEventListener('click', open)
            setTimeout(() => setFullscreen(true),150)
            return () => {
                window.removeEventListener('resize', resize)
                img.removeEventListener('click', open)

            }
        }, [img])

        useEffect(() => {
            if (fullscreen) {
                clearAll()
                setTimeout(() => setShowImage(true), 60)
            } else {
                setShowImage(false)
            }
        }, [fullscreen])

        return <Modal open={fullscreen} onClose={() => {
            setFullscreen(false)
        }}>
            <img ref={refForward}
                style={{ ...stillStyle, ...showImage ? endStyle : startStyle }}
                className={styleTransition} {...prop} />
            {children}
        </Modal>
    })
export default FullscreenImage