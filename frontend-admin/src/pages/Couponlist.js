import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getCoupon } from '../features/coupon/couponSlice';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Coupon Code',
        dataIndex: 'code',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
    },
    {
        title: 'Active',
        dataIndex: 'active',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Coupon = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCoupon())
    }, [dispatch])

    const couponstate = useSelector((state) => state.coupon.coupon)
    console.log(couponstate);
    const data1 = [];
    for (let i = 0; i < couponstate.length; i++) {
        data1.push({
            key: i + 1,
            code: `${couponstate[i].code}`,
            discount: `${couponstate[i].discount}%`,
            active: `${couponstate[i].active}`,
            action: (
                <>
                    <Link className="fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-3 text-danger">
                        <AiFillDelete />
                    </Link>
                </>
            )
        });
    }
    return (
        <div>
            <h2>Coupon List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

        </div>
    )
}

export default Coupon