
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_CLASSIFIEDS':
        return action.payload;
      case 'FETCH_CLASSIFIED':
          return action.payload;

     
      default:
        return state;
    }
  };