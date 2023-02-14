import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice'
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Collection',
        dataIndex: 'collection',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Customers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const productstate = useSelector((state) => state.product.products)
    console.log(productstate);
    const data1 = [];
    for (let i = 0; i < productstate.length; i++) {
        data1.push({
            key: i + 1,
            name: `${productstate[i].name}`,
            price: `$${productstate[i].price}`,
            description: `${productstate[i].description}`,
            collection: `${productstate[i].collectionId}`,
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
            <h2>Products List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

        </div>
    )
}

export default Customers