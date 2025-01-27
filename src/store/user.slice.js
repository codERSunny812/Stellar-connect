
export const userSlice = (set)=>({
    userData:null,
    allSignedUpUser:null,
    setUser:(user)=>set({userData:user}),
    setSignedUpUser :(user)=> set({allSignedUpUser:user})
})