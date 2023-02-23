import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice'
import PageAuth from '../components/PageAuth';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];


const Customers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const customerstate = useSelector((state) => state.customer.customers)
    const data1 = [];
    for (let i = 0; i < customerstate.length; i++) {
        if (customerstate[i].role !== "ADMIN") {
            data1.push({
                key: i + 1,
                name: `${customerstate[i].name}`,
                email: `${customerstate[i].email}`,
                address: `${customerstate[i].address}`,
            });
        }
    }
    return (
        <div>
            <h2>Customers</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

        </div>
    )
}

export default PageAuth(Customers)