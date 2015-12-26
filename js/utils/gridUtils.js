const compare = (a, b) => {
   switch (true) {
      case a > b: return 1;
      case a < b: return -1;
      default: return 0;
   }
};

export const sortByInfo = (data, sortInfo) =>
   sortInfo.reverse().reduce((rn, sort) => rn.sortBy(item => item.get(sort.get('name')), (a, b) => sort.get('dir') * compare(a, b)), data);

