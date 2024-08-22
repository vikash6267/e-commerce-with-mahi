import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  sessionID: localStorage.getItem("sessionID") ? JSON.parse(localStorage.getItem("sessionID")) : null,

}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setSessionID(state, value) {
      state.sessionID = value.payload;
    },
  },
})

export const { setUser, setLoading ,setToken,setSessionID} = profileSlice.actions

export default profileSlice.reducer
