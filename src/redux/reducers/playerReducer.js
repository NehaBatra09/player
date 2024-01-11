import { players } from "../../utils/playerData"

const initialState = {
    players: players,
    selectedPlayers: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return { ...state, players: [...state.players, action.payload] };
        case 'SELECT_PLAYER':
            return {
                ...state,
                selectedPlayers: [...state.selectedPlayers, action.payload],
            };
        case 'REMOVE_PLAYER':
            return {
                ...state,
                selectedPlayers: state.selectedPlayers.filter(
                    (player) => player.id !== action.payload.id
                ),
            };
        case 'RESET_SELECTED_PLAYERS':
            return {
                ...state,
                selectedPlayers: [],
            };
        default:
            return state;
    }
};

export default reducer;
