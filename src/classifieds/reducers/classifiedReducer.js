
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
    switch (action.type) {

      case 'FETCH_CLASSIFIED':
          return action.payload;

     
      default:
        return state;
    }
  };