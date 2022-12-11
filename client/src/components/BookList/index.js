import './style.css';
import {Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBooks} from "../../redux/bookReducer";

export default function BookList() {

    const [firstRender, setFirstRender] = useState(true);
    const [data, setData] = useState([]);
    const {books} = useSelector(state => state.book);
    const dispatch = useDispatch();

    const getBooks = async () => {
        let books = [];
        await axios.get(BASE_URL_SERVER + '/book/')
            .then(res => {
                books = res.data.data;
                dispatch(setBooks(books));
            })
            .catch(err => {
                console.log("Error when get all books: ", err);
            });

        return books;
    }

    useEffect(() => {

        if (firstRender) {
            let booksList = getBooks();
            setData(books);
            setFirstRender(false);
        } else {
            setData(books);
        }

    }, [books])

    const columns = [
        {title: 'ID', dataIndex: 'BOOK_ID'},
        {title: 'TITLE', dataIndex: 'BOOK_NAME'},
        {title: 'AUTHOR', dataIndex: 'AUTHOR'},
        {title: 'DESCRIPTION', dataIndex: 'DESCRIPTION'},
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='book-list'>

            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />

        </div>
    );
}