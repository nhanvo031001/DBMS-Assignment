import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import './style.css';

export default function IndexingTableSearchBar() {
    const { Search } = Input;

    const onSearch = (value) => console.log(value);

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