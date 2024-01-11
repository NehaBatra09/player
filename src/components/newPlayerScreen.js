// NewPlayerScreen.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, MenuItem } from '@material-ui/core';

const roles = ['Batsman', 'All-Rounder', 'Bowler'];

const NewPlayerScreen = ({ history }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [role, setRole] = useState('Batsman');
    const [points, setPoints] = useState(0);

    const handleSubmit = () => {
        const newPlayer = { name, role, points, type: 'Domestic' };
        dispatch({ type: 'ADD_PLAYER', payload: newPlayer });
        history.push('/');
    };

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div>
                <h2>New Player</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "40px" }}>
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
                    type="number"
                    label="Points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add Player
                </Button>
            </div>
        </div>
    );
};

export default NewPlayerScreen;
