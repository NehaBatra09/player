export const addNewPlayer = (playerDetails) => {
    return ({ type: "ADD_NEW_PLAYER", payload: playerDetails })
}
export const removePlayer = (playerId) => {
    return ({ type: "REMOVE_PLAYER", payload: playerId })
}