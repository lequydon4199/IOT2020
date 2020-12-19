import { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import LineChart from '../components/LineChart'
import TableStatistic from '../components/Table'

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends Component {
  state = {
    collapsed: false,
    menuSelected: "1"
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  changeMenu = e => {
    this.setState({ menuSelected: e.key });
  }

  render() {
    const { collapsed } = this.state;
    return (
      // <Layout style={{ minHeight: '100vh' }}>
      //   <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
      //     <div className="logo" />
      //     <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={this.changeMenu}>
      //       <Menu.Item key="1" icon={<PieChartOutlined />}>
      //         Realtime
      //       </Menu.Item>
      //       <Menu.Item key="2" icon={<DesktopOutlined />}>
      //         Thống kê
      //       </Menu.Item>
      //     </Menu>
      //   </Sider>
      //   <Layout className="site-layout">
      //     <Content style={{ margin: '0 16px' }}>
      //       <Breadcrumb style={{ margin: '16px 0' }}>
      //         <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      //         <Breadcrumb.Item>{this.state.menuSelected === "1" ? "Realtime" : "Thống kê"}</Breadcrumb.Item>
      //       </Breadcrumb>

      //       <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      //         {this.state.menuSelected === "1" ? <LineChart /> : <TableStatistic />}
      //       </div>
      //     </Content>
      //     <Footer style={{ textAlign: 'center' }}>Các vấn đề hiện đại của CNTT</Footer>
      //   </Layout>
      // </Layout>
      <LineChart />
    );
  }
}

export default SiderDemo