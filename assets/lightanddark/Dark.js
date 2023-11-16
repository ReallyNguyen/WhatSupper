import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Dark = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} width="40" height="45" viewBox="-10 2 45 45">
        <Path
            fill="#F1EFEF"
            stroke="#F1EFEF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 8.702a8.297 8.297 0 0 0 16 3.087A8.297 8.297 0 0 1 5.61 4.092c0-1.088.212-2.14.593-3.092A8.3 8.3 0 0 0 1 8.702Z"
        />
    </Svg>
)
export default Dark
