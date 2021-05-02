import { Calendar, Alert,Badge } from 'antd';
import moment from 'moment';
import React from 'react';
import './calendar.css';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', label: 'Individual Workout', 
        content:[
        
      ] },
      ];
      break;
    case 10:
      listData = [
        { type: 'success', label: 'Scheduled and Completed Workout', 
        content:[
        
      ] },
      { type: 'error', label: 'Missed Workout Session',  
        content:[
        
      ] },
      ];
      break;
      case 12:
        listData = [
          { type: 'error', label: 'Missed Workout Session', 
          content:[
          
        ] },
        ];
      break;
    case 15:
      listData = [
        { type: 'success', label: 'Today\'s Exercise', 
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
  constructor(props){
    super(props);
    this.state = {
      currentContent: "",
      dateValues:[]
    };
  }
  
  
  dateCellRender = value => {
    const listData = getListData(value)
    const dateValues = new Array();
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
        <Calendar dateCellRender={this.dateCellRender}  
        value={value} 
        onSelect={this.onSelect} 
        onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}



export default(CalendarComponent);