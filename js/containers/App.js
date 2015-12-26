import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import configureStore from '../store/configureStore';
import ReduxCatalystDataGrid from '../components/ReduxCatalystDataGrid';
import {Map, List, Set, fromJS} from 'immutable';
require('react-datagrid/index.css');

const store = configureStore();

class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleNameClick = this.handleNameClick.bind(this);
  }

  handleNameClick(val) {
    console.log('link clicked: ' + val);
  }

  render() {
    const columns = [
         {name: 'rowId', title: '#'},
         {name: 'name', title: 'Name', render: (v, data, cellProps) => <a href="#" onClick={() => this.handleNameClick(data.name) }>{v}</a>},
         {name: 'someValue', title: 'Some Value'},
         {name: 'createdBy', title: 'Created By'}
      ];

    const jsData = [{rowId: 1, name: 'Joe Smith', someValue: 'A Value', createdBy: 'testuser'},
                     {rowId: 2, name: 'Mary Smith', someValue: 'Other Value', createdBy: 'testuser'},
                     {rowId: 3, name: 'Susie Q', someValue: 'Third Value', createdBy: 'superuser'}];

    // TODO: this should be root path to individual grid:
    const pathInReduxStore = ['gridConfig'];
    const {dispatch, gridConfig} = this.props;

    return (
          <div>
            <h1>Testing out the Redux Catalyst Data Grid</h1>
            <ReduxCatalystDataGrid
               idProperty="rowId"
               dataSource={fromJS(jsData)}
               columns={columns}
               selectionType={'multiple'}
               gridConfig={gridConfig}
               configPath={pathInReduxStore}
               dispatch={dispatch}
            />
          </div>
    );
  }
}

function mapPropsToState(state) {
   return {
      gridConfig: state.GridReducer.toObject().gridConfig
   };
}

export default connect(mapPropsToState)(App);

