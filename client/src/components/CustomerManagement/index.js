import './style.css';
import CustomerList from "../CustomerList";
import CustomerListSearch from "../CustomerListSearch";


export default function CustomerManagement() {
    return (
        <div className='customer-management'>
            <h2>CustomerManagement</h2>

            <CustomerListSearch/>
            <CustomerList />
        </div>
    );
}