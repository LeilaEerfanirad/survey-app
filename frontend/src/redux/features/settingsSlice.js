import { createSlice } from '@reduxjs/toolkit';
const initialState = {

    layout: {
        drawer: {
            isCompact: false,
            isOpen: false
        }
    }

    ,
    theme: "dark"

}



export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {

        toggleCompactDrawer: (state, action) => {
            state.layout.drawer.isCompact = !state.layout.drawer.isCompact
        },
        toggleOpenDrawer: (state, action) => {
            state.layout.drawer.isOpen = !state.layout.drawer.isOpen
        },

    }
})


export const { toggleCompactDrawer, toggleOpenDrawer } = settingsSlice.actions

export default settingsSlice.reducer;
