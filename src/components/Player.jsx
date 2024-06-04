import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEding] = useState(false);

    function handelClick() {
        setIsEding(editing => !editing);
        if(isEditing)
            onChangeName(symbol, playerName)
    }

    const handelChange = (e) => {
        setPlayerName(e.target.value);
    }

    let editablPlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = "Edite";
    if(isEditing) {
        editablPlayerName = <input type="text" required defaultValue={playerName} onChange={handelChange}/>;
        btnCaption = "Save";
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handelClick}>{btnCaption}</button>
        </li>
    );
}