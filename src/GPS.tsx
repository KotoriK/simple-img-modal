import React, { useState, useEffect } from "react"
import MapModal from "./MapModal"
import ReactDOM from "react-dom"
import { createUseStyles } from "react-jss";
import './Button.scss'
const button_color_h = "219deg"
const button_color_s = "95.5%"
const button_color_l = "41.9%"
const useButtonStyle = createUseStyles(() => {
    return {
        "btn": {
            borderRadius: "0.2rem",
            padding: "1px",
            cursor: "pointer",
            transition: " all 200ms ease-in-out",
            textDecoration: "underline",
            "&:hover": {
                backgroundColor: `hsl(${button_color_h}, ${button_color_s}, ${button_color_l} + 15%)`,
                textDecoration: "none",
            }
        }
    }
})
export interface GPSInfo extends GPSBaseInfo {
    //ref:https://www.colorpilot.com/exiftable3.html
    altitudeRef: GPSAltitudeRef
    latitudeRef: 'N' | 'S' | string
    longitudeRef: 'W' | 'E' | string
    speedRef: string
}
export interface GPSReadableInfo extends GPSBaseInfo {

    map: JSX.Element
}
export interface GPSBaseInfo {
    altitude: string
    latitude: string
    longitude: string
    speed: string
}
export enum GPSAltitudeRef {
    'above', 'below'
}
export function GPSToReadble(info: GPSInfo): GPSReadableInfo {
    return {
        altitude: '海拔' + (info.altitudeRef == 0 ? '' : '-') + info.altitude,
        latitude: (info.latitudeRef == 'N' ? '北纬' : '南纬') + info.latitude,
        longitude: (info.longitudeRef == 'W' ? '西经' : '东经') + info.longitude,
        map: (<ShowMap lat={info.latitude} lng={info.longitude} />),
        speed: `${info.speed} ${info.speedRef}`
    }
}
export function translateGPSTag(obj: GPSReadableInfo) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        return [GPSTagTranslate.get(key), value]
    }))
}
export const GPSTagTranslate = new Map<string, string>([
    ['altitude', '高度'], ['latitude', '纬度'], ['longitude', '经度'], ['speed', '速度'], ['map', '地图']
])
function ShowMap({ lat, lng }) {
    const [opacity, setOpacity] = useState<boolean>(false)
    useEffect(() => {
        const node = document.createElement('div')
        document.body.appendChild(node)
        ReactDOM
            .render(<MapModal
                opacity={opacity}
                handleOpacityChange={setOpacity}
                mapSrc={`http://api.map.baidu.com/geocoder?location=${lat},${lng}&output=html&coord_type=wgs84&src=webapp.baidu.openAPIdemo`} />
                , node)
        return () => {
            ReactDOM.unmountComponentAtNode(node)
            document.body.removeChild(node)
        }
    })
    const styles = useButtonStyle()
    return (<span className={styles.btn} onClick={() => { setOpacity(true) }}>显示拍摄地点</span>
    )
}