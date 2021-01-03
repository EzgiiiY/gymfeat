import { Calendar, Alert } from 'antd';
import moment from 'moment';
import React from 'react';
import 'antd/dist/antd.css';


class CalendarComponent extends React.Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  };

  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
    this.props.onClick();
    this.props.getDate(value.format('DD.MM.YYYY'));
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar style={{height:"100%"}} fullscreen={false} value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}


export default(CalendarComponent);