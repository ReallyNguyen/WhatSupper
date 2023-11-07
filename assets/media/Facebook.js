import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Facebook = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} width="57" height="57" viewBox="0 0 53 67">
        <Rect width={54} height={54} fill="#4267B2" rx={15} />
        <Path
            fill="#F1EFEF"
            d="M37 27c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V30h-2v-3h2v-2.5c0-1.93 1.57-3.5 3.5-3.5H31v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
        />
    </Svg>
)
export default Facebook 
