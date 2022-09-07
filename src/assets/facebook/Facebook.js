import React from "react";

function LoginFacebook() {
  <div
    class="fb-login-button"
    data-width="100%"
    data-size="large"
    data-button-type="continue_with"
    data-layout="default"
    data-auto-logout-link="false"
    data-use-continue-as="false"
  ></div>;
}

function LikeAndShare({ url }) {
  return (
    <div
      class="fb-like"
      data-href={url} // post href share
      data-width=""
      data-layout="standard"
      data-action="like"
      data-size="small"
      data-share="true"
    ></div>
  );
}

function Comment({ url }) {
  return (
    <div
      class="fb-comments facebook-cm"
      data-href={url}
      data-width="100%"
      data-numposts="5"
      ></div>
  );
}

export { LikeAndShare, Comment, LoginFacebook };
