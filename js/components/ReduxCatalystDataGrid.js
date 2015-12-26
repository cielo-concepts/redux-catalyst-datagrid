import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import {List, Map} from 'immutable';
import {sortByInfo} from '../utils/gridUtils';

import {selectRows, deselectRows, selectRow, deselectRow, scrollTopChange, sortChange, columnOrderChange, columnVisibilityChange, columnResizeChange} from '../actions/GridActions';

export default class extends Component {

   static propTypes = {
      idProperty: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired,
      configPath: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      dataSource: PropTypes.object.isRequired,
      gridConfig: PropTypes.instanceOf(Map).isRequired,
      selectionType: PropTypes.oneOf(['single', 'multiple', 'multiple-using-checkboxes', 'none'])
   };

   constructor(props) {
      super(props);
      this.handleSortChange = this.handleSortChange.bind(this);
      this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
      this.handleColumnVisibilityChange = this.handleColumnVisibilityChange.bind(this);
      this.handleColumnResizeChange = this.handleColumnResizeChange.bind(this);
      this.handleScrollTopChange = this.handleScrollTopChange.bind(this);
      this.handleSelectionChange = this.handleSelectionChange.bind(this);
      this.configureColumns = this.configureColumns.bind(this);
      this.selectOrDeselectAll = this.selectOrDeselectAll.bind(this);
   }

   handleColumnResizeChange(firstCol, firstSize, secondCol, secondSize) {
      this.props.dispatch(columnResizeChange(this.props.configPath, firstCol, firstSize, secondCol, secondSize));
   }

   handleSortChange(sortInfo) {
      this.props.dispatch(sortChange(this.props.configPath, sortInfo));
   }

   handleScrollTopChange(pos) {
      this.props.dispatch(scrollTopChange(this.props.configPath, pos));
   }

   handleColumnOrderChange(index, dropIndex) {
      this.props.dispatch(columnOrderChange(this.props.configPath, index, dropIndex));
   }

   handleColumnVisibilityChange(column, visibility) {
      this.props.dispatch(columnVisibilityChange(this.props.configPath, column, visibility));
   }

   configureColumns(gridConfig, columns) {
      const colWidths = gridConfig.get('columnWidths');
      const colShown = gridConfig.get('columnShown');
      const colOrder = gridConfig.get('columnOrder');

      for (const col of columns) {
         const width = colWidths.get(col.name);
         if (typeof width !== 'undefined') {
            col.width = width;
         }
         const visible = colShown.get(col.name);
         if (typeof visible !== 'undefined') {
            col.hidden = visible ? true : null;
         }
      }

      for (const map of colOrder) {
         for (const entry of map.entries()) {
            const fromIdx = entry [0];
            const toIdx = entry [1];
            const from = columns [fromIdx];
            columns [fromIdx] = columns[toIdx];
            columns [toIdx] = from;
         }
      }

      return columns;
   }
   
   handleSelectionChange(newSelection) {
      const {selectionType, idProperty} = this.props;
      let selected = [];
      Object.keys(newSelection).forEach(function(id) {
         selected.push(newSelection[id][idProperty]);
      });

      if (selectionType === 'single') {
         if (rowIds !== null && rowIds.length > 0) {
            this.props.dispatch(selectRow(this.props.configPath, selected[0]));
         }
      }
      else if (selectionType === 'multiple') {
         this.props.dispatch(selectRows(this.props.configPath, selected));
      }
   }

   selectOrDeselectAll() {
      const valueToUse = document.getElementById('select-all-check').checked;

      const rows = document.getElementsByName('row-check');
      let i;
      const rowIds = [];
      for (i = 0; i < rows.length; i++) {
         rowIds.push(rows[i].getAttribute('data-row-id'));
      }

      if (valueToUse) {
         this.props.dispatch(selectRows(configPath, rowIds));
      } else {
         this.props.dispatch(deselectRows(configPath, rowIds));
      }
   }

   render() {
      const {gridConfig, idProperty, dataSource, selectionType} = this.props;
      const configuredColumns = this.configureColumns(gridConfig, this.props.columns);
      const sortInfo = gridConfig.get('sortInfo');

      let selected;

      if (selectionType === 'single') {
         selected = gridConfig.get('selectedRows').toJS();
      }
      else if (selectionType === 'multiple' || selectionType === 'multiple-with-checkboxes') {
         selected = gridConfig.get('selectedRows').toJS();
      }

      return (
         <DataGrid
            idProperty={idProperty}
            dataSource={sortByInfo(dataSource, sortInfo).toJS()}
            columns={configuredColumns}
            sortInfo={sortInfo.toJS()}
            onScrollTop={this.handleScrollTopChange}
            scrollTop={gridConfig.get('scrollTopPos')}
            onSortChange={this.handleSortChange}
            onSelectionChange={this.handleSelectionChange}
            selected={selected}
            onColumnOrderChange={this.handleColumnOrderChange}
            onColumnVisibilityChange={this.handleColumnVisibilityChange}
            onColumnResize={this.handleColumnResizeChange}
         />
      );
   }
}

