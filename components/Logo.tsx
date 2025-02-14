import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Logo = (props: SvgProps) => (
  <Svg width={147} height={147} viewBox="0 0 147 147" fill="none" {...props}>
    <Path
      d="M146.109 73.044c0 40.341-32.703 73.044-73.0444 73.044C32.7246 146.088.022 113.385.022 73.044.022 32.703 32.7246 0 73.0646 0c40.3414 0 73.0444 32.703 73.0444 73.044Z"
      fill="#CCFF00"
    />
    <Path
      d="M97.102 67.677H49.76s-3.551 8.564-3.551 8.564h51.236s8.906.063 8.906 8.907c0 9.121-8.906 8.905-8.906 8.905l-60.502-.012s-8.906 1.712-12.674 8.615l72.958-.046s17.698.007 17.698-17.292c0-17.585-17.823-17.641-17.823-17.641Z"
      stroke="#38006B"
      strokeWidth={4.117}
      strokeMiterlimit={10}
    />
    <Path
      d="m102.377 34.083-44.85.073c-17.075 0-22.009 15.332-22.009 15.332L16.318 93.883c12.351.177 18.594-9.828 18.594-9.828l12.526-29.179s2.159-7.517 10.215-7.517c-.04-.024 15.965.052 15.907.005h28.805s10.6.034 10.6 10.364c0 3.778-1.349 5.319-2.159 6.668 0 0 2.391 1.079 5.282 4.356 3.482 3.947 3.798 5.739 3.816 5.704.038-.077 6.474-5.85 6.474-16.65 0-23.647-24.001-23.723-24.001-23.723Z"
      fill="#38006B"
    />
  </Svg>
);

export default Logo; 