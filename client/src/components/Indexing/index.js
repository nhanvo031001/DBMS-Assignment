import './style.css';
import IndexingTable from "../IndexingTable";
import IndexingTableSearchBar from "../IndexingTableSearchBar";

export default function Indexing() {
    return (
        <div className='indexing'>
            <h2>Indexing</h2>

            <IndexingTableSearchBar />

            <IndexingTable />
        </div>
    );
}