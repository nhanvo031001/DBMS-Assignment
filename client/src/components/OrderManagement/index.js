import './style.css';
import OrderList from "../OrderList";
import OrderListSearch from "../OrderListSearch";


export default function OrderManagement() {
    return (
        <div className='order-management'>
            <h2>OrderManagement</h2>

            <OrderListSearch/>
            <OrderList/>
        </div>
    );
}