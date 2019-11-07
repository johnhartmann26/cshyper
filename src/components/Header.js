import React from "react";

function Header(props) {
    let buttonText = "";
    if (props.isHome) {
        buttonText = "Set my rankings";
    } else {
        buttonText = "See the rankings";
    }
    return (
        <div className="navBar">
            <h1 className="title"> csHyper</h1>
            <button className="switchButton" onClick={props.switch}>
                {buttonText}
            </button>
        </div>
    );
}

export default Header;
