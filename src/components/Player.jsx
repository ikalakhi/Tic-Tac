import { useState } from "react";

export default function Player({name, symbol}) {
    const [isEditing, setIsEding] = useState(false);

    let playerName = <span className="player-name">{name}</span>;
    let btnCaption = "Edite";
    if(isEditing) {
        playerName = <input type="text" required value={name}/>;
        btnCaption = "Save";
    }
    return(
        <li>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => setIsEding(editing => !editing)}>{btnCaption}</button>
        </li>
    );
}