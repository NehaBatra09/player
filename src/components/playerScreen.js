// PlayersScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent } from '@material-ui/core';

const PlayersScreen = () => {
    const players = useSelector((state) => state.players);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>All Players</h2>
            <div style={{ display: "flex", backgroundColor: "lightblue", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", margin: "50px" }}>
                <Link to="/player-selection">
                    <Button variant="contained" color="primary">
                        Go To Player Selection Screen
                    </Button>
                </Link>
                <Link to="/new-player">
                    <Button variant="contained" color="primary">
                        Add New Player
                    </Button>
                </Link>
            </div>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: "40px", marginTop: "20px", backgroundColor: "lightyellow"
            }}>

                {players?.map((player) => (
                    <Card key={player.id}>
                        <CardContent>
                            <p>Name: {player.name}</p>
                            <p>Role: {player.role}</p>
                            <p>Points: {player.points}</p>
                            <p>Type: {player.type}</p>
                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    );
};

export default PlayersScreen;
