//loading spinner

import "react";
import PropTypes from "prop-types";

export const CircleSpinner = ({ size = `50px` }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full  border-blue-600"
        style={{
          height: size,
          width: size,
          borderWidth: "4px",
          borderBottomColor: "transparent",
        }}
      />
    </div>
  );
};
CircleSpinner.propTypes = {
  size: PropTypes.string,
};
