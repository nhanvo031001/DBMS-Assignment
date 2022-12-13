import {Input, Space, Select} from 'antd';
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BASE_URL_SERVER} from "../../constants/constants";
import {setBooks} from "../../redux/bookReducer";
import {useState} from "react";

export default function CustomerListSearch() {

    const {Search} = Input;

    const onSearch = (value) => {
        console.log("value search: ", value);

    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='customer-list-table-search-bar'>

            <div className='search-select'>
                <Search
                    style={{ width: "600px" }}
                    placeholder="Search..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />

                {/*<Select*/}
                {/*    defaultValue="mysql"*/}
                {/*    style={{ width: 120, marginLeft: 20, }}*/}
                {/*    onChange={handleChange}*/}
                {/*    options={optionsSelect}*/}
                {/*/>*/}
            </div>


            {/*<p className='time-search'>*/}
            {/*    Time for search: {timeSearch} (s)*/}
            {/*</p>*/}
        </div>
    );
}