import * as AT from '../constants/ActionTypes';
import {Map, List, Set, fromJS} from 'immutable';

const initialState = Map({
   gridConfig: Map({
      sortInfo: List(),
      columnOrder: List(),
      columnShown: Map(),
      columnWidths: Map(),
      selectedRows: Set()
   })
});

export default function(state = initialState, action) {
  switch (action.type) {

    case AT.SORT_CHANGE:
      return state.setIn([...action.payload.gridPath, 'sortInfo'], fromJS(action.payload.sortInfo));

    case AT.COLUMN_RESIZE_CHANGE:
      const newState = state.setIn([...action.payload.gridPath, 'columnWidths', action.payload.firstCol.name], action.payload.firstSize);
      return (typeof action.payload.secondCol !== 'undefined') ?
         newState.setIn([...action.payload.gridPath, 'columnWidths', action.payload.secondCol.name],
            action.payload.secondSize) :
         newState;

    case AT.COLUMN_VISIBILITY_CHANGE:
      return state.updateIn([...action.payload.gridPath, 'columnShown'],
         map => map.set(action.payload.column.name, action.payload.visible));

    case AT.COLUMN_ORDER_CHANGE:
      return state.updateIn([...action.payload.gridPath, 'columnOrder'],
         list => list.push(Map().set(action.payload.index, action.payload.dropIndex)));

    case AT.SELECT_ROWS:
      return state.updateIn([...action.payload.gridPath, 'selectedRows'], sett => sett.union(action.payload.rowIds));

    case AT.DESELECT_ROWS:
      return state.updateIn([...action.payload.gridPath, 'selectedRows'], sett => sett.subtract(action.payload.rowIds))

    case AT.SCROLL_CHANGE:
      state.setIn([...action.payload.gridPath, 'scrollTopPos'], action.payload.scrollPos);

    case AT.SELECT_ROW: 
      state.updateIn([...action.payload.gridPath, 'selectedRows'], sett => sett.add(action.payload.rowId))

    case AT.DESELECT_ROW: 
      state.updateIn([...action.payload.gridPath, 'selectedRows'], sett => sett.remove(action.payload.rowId))

    default:
      return state;
  }
}
