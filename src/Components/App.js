import React, { Component } from "react";
import CreatLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";
import Search from "./Search";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./Login";

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<CreatLink />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top" element={<LinkList />}></Route>
          <Route path="/new/:page" element={<LinkList />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
