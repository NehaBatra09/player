// NewPlayerScreen.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const roles = ['Batsman', 'All-Rounder', 'Bowler'];

const NewPlayerScreen = ({ history }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [role, setRole] = useState('Batsman');
    const [points, setPoints] = useState(0);
    const naviagte = useNavigate()
    const handleSubmit = () => {
        const newPlayer = { name, role, points, type: 'Domestic' };
        dispatch({ type: 'ADD_PLAYER', payload: newPlayer });
        naviagte("/")
    };

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <h2>New Player</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "40px" }}>
                <TextField
                    label="Type"
                    value={"Domestic Player"}
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField

                    fullWidth
                    select
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    {roles.map((r) => (
                        <MenuItem key={r} value={r}>
                            {r}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="Pints"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                >
                    {[1, 2, 3, 4, 5].map((r) => (
                        <MenuItem key={r} value={r}>
                            {r}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add Player
                </Button>
            </div>
        </div>
    );
};

export default NewPlayerScreen;
