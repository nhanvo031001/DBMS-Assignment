import './style.css';
import BookList from "../BookList";
import BookListSearch from "../BookListSearch";


export default function BookManagement() {
    return (
        <div className='book-management'>
            <h2>BookManagement</h2>

            <BookListSearch/>
            <BookList/>

        </div>
    );
}