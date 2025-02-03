export const userSlice = (set) => ({
  userData: null,
  allSignedUpUser: null,
  connections:0,
  requestPending:null,
  friends:null,
  setUser: (user) => set({ userData: user }),
  setSignedUpUser: (user) => set({ allSignedUpUser: user }),
  setConnection: (user) => set({ connections: user }),
  setPendingRequest:(data)=> set({requestPending:data}),
  setFriendInTheList:(data)=>{set({friends:data})}
});
