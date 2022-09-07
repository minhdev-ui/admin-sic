import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loading = (props) => {
  // const [loading, setLoading] = useState(false);
  // const location = useLocation();

  return (
    <>
      {props.loading && (
        <div className="loading-container">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p className="content">Loading . . .</p>
        </div>
      )}
      {!props.loading && props.children}
    </>
  );
};

export default Loading;
