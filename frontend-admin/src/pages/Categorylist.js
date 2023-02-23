import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, resetState, deleteCategories } from '../features/category/categorySlice'
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
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
        title: 'Action',
        dataIndex: 'action',
    },
];


const Category = () => {
    const [open, setOpen] = useState(false);
    const [categoryId, setcategoryId] = useState("")

    const showModal = (e) => {
        setOpen(true);
        setcategoryId(e)
    };
    const hideModal = () => {
        setOpen(false);
    }

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
                    <button className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(categorystate[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    }

    const deleteCategory = (e) => {
        dispatch(deleteCategories(e))
        setTimeout(() => {
            dispatch(getCategory())
        }, 500)
        setOpen(false)
    }
    return (
        <div>
            <h2>Category List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>

            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(categoryId)
                }}
                title="Are you sure you want to delete?" />

        </div>
    )
}


export default PageAuth(Category)