import { Routes, Route } from "react-router";
import DashBoard from "../Dashboard";
import Indexing from "../Indexing";
import Query from "../Query";
import BookManagement from "../BookManagement";
import CustomerManagement from "../CustomerManagement";
import OrderManagement from "../OrderManagement";

export default function Body() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/index" element={<Indexing />} />
                <Route path="/query" element={<Query />} />
                <Route path="/book-management" element={<BookManagement />} />
                <Route path="/customer-management" element={<CustomerManagement />} />
                <Route path="/order-management" element={<OrderManagement />} />
            </Routes>
        </div>
    );
}