export const remove = (array, element) => array.filter(arrayElement => arrayElement !== element);

export const inputHandleKeyUp = ({ event, submit }) => {
  if (event.keyCode === 13) {
    submit();
  }
};

export default {
  inputHandleKeyUp,
};
