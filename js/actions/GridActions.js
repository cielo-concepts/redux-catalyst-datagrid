import * as AT from '../constants/ActionTypes';
import { createAction } from 'redux-actions';

export function sortChange(gridPath, sortInfo) {
   return createAction(AT.SORT_CHANGE)({sortInfo: sortInfo, gridPath: gridPath});
}

export function deselectRow(gridPath, rowId) {
   return createAction(AT.DESELECT_ROW)({gridPath: gridPath, rowId: rowId});
}

export function scrollTopChange(gridPath, scrollPos) {
   return createAction(AT.SCROLL_CHANGE)({gridPath, scrollPos});
}

export function selectRow(gridPath, rowId) {
   return createAction(AT.SELECT_ROW)({gridPath: gridPath, rowId: rowId});
}

export function deselectRows(gridPath, rowIds) {
   return createAction(AT.DESELECT_ROWS)({gridPath, rowIds});
}

export function selectRows(gridPath, rowIds) {
   return createAction(AT.SELECT_ROWS)({gridPath, rowIds});
}

export function columnOrderChange(gridPath, index, dropIndex) {
   return createAction(AT.COLUMN_ORDER_CHANGE)({gridPath, index, dropIndex});
}

export function columnResizeChange(gridPath, firstCol, firstSize, secondCol, secondSize) {
   return createAction(AT.COLUMN_RESIZE_CHANGE)({gridPath, firstCol, firstSize, secondCol, secondSize});
}

export function columnVisibilityChange(gridPath, column, visible) {
   return createAction(AT.COLUMN_VISIBILITY_CHANGE)({gridPath, column, visible});
}

