// import Axios from 'axios';
// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import moment from 'moment'

// class LineChart extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: []
//     }
//   }

//   componentDidMount = async () => {
//     try {
//       this.loop = setInterval(async () => {
//         const res = await Axios.get('http://127.0.0.1:5000/logs/?limit=15');
//         this.setState({
//           data: res.data.rows
//         })
//       }, 1000);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   componentWillUnmount = () => {
//     clearInterval(this.loop)
//   }

//   render() {
//     const data_temp = this.state.data
//     const list_time = data_temp?.map(i => moment(i.created_at).format("HH:mm:ss.SS"));
//     const list_ob = data_temp?.map(i => i.temperature_ob);
//     const list_ab = data_temp?.map(i => i.temperature_ab);

//     const data = {
//       labels: list_time,
//       datasets: [
//         {
//           label: 'Môi trường',
//           data: list_ab,
//           fill: false,
//           backgroundColor: 'rgb(255, 99, 132)',
//           borderColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//           label: 'Vật thể',
//           data: list_ob,
//           fill: false,
//           backgroundColor: 'rgb(3, 78, 252)',
//           borderColor: 'rgba(3, 78, 252, 0.5)',
//         },
//       ],
//     }

//     const options = {
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: false,
//             },
//           },
//         ],
//       },
//     }

//     return <>
//       <div className='header'>
//         <h1 className='title'>Line Chart</h1>
//         <div className='links'>
//           <a
//             className='btn btn-gh'
//             href='https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Line.js'
//           >
//           </a>
//         </div>
//       </div>
//       <Line data={data} options={options} />
//     </>
//   }
// }

// export default LineChart

import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Axios from 'axios';

export default class LineChart1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {
    try {
      this.loop = setInterval(async () => {
        const res = await Axios.get('http://127.0.0.1:5000/logs/?limit=15');
        this.setState({
          data: res.data.rows
        })
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.loop)
  }

  render() {
    const data = this.state.data.map(item => {
      return {
        name: item.created_at.slice(14, 19),
        temperature_ab: item.temperature_ab,
        temperature_ob: item.temperature_ob
      }
    })
    console.log(data.length)
    return (
      <>
        <LineChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature_ab" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="temperature_ob" stroke="#82ca9d" />
        </LineChart>
        {
          data.length > 0 && <div style={{ textAlign: "center", marginTop: 12 }}>
            <h3 style={{ display: "inline" }}>Nhiệt độ môi trường :</h3>{data[data.length - 1]["temperature_ab"]}
            <h3 style={{ display: "inline", marginLeft: 16 }}>Nhiệt độ vật :</h3>{data[data.length - 1]["temperature_ob"]}
          </div>
        }
      </>
    );
  }
}
