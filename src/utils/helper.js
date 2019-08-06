export const generateList = positions => {
  let list = {};
  for (var i = 0; i <= positions.length - 1; i++) {
    list[positions[i]] = [];
  }
  return list;
};
// Thanks Dan
// hhttps://twitter.com/dan_abramov/status/824308413559668744
export const addToast = newData => {
  return state => {
    let { list, savedNames } = state;
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
    let list = { ...state.list };
    let savedNames = { ...state.savedNames };
    list[item.position] = list[item.position].filter(toast => {
      return toast.index !== item.index;
    });

    let indexList = Object.values(savedNames);
    let nameList = Object.keys(savedNames);
    if (indexList.includes(item.index)) {
      for (let i = 0; i <= nameList.length - 1; i++) {
        let name = nameList[i];
        if (savedNames[name] === item.index) {
          delete savedNames[name];
        }
      }
    }
    //delete list[item.position][item.index];
    return { list, savedNames };
  };
};
export const findToastByIndex = (list, index) => {
  let item = [];
  let positions = Object.keys(list);
  for (let i = 0; i <= positions.length - 1; i++) {
    let position = positions[i];
    item = list[position].filter(toast => toast.index === index);
    if (item.length !== 0) {
      break;
    }
  }
  return item;
};
