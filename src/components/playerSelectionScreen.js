// PlayerSelectionScreen.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
const teamPlayers = {
    "Batsman": 5,
    "All-Rounder ": 2,
    "Bowler": 4
}
const PlayerSelectionScreen = ({ history }) => {
    const [totalPoints, setTotalPoints] = useState(0)
    const [error, setError] = useState({ isError: false, errorMessage: "", role: "", limit: 0 })
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const selectedPlayers = useSelector((state) => state.selectedPlayers);


    useEffect(() => {
        calculatePoints()
    }, [selectedPlayers])
    const calculatePoints = () => {
        const batsmenCount = selectedPlayers.filter((player) => player.role === 'Batsman').length;
        const allRoundersCount = selectedPlayers.filter((player) => player.role === 'All-Rounder').length;
        const bowlersCount = selectedPlayers.filter((player) => player.role === 'Bowler').length;
        const domesticPlayersCount = selectedPlayers.filter((player) => player.type === 'Domestic').length;
        const totalPoints = selectedPlayers.reduce((acc, player) => acc + parseInt(player.points), 0);
        let lastPlayer = null

        if (batsmenCount > 5 || allRoundersCount > 2 || bowlersCount > 4) {

            lastPlayer = selectedPlayers[selectedPlayers.length - 1]
            setError({ ...error, isError: true, role: lastPlayer["role"], errorMessage: lastPlayer["role"] + " team limit exceed . please remove one member" })
        } else {
            setError({ ...error, isError: false, role: "", errorMessage: "" })
        }
        if (selectedPlayers.length > 11) {
            if (domesticPlayersCount < 2) {
                setError({ ...error, isError: true, role: "", errorMessage: "Team should have 2 domestic members" })
            } else {
                setError({ ...error, isError: true, role: "", errorMessage: "11 Team member selected." })
            }
        }

        setTotalPoints(totalPoints)

    }
    const handlePlayerSelection = (selectedPlayer) => {
        if (error.isError) {
            alert("Please remove team member..")
        } else {
            dispatch({ type: 'SELECT_PLAYER', payload: selectedPlayer });
        }
    };

    const handleRemovePlayer = (removedPlayer) => {
        dispatch({ type: 'REMOVE_PLAYER', payload: removedPlayer });
    };


    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Player Selection : Total Points  {error.isError || totalPoints > 100 ? <h2 style={{ color: "red" }}>{totalPoints}  {error.errorMessage}</h2> : totalPoints}</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ display: "flex", backgroundColor: "lightblue", flexDirection: "column", width: "200px" }}>
                    <h3>All Players</h3>
                    <List>
                        {players?.map((player) => (
                            <ListItem
                                disabled={error.isError}
                                key={player.id}
                                button
                                onClick={() => handlePlayerSelection(player)}
                            >
                                <ListItemText
                                    primary={player.name}
                                    secondary={`Role: ${player.role}, Points: ${player.points}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Selected Players</h3>
                    <List>
                        {selectedPlayers?.map((player) => (
                            <ListItem
                                key={player.id}
                                button
                                onClick={() => handleRemovePlayer(player)}
                            >
                                <ListItemText
                                    primary={player.name}
                                    secondary={`Role: ${player.role}, Points: ${player.points}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>

        </div>
    );
};

export default PlayerSelectionScreen;
