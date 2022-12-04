import { Routes, Route } from "react-router";
import DashBoard from "../Dashboard";
import Indexing from "../Indexing";
import Query from "../Query";

export default function Body() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/index" element={<Indexing />} />
                <Route path="/query" element={<Query />} />
            </Routes>
        </div>
    );
}