import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import {userSlice} from './user.slice';
import {postSlice} from './post.slice';


const useStore = create(
  persist( //to persist the state in local storage
    (...a) => ({
    ...userSlice(...a),
    ...postSlice(...a),
    }),
    { name: 'app-storage' } // Unique name for the local storage item
  )
);

export default useStore;






