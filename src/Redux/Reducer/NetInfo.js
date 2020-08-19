/* eslint-disable prettier/prettier */
//actions
export const UPDATE_CONNECTION_STATUS = 'UPDATE_CONNECTION_STATUS';

//action creators
export function update_connection_status(isConnected) {
    return {
        type: UPDATE_CONNECTION_STATUS,
        isConnected:isConnected
    };
}

const initialState = {
    isConnected: true,
  };
export default NetInfo = (state = initialState, action) => {
    const { type,isConnected} = action;
  
    switch (type) {
      case UPDATE_CONNECTION_STATUS:
        return Object.assign({}, state, {
          isConnected: isConnected,
        });
      default:
        return state;
    }
}