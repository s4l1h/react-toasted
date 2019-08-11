export const generateList = positions => {
  const list = {};
  for (let i = 0; i <= positions.length - 1; i += 1) {
    list[positions[i]] = [];
  }
  return list;
};
// Thanks Dan
// hhttps://twitter.com/dan_abramov/status/824308413559668744
export const addToast = newData => {
  return state => {
    const { list, savedNames } = state;
    if (typeof newData.name !== "undefined") {
      savedNames[newData.name] = newData.index;
    }

    list[newData.position] = newData.newestOnTop
      ? [newData, ...list[newData.position]]
      : [...list[newData.position], newData];

    return { list, savedNames };
  };
};
export const removeToast = item => {
  return state => {
    const list = { ...state.list };
    const savedNames = { ...state.savedNames };
    list[item.position] = list[item.position].filter(toast => {
      return toast.index !== item.index;
    });

    const indexList = Object.values(savedNames);
    const nameList = Object.keys(savedNames);
    if (indexList.includes(item.index)) {
      for (let i = 0; i <= nameList.length - 1; i += 1) {
        const name = nameList[i];
        if (savedNames[name] === item.index) {
          delete savedNames[name];
        }
      }
    }
    // delete list[item.position][item.index];
    return { list, savedNames };
  };
};
export const findToastByIndex = (list, index) => {
  let item = [];
  const positions = Object.keys(list);
  for (let i = 0; i <= positions.length - 1; i += 1) {
    const position = positions[i];
    item = list[position].filter(toast => toast.index === index);
    if (item.length !== 0) {
      break;
    }
  }
  return item;
};
