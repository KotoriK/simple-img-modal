import EXIF from 'exifreader'
import { useState, useEffect } from 'react'
import PropLabel from './PropLabel'
import React from 'react'
import './MetaPannel.css'
import { GPSInfo, translateGPSTag, GPSToReadble } from './GPS'
import SignedCollapse from './SignedCollapse'
import { Iterator2Array } from './util'

export const exifNameTranslateMap = new Map<string, string>([
    ['ApertureValue', '光圈值'],
    ['ApproximateFocusDistance', '对焦点距离'],
    ['Artist', '艺术家'],
    ['Bits Per Sample', '采样位深'],
    ['CameraProfile', '相机颜色配置文件'],
    ['Color Components', '原色数'],
    ['ColorSpace', '色彩空间'],
    ['Copyright', '版权'],
    ['ExposureMode', '曝光模式'],
    ['ExposureProgram', '曝光程序'],
    ['ExposureTime', '曝光时间'],
    ['Flash', '闪光灯'],
    ['FocalLength', '焦距'],
    ['format', '格式'],
  /*   ['GPSAltitude', '海拔'],
    ['GPSAltitudeRef', '海拔相对'],
    ['GPSLatitude', '纬度'],
    ['GPSLongitude', '经度'],
    ['GPSSpeed', '移动速度'],
    ['GPSSpeedRef', '速度单位'], */
    ['ICC Description', 'ICC配置文件说明'],
    ['Image Width', '图像宽度'],
    ['Image Height', '图像高度'],
    ['ISOSpeedRatings', 'ISO速度'],
    ['Lens', '镜头'],
    ['LensModel', '镜头型号'],
    ['LensMake', '镜头制造商'],
    ['Make', '相机制造商'],
    ['MeteringMode', '测光模式'],
    ['Model', '相机型号'],
    ['ModifyDate', '修改日期'],
    ['Orientation', '方向'],
    ['SceneType', '场景模式'],
    ['ShutterSpeedValue', '快门时间'],
    ['Subsampling', '色度抽样 '],
    ['WhiteBalance', '白平衡']
])
export interface MetaPannelProps {
    imgSrc: string
    showAll?: boolean
    interests?: Array<string>
}
export default function MetaPannel(props: MetaPannelProps) {
    const [propLabels, setPropLabels] = useState<Array<JSX.Element>>([])
    const [error, setError] = useState<JSX.Element>()
    const [imgExifs, setExif] = useState<EXIF.Tags & EXIF.XmpTags & EXIF.IccTags>()
    if (props.imgSrc) {
        useEffect(() => {
            fetch(props.imgSrc, { method: 'GET' })
                .then(async (response) => {
                    setExif(EXIF.load(await response.arrayBuffer()))
                })
                .catch((reason) => {
                    setError(error2Descr(reason))
                })
        }, [props.imgSrc])
        useEffect(() => {
            if (imgExifs) {
                let newPropLabels: Array<JSX.Element>, tryGPS: boolean = false
                if (props.showAll || !props.interests) {
                    tryGPS = true
                    newPropLabels =
                        Iterator2Array(exifNameTranslateMap.keys()).map((key, index) => {
                            const value = imgExifs[key]
                            if (value) return wrapper(index, key, value)
                        })
                } else {
                    newPropLabels =
                        props.interests.map((interest, index) => {
                            if (interest === 'GPS') tryGPS = true
                            const value = imgExifs[interest]
                            if (value) return wrapper(index, interest, value)

                        })
                }
                if (tryGPS) {
                    const GPSInfo = getGPSInfo(imgExifs)
                    if (GPSInfo) newPropLabels.push(
                        wrapperCollapse(newPropLabels.length, 'GPS',
                            translateGPSTag(GPSToReadble(GPSInfo))))
                }
                setPropLabels(newPropLabels)
            }
        }, [props.interests, imgExifs])
        return (<>
            {propLabels.length > 0 ? (propLabels) : (error ? error : <span>正在加载EXIF信息...</span>)}
        </>)
    } else {
        return (<></>)//跳过渲染
    }

}

function getCaption(propName: string) {
    const translate = exifNameTranslateMap.get(propName)
    return translate ? translate : propName
}
function error2Descr(e: Error | string) {
    const msg = typeof e === 'string' ? e : e.message
    switch (msg) {
        case 'Invalid image format':
            return (<><strong>错误：</strong><span>不支持的图片格式。</span></>)
        case 'Failed to fetch':
            return (<><strong>错误：</strong><span>源站不允许脚本访问。</span></>)
        default:
            console.warn(e)
            return (<><strong>错误：</strong><span>未知的错误。</span></>)
    }
}
export type WrapperFunc = (key: string | number, tagName: string, tag: any) => JSX.Element
/* function wrapper(key: string | number, tagName: string, tag: EXIF.XmpTag & EXIF.ValueTag) {
    let value: string
    switch (tagName) {
        default: value = tag.description
    }
    return (
        <li key={key}>
        <PropLabel caption={getCaption(tagName)}
            value={value} /></li>)
} */
function wrapper(key: string | number, tagName: string, tag: EXIF.XmpTag & EXIF.ValueTag) {
    return (
        <li key={key}>
            <PropLabel caption={getCaption(tagName)}
                value={tag.description} /></li>)
}
function wrapperString(key: string | number, tagName: string, tag: string) {
    return (
        <li key={key}>
            <PropLabel caption={getCaption(tagName)}
                value={tag} /></li>)
}
export function getGPSInfo(exif: EXIF.Tags & EXIF.XmpTags & EXIF.IccTags): GPSInfo | undefined {
    const obj = {
        altitude: exif.GPSAltitude ? exif.GPSAltitude.description : undefined,
        altitudeRef: exif.GPSAltitudeRef ? exif.GPSAltitudeRef.value : undefined,
        latitude: exif.GPSLatitude ? exif.GPSLatitude.description : undefined,
        latitudeRef: exif.GPSLatitudeRef ? exif.GPSLatitudeRef.value[0] : undefined,
        longitude: exif.GPSLongitude ? exif.GPSLongitude.description : undefined,
        longitudeRef: exif.GPSLongitudeRef ? exif.GPSLongitudeRef.value[0] : undefined,
        speed: exif.GPSSpeed ? exif.GPSSpeed.description : undefined,
        speedRef: exif.GPSSpeedRef ? exif.GPSSpeedRef.description : undefined
    }
    let isFullfied: boolean = true
    for (const value of Object.values(obj)) {
        isFullfied = isFullfied && (value !== undefined)
    }
    return isFullfied ? obj : undefined
}
function wrapperCollapse(key: number | string, name: string, obj: Object) {
    return (<li key={key}><SignedCollapse name={name} obj={obj} wrapper={wrapperString} />
    </li>)
}