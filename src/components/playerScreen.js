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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: "40px" }}>
                {players?.map((player) => (
                    <Card key={player.id}>
                        <CardContent>
                            <p>Name: {player.name}</p>
                            <p>Role: {player.role}</p>
                            <p>Points: {player.points}</p>
                        </CardContent>
                    </Card>
                ))}
                <Link to="/new-player">
                    <Button variant="contained" color="primary">
                        Add New Player
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PlayersScreen;
