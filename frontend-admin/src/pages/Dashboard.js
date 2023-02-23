import React from 'react'
import { Table } from 'antd';
import PageAuth from '../components/PageAuth';

//Recent Order Table Start
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: "Ordered",
    address: `London, Park Lane no. ${i}`,
  });
}
//Recent Order Table Ends


const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">$2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>43%</h6>
            <p className="mb-0">Comapared to April 2022</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">$2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>43%</h6>
            <p className="mb-0">Comapared to April 2022</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
          <div>
            <p className="mb-0">Total</p> <h4 className="mb-0">$2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>43%</h6>
            <p className="mb-0">Comapared to April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  )
}

export default PageAuth(Dashboard)