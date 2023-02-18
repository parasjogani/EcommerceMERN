import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineSetting, AiOutlineUser, AiOutlineUnorderedList, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { RiCoupon3Line } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo mb-2">
          <h2 className="text-white fs-5 text-center py-3">
            <span className="sm-logo">PC</span>
            <span className="lg-logo">Paras</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product List',
                },
                {
                  key: 'category',
                  icon: <BiCategory className="fs-4" />,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className="fs-4" />,
                  label: 'Category List',
                }
              ]
            },
            {
              key: 'orders',
              icon: <AiOutlineUnorderedList className="fs-4" />,
              label: 'Orders',
            },
            {
              key: 'coupons',
              icon: <RiCoupon3Line className="fs-4" />,
              label: 'Coupons',
              children: [
                {
                  key: 'add-coupon',
                  icon: <RiCoupon3Line className="fs-4" />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCoupon3Line className="fs-4" />,
                  label: 'Coupon List',
                }
              ]
            },
            {
              key: 'settings',
              icon: <AiOutlineSetting className="fs-4" />,
              label: 'Setting',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className="d-flex align-items-center gap-3">
            <div></div>
            <div className="d-flex align-items-center gap-3">
              <div>
                <FaUserAlt />
              </div>
              <div>
                <h5 className="mb-0">Paras Jogani</h5>
                <p className="mb-0">paras12345@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;