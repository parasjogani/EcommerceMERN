import React from 'react'
import { Table } from 'antd';
import PageAuth from '../components/PageAuth';


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

const Orders = () => {
  return (
      <div>
        <div>Orders</div>
        <div>
          <Table columns={columns} dataSource={data1} />

        </div>

    </div>
  )
}

export default PageAuth(Orders)