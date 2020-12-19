import { Table, Checkbox } from 'antd';
import Axios from 'axios';
import React from 'react'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: "center"
  },
  {
    title: 'Nhiệt độ môi trường',
    dataIndex: 'temperature_ab',
    align: "center"
  },
  {
    title: 'Nhiệt độ vật',
    dataIndex: 'temperature_ob',
    align: "center"
  },
  {
    title: 'Thời gian',
    dataIndex: 'created_at',
    align: "center"
  },
];

class TableStatistic extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    realtime: true
  };

  changeRealtimeMode = (e) => {
    if (this.state.realtime) {
      clearInterval(this.loop)
    } else {
      this.loop = setInterval(async () => {
        const res = await Axios.get('http://127.0.0.1:5000/logs');
        this.setState({
          data: res.data.rows
        })
      }, 1000);
    }
    this.setState({ realtime: e.target.checked })
  }

  componentWillUnmount = () => {
    clearInterval(this.loop)
  }

  componentDidMount = async () => {
    try {
      this.loop = setInterval(async () => {
        const res = await Axios.get('http://127.0.0.1:5000/logs');
        this.setState({
          data: res.data.rows
        })
      }, 1000);
    } catch (error) {
      console.log(error);
      throw error
    }
  };

  render() {
    const { data, realtime } = this.state;
    console.log(realtime)
    return (
      <>
        <Checkbox checked={this.state.realtime} onChange={(e) => this.changeRealtimeMode(e)}>Realtime</Checkbox>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          // pagination={pagination}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}
export default TableStatistic;