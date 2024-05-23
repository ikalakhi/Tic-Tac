import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEding] = useState(false);

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
            <button onClick={() => setIsEding(editing => !editing)}>{btnCaption}</button>
        </li>
    );
}