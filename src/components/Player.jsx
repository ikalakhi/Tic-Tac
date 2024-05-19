import { useState } from "react";

export default function Player({name, symbol}) {
    const [isEditing, setIsEding] = useState(false);

    let playerName = <span className="player-name">{name}</span>;
    if(isEditing) {
        playerName = <input type="text" required/>;
    }
    return(
        <li>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => setIsEding(true)}>Edite</button>
        </li>
    );
}