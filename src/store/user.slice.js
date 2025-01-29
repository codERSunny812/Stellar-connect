
export const userSlice = (set)=>({
    userData:null,
    allSignedUpUser:null,
    connections:0,
    setUser:(user)=>set({userData:user}),
    setSignedUpUser :(user)=> set({allSignedUpUser:user}),
    setConnection:(user)=> set({connections:user})
})