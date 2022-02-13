type LogoutButtonPropTypes = {
  readonly readyToLogout: boolean;
  readonly logoutAccount: () => void;
};
import React from "react";
import { LoadingMessage } from "../Messages";
import { words } from "../utility";

const LogoutButton = ({
  readyToLogout,
  logoutAccount,
}: LogoutButtonPropTypes) => (<button className="dropdown-item" disabled={!readyToLogout} id="login-button" onClick={logoutAccount} type="button">
  {readyToLogout ? (<span>
    <i className="fa fa-sign-out" />
    {` ${words.SignOut}`}
                    </span>) : (<span>
    <LoadingMessage message={words.PleaseWait} sm />
              </span>)}
</button>);

export default LogoutButton;
