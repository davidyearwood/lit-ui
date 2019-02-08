/* eslint-disable no-unused-vars */
import React from "React";
import { Svg } from "expo";
import PropTypes from "prop-types";

function FireIcon({ height, width }) {
  const { Path } = Svg;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.72694 1.59279C9.14538 2.06495 8.62031 2.56133 8.15506 3.05992C7.39289 2.14128 6.44787 1.20943 5.37758 0.34021C2.6303 2.57063 0.68042 5.47676 0.68042 7.22939C0.68042 10.3425 3.48446 12.866 6.94331 12.866C10.4022 12.866 13.2062 10.3425 13.2062 7.22939C13.2062 5.92617 11.7529 3.23826 9.72694 1.59279ZM9.18257 9.92659C8.57697 10.2975 7.83018 10.5174 7.02327 10.5174C5.00601 10.5174 3.36451 9.34947 3.36451 7.45323C3.36451 6.50866 4.0442 5.67638 5.39967 4.25451C5.59343 4.44974 8.16289 7.32088 8.16289 7.32088L9.80215 5.6847C9.9179 5.85228 10.0233 6.0162 10.1172 6.17326C10.8819 7.45005 10.5593 9.08379 9.18257 9.92659Z"
        fill="white"
      />
    </Svg>
  );
}
FireIcon.defaultProps = {
  height: 13,
  width: 14
};
export default FireIcon;
