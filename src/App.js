import './App.css';
import {useCallback, useEffect, useState} from "react";
import {Home} from "./Home";
import {Nextdays, nextdays} from "./nextdays";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/city" element={<Nextdays />}/>
            </Routes>
        </BrowserRouter>
    );
}

