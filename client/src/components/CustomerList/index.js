import './style.css';
import {Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBooks} from "../../redux/bookReducer";

export default function CustomerList() {

    useEffect(() => {


    }, [])

    const data = [
        {key: 1, CUSTOMER_ID: 1, CUSTOMER_NAME: 'NHAN VO 1', BIRTHDAY: '03/10/2001', PHONE_NUMBER: '0910056871'},
        {key: 1, CUSTOMER_ID: 2, CUSTOMER_NAME: 'NHAN VO 2', BIRTHDAY: '03/10/2001', PHONE_NUMBER: '0910056872'},
        {key: 1, CUSTOMER_ID: 3, CUSTOMER_NAME: 'NHAN VO 3', BIRTHDAY: '03/10/2001', PHONE_NUMBER: '0910056873'}
    ]

    const columns = [
        {title: 'ID', dataIndex: 'CUSTOMER_ID'},
        {title: 'NAME', dataIndex: 'CUSTOMER_NAME'},
        {title: 'BIRTHDAY', dataIndex: 'BIRTHDAY'},
        {title: 'PHONE NUMBER', dataIndex: 'PHONE_NUMBER'},
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='customer-list'>

            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />

        </div>
    );
}