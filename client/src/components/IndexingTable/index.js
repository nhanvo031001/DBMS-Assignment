import './style.css';
import {Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";

export default function IndexingTable() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL_SERVER + '/book/')
            .then(res => {
                // console.log("res: ", res.data.data);
                let books = res.data.data;
                setData(books);
            })
            .catch(err => {
                console.log("Error when get all books: ", err);
            })
    }, [])

    const columns = [
        {title: 'ID', dataIndex: 'BOOK_ID'},
        {title: 'TITLE', dataIndex: 'BOOK_NAME'},
        {title: 'DESCRIPTION', dataIndex: 'DESCRIPTION'},
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='indexing-table'>

            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />

        </div>
    );
}