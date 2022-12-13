import './style.css';
import {Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBooks} from "../../redux/bookReducer";
import {setCustomers} from "../../redux/customerReducer";
import {setOrders} from "../../redux/ordersReducer";

export default function OrderList() {


    const [firstRender, setFirstRender] = useState(true);
    const [data, setData] = useState([]);
    const {orders} = useSelector(state => state.order);
    const dispatch = useDispatch();

    const getOrders = async () => {
        let orders = [];
        await axios.get(BASE_URL_SERVER + '/book/orders')
            .then(res => {
                orders = res.data.data;
                dispatch(setOrders(orders));
            })
            .catch(err => {
                console.log("Error when get all customers: ", err);
            });

        return orders;
    }

    useEffect(() => {

        if (firstRender) {
            let ordersList =     getOrders();
            setData(orders);
            setFirstRender(false);
        } else {
            setData(orders);
        }

    }, [orders])


    // const data = [
    //     {key: '1', ORDER_ID: 1, TOTAL_PRICE: 100, CUSTOMER_ID: 1, CUSTOMER_NAME: 'NHAN VO 1'},
    //     {key: '2', ORDER_ID: 2, TOTAL_PRICE: 1200, CUSTOMER_ID: 2, CUSTOMER_NAME: 'NHAN VO 2'},
    // ]

    const columns = [
        {title: 'ID', dataIndex: 'ORDERS_ID'},
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