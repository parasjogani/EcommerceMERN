import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAllCoupon, deleteCoupons, toggledCoupon } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import PageAuth from '../components/PageAuth';


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
    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("")

    const showModal = (e) => {
        setOpen(true);
        setcouponId(e)
    };
    const hideModal = () => {
        setOpen(false);
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCoupon())
    }, [dispatch])

    const couponstate = useSelector((state) => state.coupon.coupon)
    const data1 = [];
    for (let i = 0; i < couponstate.length; i++) {
        data1.push({
            key: i + 1,
            code: `${couponstate[i].code}`,
            discount: `${couponstate[i].discount}%`,
            active: `${couponstate[i].active}`,
            action: (
                <>
                    {couponstate[i].active ?
                        <button className="fs-3 text-primary bg-transparent border-0"
                            onClick={() => deactivateCoupon(couponstate[i]._id)}>
                            <AiFillEye />
                        </button>
                        :
                        <button className="fs-3 text-primary bg-transparent border-0"
                            onClick={() => deactivateCoupon(couponstate[i]._id)}>
                            <AiFillEyeInvisible />
                        </button>
                    }
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(couponstate[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    }

    const deleteCoupon = (e) => {
        dispatch(deleteCoupons(e))
        setTimeout(() => {
            dispatch(getAllCoupon())
        }, 500)
        setOpen(false)
    }

    const deactivateCoupon = (e) => {
        dispatch(toggledCoupon(e))
        setTimeout(() => {
            dispatch(getAllCoupon())
        }, 200)
    }
    return (
        <div>
            <h2>Coupon List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCoupon(couponId)
                }}
                title="Are you sure you want to delete?" />

        </div>
    )
}

export default PageAuth(Coupon)