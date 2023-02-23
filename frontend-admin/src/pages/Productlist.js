import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../features/product/productSlice'
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
import { getCategory } from '../features/category/categorySlice';
import PageAuth from '../components/PageAuth';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        render: (photoUrl, record) => {
            return <img src={photoUrl} alt={record.name} style={{ height: "80px", width: "80px" }} />;
        },
    },
    {
        title: 'Name',
        dataIndex: 'name',
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


const Productlist = () => {
    const [open, setOpen] = useState(false);
    const [productId, setproductId] = useState("")

    const showModal = (e) => {
        setOpen(true);
        setproductId(e)
    };
    const hideModal = () => {
        setOpen(false);
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCategory())
    }, [dispatch])

    const productstate = useSelector((state) => state.product.products)
    const categorystate = useSelector((state) => state.category.category)
    console.log(productstate);
    const data1 = [];
    for (let i = 0; i < productstate.length; i++) {
        const currentCollectionId = productstate[i].collectionId;
        const currentCollection = categorystate.find((category) => category._id === currentCollectionId);

        data1.push({
            key: i + 1,
            image: `${productstate[i].photos[0].secure_url}`,
            name: `${productstate[i].name}`,
            price: `$${productstate[i].price}`,
            description: `${productstate[i].description}`,
            collection: currentCollection ? currentCollection.name : "",
            action: (
                <>
                    <Link to={`/admin/product/${productstate[i]._id}`} className="fs-3 text-success">
                        <BiEdit />
                    </Link>
                    <button className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(productstate[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    }

    const deleteCategory = (e) => {
        dispatch(deleteProducts(e))
        setTimeout(() => {
            dispatch(getProducts())
        }, 500)
        setOpen(false)
    }
    return (
        <div>
            <h2>Products List</h2>
            <div>
                <Table columns={columns} dataSource={data1} />

            </div>

            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(productId)
                }}
                title="Are you sure you want to delete this product?" />


        </div>
    )
}

export default PageAuth(Productlist)