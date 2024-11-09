import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import notificationsSlice from './notifications/notificationsSlice';
import schedulesSlice from './schedules/schedulesSlice';
import syllabusesSlice from './syllabuses/syllabusesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import schoolsSlice from './schools/schoolsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    notifications: notificationsSlice,
    schedules: schedulesSlice,
    syllabuses: syllabusesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    schools: schoolsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
