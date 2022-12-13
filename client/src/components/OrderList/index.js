import './style.css';
import {Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBooks} from "../../redux/bookReducer";

export default function OrderList() {


    useEffect(() => {


    }, [])


    const data = [
        {key: '1', ORDER_ID: 1, TOTAL_PRICE: 100, CUSTOMER_ID: 1, CUSTOMER_NAME: 'NHAN VO 1'},
        {key: '2', ORDER_ID: 2, TOTAL_PRICE: 1200, CUSTOMER_ID: 2, CUSTOMER_NAME: 'NHAN VO 2'},
    ]

    const columns = [
        {title: 'ID', dataIndex: 'ORDER_ID'},
        {title: 'TOTAL_PRICE', dataIndex: 'TOTAL_PRICE'},
        {title: 'CUSTOMER_ID', dataIndex: 'CUSTOMER_ID'},
        {title: 'CUSTOMER_NAME', dataIndex: 'CUSTOMER_NAME'},
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='order-list'>

            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />

        </div>
    );
}