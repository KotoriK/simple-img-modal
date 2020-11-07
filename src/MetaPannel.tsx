import EXIF from 'exifreader'
import { useState, useEffect } from 'react'
import PropLabel from './PropLabel'
import React from 'react'
import './MetaPannel.css'
import { GPSInfo, translateGPSTag, GPSToReadble } from './GPS'
import SignedCollapse from './SignedCollapse'
import { intlDate } from './const'

export const exifNameTranslateMap = new Map<string, string>([
    ['ApproximateFocusDistance', '对焦点距离'],
    ['Artist', '艺术家'],
    ['Bits Per Sample', '采样位深'],
    ['CameraProfile', '相机颜色配置文件'],
    ['Color Components', '原色数'],
    ['ColorSpace', '色彩空间'],
    ['Copyright', '版权'],
    ['ExposureMode', '曝光模式'],
    ['ExposureProgram', '曝光程序'],
    ['ApertureValue', '光圈值'],
    ['ExposureTime', '曝光时间'],
    ['FocalLength', '焦距'],
    ['FocalLengthIn35mmFilm', '焦距（等效35mm）'],
    ['ShutterSpeedValue', '快门速度'],
    ['Flash', '闪光灯'],
    ['format', '格式'],
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
    ['WhiteBalance', '白平衡'],
    ['SceneCaptureType', "场景模式"]
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
                .then(async (resp) => {
                    if (resp.ok) {
                        setExif(EXIF.load(await resp.arrayBuffer()))
                    } else {
                        setError(error2Descr({ message: 'HTTP '+resp.status, name: "HTTP" }))
                    }
                })
                .catch((reason) => {
                    setError(error2Descr(reason))
                })
        }, [props.imgSrc])
        useEffect(() => {
            if (imgExifs) {
                console.log(imgExifs)
                let newPropLabels: Array<JSX.Element>, tryGPS = false, tryDateTime = false
                if (props.showAll || !props.interests) {
                    tryGPS = true
                    tryDateTime = true
                    newPropLabels =
                        Array.from(exifNameTranslateMap.keys()).map((key, index) => {
                            const value = imgExifs[key]
                            if (value) return wrapper(index, key, value)
                        })
                } else {
                    newPropLabels =
                        props.interests.map((interest, index) => {
                            if (interest === 'GPS') { tryGPS = interest === 'GPS'; return }
                            if (interest === 'DateTime') { tryDateTime = interest === 'DateTime'; return }
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
                if (tryDateTime) {
                    const date = imgExifs.DateTimeDigitized?.description.match(/([0-9]{4}):([0-9]{2}):([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/),
                        _offset = imgExifs['OffsetTimeDigitized']?.description
                    if (date) {
                        let hour_offset: number = 0, minute_offset: number = 0
                        const [year, month, day, hour, minute, second] = date.slice(1).map(value => parseInt(value))
                        if (_offset) {
                            const offset = _offset.match(/([+-])([0-9]{2}):([0-9]{2})/)
                            const [_offset_type, _hour_offset, _minute_offset] = offset.slice(1)
                            const offset_type = _offset_type === '+' ? '-' : '+'
                            hour_offset = parseInt(`${offset_type}${_hour_offset}`)
                            minute_offset = parseInt(`${offset_type}${_minute_offset}`)
                            newPropLabels.unshift(wrapperString('dttz', '拍摄者所在时区', _offset))
                        }
                        const _time = [year, month - 1, day, hour + hour_offset, minute + minute_offset, second]
                        //@ts-ignore
                        newPropLabels.unshift(_offset ? wrapperString('dt', '拍摄时间（你的本地时区）', intlDate.format(new Date(Date.UTC(..._time)))) : wrapperString('dt', '拍摄时间（时区未知）', new Date(..._time).toLocaleString()))


                    }
                }
                setPropLabels(newPropLabels)
            }
        }, [props.interests, imgExifs])
        return (<>
            {(propLabels.length > 0) ? propLabels : (error || <span>正在加载EXIF信息...</span>)}
        </>)
    } else {
        return (<></>)//跳过渲染
    }
}

function getCaption(propName: string) {
    const translate = exifNameTranslateMap.get(propName)
    return translate || propName
}
function _error2Descr(prefix: string, desc: string) {
    return <PropLabel caption={prefix} value={desc}></PropLabel>
}
function error2Descr(e: Error | string) {
    let prefix: string = "错误", desc: string
    let msg: string
    if (typeof e === 'string') {
        msg = e
    } else {
        msg = e.message
        if (e.name == 'HTTP') {
            desc = msg
            return _error2Descr(prefix, desc)
        }
    }
    switch (msg) {
        case 'Invalid image format':
            desc = '不支持的图片格式。'
            break
        case 'Failed to fetch':
            desc = '源站不允许脚本访问。'
            break
        case 'No Exif data':
            desc = "这个图片没有EXIF数据。"
            break
        default:
            console.warn(e)
            desc = '未知的错误。'
    }
    return _error2Descr(prefix, desc)
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
    return wrapperString(key, tagName, tag.description)
}
function wrapperString(key: string | number, tagName: string, tag: string) {
    return (
        <li key={key}>
            <PropLabel caption={getCaption(tagName)}
                value={tag} />
        </li>)
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
    const values = Object.values(obj).values()
    while (isFullfied) {
        const { value, done } = values.next()
        if (done) break
        isFullfied = value !== undefined
    }
    return isFullfied ? obj : undefined
}
function wrapperCollapse(key: number | string, name: string, obj: Object) {
    return (<li key={key}>
        <SignedCollapse name={name} obj={obj} wrapper={wrapperString} />
    </li>)
}