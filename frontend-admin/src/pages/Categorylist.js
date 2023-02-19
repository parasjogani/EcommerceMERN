import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, resetState } from '../features/category/categorySlice'
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';


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
        title: 'Action',
        dataIndex: 'action',
    },
];


const Category = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetState())
        dispatch(getCategory())
    }, [dispatch])

    const categorystate = useSelector((state) => state.category.category)
    const data1 = [];
    for (let i = 0; i < categorystate.length; i++) {
        data1.push({
            key: i + 1,
            name: `${categorystate[i].name}`,
            action: (
                <>
                    <Link to={`/admin/category/${categorystate[i]._id}`} className="fs-3 text-success">
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
            <h2>Category List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

        </div>
    )
}

export default Category