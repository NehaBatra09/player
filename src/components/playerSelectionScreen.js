// PlayerSelectionScreen.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const teamPlayers = {
    "Batsman": 5,
    "All-Rounder ": 2,
    "Bowler": 4
}
const PlayerSelectionScreen = ({ history }) => {
    const [myTeams, setDoneMyTeam] = useState(false)
    const [isLimit, setLimit] = useState(false)
    const [totalPPoints, setTotalPPoints] = useState(0)
    const [batsmenCount, setBatsmenCount] = useState(0)
    const [allRoundersCount, setAllRoundersCount] = useState(0)
    const [bowlersCount, setBowlersCount] = useState(0)
    const [domensticCount, setDoemesticCount] = useState(0)
    const [error, setError] = useState({ isError: false, errorMessage: "", role: "", limit: 0 })
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const selectedPlayers = useSelector((state) => state.selectedPlayers);
    const navitage = useNavigate()

    useEffect(() => {
        calculatePoints()
    }, [selectedPlayers])
    const calculatePoints = () => {
        const batsmenCount = selectedPlayers.filter((player) => player.role === 'Batsman').length;
        const allRoundersCount = selectedPlayers.filter((player) => player.role === 'All-Rounder').length;
        const bowlersCount = selectedPlayers.filter((player) => player.role === 'Bowler').length;
        const domesticPlayersCount = selectedPlayers.filter((player) => player.type === 'Domestic').length;
        const totalPoints = selectedPlayers.reduce((acc, player) => acc + parseInt(player.points), 0);
        setBatsmenCount(batsmenCount)
        setBowlersCount(bowlersCount)
        setAllRoundersCount(allRoundersCount)
        setDoemesticCount(domensticCount)

        let lastPlayer = null

        if (batsmenCount > 5 || allRoundersCount > 2 || bowlersCount > 4) {
            lastPlayer = selectedPlayers[selectedPlayers.length - 1]
            setError({ ...error, isError: true, role: lastPlayer["role"], errorMessage: lastPlayer["role"] + " team limit exceed . please remove one member" })
        } else {
            if (selectedPlayers.length > 11 || totalPPoints > 100) {
                if (domesticPlayersCount < 2) {
                    setError({ ...error, isError: true, role: "", errorMessage: "Team should have 2 domestic members" })
                } else {
                    setError({ ...error, isError: true, role: "", errorMessage: "11 Team member selected." })
                }
            }
        }

        setTotalPPoints(totalPoints)

    }
    const handlePlayerSelection = (selectedPlayer, action,) => {
        if (action === "ADD") {
            dispatch({ type: 'SELECT_PLAYER', payload: selectedPlayer });
        } else {
            if (action === "REMOVE") {
                dispatch({ type: 'REMOVE_PLAYER', payload: selectedPlayer });
            }
        }
    };




    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Player Selection : Total Points  {error.isError || isLimit ? <h2 style={{ color: "red" }}>{totalPPoints}  {error.errorMessage}</h2> : totalPPoints}</h2>
            <h2 style={{ textAlign: "center" }}>Batsman:{batsmenCount + "_____"} Bowlers:{bowlersCount + " ______"} All-Rounder : {allRoundersCount}</h2>
            <Button onClick={() => navitage("/new-player")}>Create Domestic Player</Button>
            <Button disabled={error.isError} onClick={() => setDoneMyTeam(true)}>Create My Team</Button>
            <div style={{ display: 'flex' }}>
                <div style={{ display: "flex", backgroundColor: "lightblue", flexDirection: "column", width: "200px" }}>
                    <h3>All Players</h3>
                    <List>
                        {players?.map((player) => (
                            <ListItem
                                key={player.id}

                            >
                                <ListItemText
                                    primary={player.name}
                                    secondary={`Role: ${player.role}, Points: ${player.points} ${player.type}`}
                                />
                                <Button onClick={() => handlePlayerSelection(player, selectedPlayers.includes(player) || isLimit ? "REMOVE" : "ADD")}>{selectedPlayers.includes(player) || isLimit ? "REMOVE" : "ADD"}</Button>

                            </ListItem>
                        ))}
                    </List>
                </div>
                <div style={{ flex: 1, width: "50%" }}>
                    <h3>Selected Players</h3>

                    <List>
                        {selectedPlayers?.map((player) => (
                            <ListItem
                                key={player.id}
                                button

                            >
                                <ListItemText
                                    primary={player.name}
                                    secondary={`Role: ${player.role}, Points: ${player.points} Type: ${player.type}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
                {myTeams &&
                    <div style={{ flex: 1, width: "50%" }}>
                        <h3>My Team</h3>
                        <List>
                            {selectedPlayers?.map((player) => (
                                <ListItem
                                    key={player.id}
                                    button

                                >
                                    <ListItemText
                                        primary={player.name}
                                        secondary={`Role: ${player.role}, Points: ${player.points} Type: ${player.type}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                }
            </div>

        </div>
    );
};

export default PlayerSelectionScreen;
