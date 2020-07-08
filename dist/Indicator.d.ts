/// <reference types="react" />
import BaseComponentProps from './BaseComponentProps';
export declare enum IndicateLevel {
    PRELOAD = 0,
    ERROR = 1
}
export interface IndicatorProps extends BaseComponentProps {
    level: IndicateLevel;
    description?: string;
}
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
export declare function Indicator(props: IndicatorProps): JSX.Element;
//# sourceMappingURL=Indicator.d.ts.map