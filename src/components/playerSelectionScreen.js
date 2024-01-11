// PlayerSelectionScreen.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';

const PlayerSelectionScreen = ({ history }) => {
    const dispatch = useDispatch();
    const players = useSelector((state) => state.players);
    const selectedPlayers = useSelector((state) => state.selectedPlayers);

    const handlePlayerSelection = (selectedPlayer) => {
        dispatch({ type: 'SELECT_PLAYER', payload: selectedPlayer });
    };

    const handleRemovePlayer = (removedPlayer) => {
        dispatch({ type: 'REMOVE_PLAYER', payload: removedPlayer });
    };

    const handleProceed = () => {
        history.push('/result');
    };

    return (
        <div>
            <h2>Player Selection</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h3>All Players</h3>
                    <List>
                        {players?.map((player) => (
                            <ListItem
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
            <Button variant="contained" color="primary" onClick={handleProceed}>
                Proceed to Result
            </Button>
        </div>
    );
};

export default PlayerSelectionScreen;
