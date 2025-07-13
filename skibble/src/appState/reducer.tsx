import type { StateType, ActionType } from './types';

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'chat:update:add':
      return {...state,chats:{...state.chats,[action.payload.id]:action.payload}};
    default:
      return state;
  }
};
