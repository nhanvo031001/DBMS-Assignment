import {Input, Space, Select} from 'antd';
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {setBooks} from "../../redux/bookReducer";
import {useState} from "react";

export default function IndexingTableSearchBar() {

    const {Search} = Input;
    const dispatch = useDispatch();
    const [dbms, setDbms] = useState('mysql');
    const [timeSearch, setTimeSearch] = useState('');

    const optionsSelect = [
        {
            value: 'mysql',
            label: 'MySQL',
        },
        {
            value: 'neo4j',
            label: 'Neo4j',
        }
    ]

    const getBooksWithConditionsMysql = async (val) => {
        let books = [];
        let config = {
            params: {
                text: val,
            }
        }

        await axios.get(BASE_URL_SERVER + '/book/mysql/description', config)
            .then(res => {
                console.log("res mysql: ", res.data)
                books = res.data.data;
                dispatch(setBooks(books));
                setTimeSearch(res.data.timeExec);
            })
            .catch(err => {
                console.log("Error when get books mysql with conditions: ", err);
            });

        return books;
    }


    const getBooksWithConditionsNeo4j = async (val) => {
        let books = [];
        let config = {
            params: {
                text: val,
            }
        }

        await axios.get(BASE_URL_SERVER + '/book/neo4j/description', config)
            .then(res => {
                console.log("res neo4j: ", res.data.data)
                books = res.data.data;
                dispatch(setBooks(books));
                setTimeSearch(res.data.timeExec);
            })
            .catch(err => {
                console.log("Error when get books neo4j with conditions: ", err);
            });

        return books;
    }

    const onSearch = (value) => {
        console.log("value search: ", value);
        // get dbms
        let selectedDbms = dbms;

        if (selectedDbms == 'mysql') {
            let newBooksList = getBooksWithConditionsMysql(value);
        } else {
            let newBooksList = getBooksWithConditionsNeo4j(value);
        }

    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setDbms(value);
    };

    return (
        <div className='indexing-table-search-bar'>

            <div className='search-select'>
                <Search
                    style={{ width: "600px" }}
                    placeholder="Search..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />

                <Select
                    defaultValue="mysql"
                    style={{ width: 120, marginLeft: 20, }}
                    onChange={handleChange}
                    options={optionsSelect}
                />
            </div>


            <p className='time-search'>
                Time for search: {timeSearch} (s)
            </p>
        </div>
    );
}