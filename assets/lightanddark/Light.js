import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Light = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} width="55" height="60" viewBox="-18 2 45 45">
        <Path
            fill="#221F1F"
            d="M7.5 2.3V1Zm0 10.4V14ZM3.87 3.87l-.92-.92Zm7.353 7.353.92.92ZM2.3 7.5H1Zm10.4 0H14Zm-1.476-3.63.919-.92ZM3.87 11.222l-.92.92Zm3.63-.473a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Z"
        />
        <Path
            stroke="#221F1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.13}
            d="M7.5 2.3V1m0 11.7V14M3.87 3.87l-.92-.92m8.273 8.273.92.92M2.3 7.5H1m11.7 0H14m-2.777-3.63.92-.92M3.87 11.223l-.92.92M7.5 10.75a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Z"
        />
    </Svg>
)
export default Light
