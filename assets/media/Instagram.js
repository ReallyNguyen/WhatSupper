import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Instagram = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} width="57" height="57" viewBox="0 0 53 67">
        <Rect width={54} height={54} fill="#833AB4" rx={15} />
        <Path
            fill="#F1EFEF"
            d="M22.8 17h8.4c3.2 0 5.8 2.6 5.8 5.8v8.4a5.8 5.8 0 0 1-5.8 5.8h-8.4c-3.2 0-5.8-2.6-5.8-5.8v-8.4a5.8 5.8 0 0 1 5.8-5.8Zm-.2 2a3.6 3.6 0 0 0-3.6 3.6v8.8c0 1.99 1.61 3.6 3.6 3.6h8.8a3.6 3.6 0 0 0 3.6-3.6v-8.8c0-1.99-1.61-3.6-3.6-3.6h-8.8Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM27 22a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        />
    </Svg>
)
export default Instagram
