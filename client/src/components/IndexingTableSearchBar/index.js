import {Input, Space} from 'antd';
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {setBooks} from "../../redux/bookReducer";

export default function IndexingTableSearchBar() {

    const {Search} = Input;
    const dispatch = useDispatch();

    const getBooksWithConditions = async (val) => {
        let books = [];
        let config = {
            params: {
                text: val,
            }
        }

        await axios.get(BASE_URL_SERVER + '/book/mysql/description', config)
            .then(res => {
                console.log("res: ", res.data.data)
                books = res.data.data;
                dispatch(setBooks(books));
            })
            .catch(err => {
                console.log("Error when get books mysql with conditions: ", err);
            });

        return books;
    }

    const onSearch = (value) => {
        console.log("value search: ", value);
        let newBooksList = getBooksWithConditions(value);
    }


    return (
        <div className='indexing-table-search-bar'>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    );
}