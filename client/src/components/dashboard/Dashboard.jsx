import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import Confrim from "../utils/Confrim";

import { Spinner } from "react-spinners-css";

import { deleteUrl, fetchUserUrls } from "../../utils/requests";

export default function Dashboard() {
  const [data, setData] = useState();

  const [search, setSearch] = useState("");
  const [confirmOptions, setConfirmOptions] = useState({
    yesHandler: () => {},
    noHandler: () => {},
    subText: "",
    open: false,
  });

  useEffect(() => {
    fetchUserUrls("5f8c1844079627624d630a21").then((data) => {
      setData(data);
    });
  }, []);

  const deleteHandler = (id, name) => {
    setConfirmOptions({
      open: true,
      subText: `${name} will be permanently deleted along with all its statistics.`,
      yesHandler: () => {
        deleteUrl(id)
          .then(() => {
            setConfirmOptions((prev) => ({ ...prev, open: false }));
            setData(null);
            fetchUserUrls("5f8c1844079627624d630a21").then((data) => {
              setData(data);
            });
          })
          .catch((err) => console.log(err));
      },
      noHandler: () => {
        setConfirmOptions((prev) => ({ ...prev, open: false }));
      },
    });
  };

  return (
    <div className="dashboard">
      <main>
        <div className="dashboard__top">
          <h1>Dashboard</h1>
          <Link to="/add">
            <button className="dashboard__add">
              <i class="fas fa-plus"></i>
            </button>
          </Link>
          <button className="dashboard__logout">
            <i class="fas fa-sign-out-alt"></i>
          </button>
          <div className="dashboard__search">
            <i class="fas fa-search"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <ul className="dashboard__list">
          {data ? (
            data
              .filter((url) =>
                `${url.name} ${url.longURL}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((url) => (
                <ListItem
                  url={url}
                  deleteHandler={() => deleteHandler(url._id, url.name)}
                />
              ))
          ) : (
            <div className="dashboard__loading">
              <Spinner color="#e6e0d3" />
            </div>
          )}
        </ul>
      </main>
      <Confrim options={confirmOptions} />
    </div>
  );
}
