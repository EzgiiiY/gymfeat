import { Calendar, Alert,Badge } from 'antd';
import moment from 'moment';
import React from 'react';
import 'antd/dist/antd.css';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', label: 'This is warning event.', 
        content:[
        
      ] },
        { type: 'success', label: 'This is usual event.', 
        content:[
        
      ] },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', label: 'This is warning event.', 
        content:[
        
      ] },
        { type: 'success', label: 'This is usual event.', 
        content:[
        
      ] },
        { type: 'error', label: 'This is error event.', 
        content:[
        
      ] },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', label: 'Today\'s Exercise', 
            content:["windmill skater 30 secs",
            "REST 5 secs"
            
          ]},
      ];
      break;
    default:
  }
  return listData || [];
}

class CalendarComponent extends React.Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
    currentContent: "",
    dateValues:[]
  };
  
  dateCellRender = value => {
    const listData = getListData(value)
    const dateValues = new Array();
    console.log(value.format("DD.MM.YYYY"))
    listData.map(item => (
      dateValues.push(
      <li key={value.format("DD.MM.YYYY")}>
       <Badge status={item.type} text={item.label} />
      </li>
      )
    ));
    return (
      <ul className="events">
        {dateValues}
      </ul>
    );
  }
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
    this.props.onClick(this.state.currentContent?this.state.currentContent:"");
    this.props.getDate(value.format('DD.MM.YYYY'));
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Calendar dateCellRender={this.dateCellRender} style={{height:"100%"}} fullscreen={false} value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}


export default(CalendarComponent);