import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Dark = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            fill="#F1EFEF"
            stroke="#F1EFEF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.13}
            d="M1 5.353a4.69 4.69 0 0 0 9.043 1.745A4.69 4.69 0 0 1 3.94 1 4.692 4.692 0 0 0 1 5.353Z"
        />
    </Svg>
)
export default Dark
