import React, { useState } from "react";

import { deleteUrl } from "../../utils/requests";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import PieChart from "./PieChart";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";

import Confrim from "../utils/Confrim";

export default function Stats() {
  const { state: url } = useLocation();

  // useDocumentTitle(`URL Shortner | ${url.name}`);

  const [confirmOptions, setConfirmOptions] = useState({
    yesHandler: () => {},
    noHandler: () => {},
    subText: "",
    open: false,
  });

  const history = useHistory();

  if (!url) {
    return <Redirect to="/" />;
  }

  const deleteHandler = () => {
    setConfirmOptions({
      open: true,
      subText: `${url.name} will be permanently deleted along with all its statistics.`,
      yesHandler: () => {
        deleteUrl(url._id)
          .then(() => {
            setConfirmOptions((prev) => ({ ...prev, open: false }));
            history.push("/");
          })
          .catch((err) => console.log(err));
      },
      noHandler: () => {
        setConfirmOptions((prev) => ({ ...prev, open: false }));
      },
    });
  };

  return (
    <div className="stats">
      <main>
        <h1>{url.name}</h1>

        <Link to="/">
          <div className="home">
            <i className="fas fa-home"></i>
          </div>
        </Link>

        <div onClick={deleteHandler} className="delete">
          <i className="fas fa-trash"></i>
        </div>

        <section>
          <aside>
            <h3>
              {" "}
              <span>Long Url:</span>
              <br />
              {url.url}
            </h3>
            <h3>
              <span>Short ID:</span> <br /> {url.shortUrl}
            </h3>
            <h3>
              <span>Total Visits:</span> {url.totalVisits}
            </h3>
            <h3>
              <span>Unique Visits:</span> {url.uniqueVisits}
            </h3>
            <h3>
              <span>
                <span id="mobile">Mobile</span> Visits:{" "}
              </span>
              {url.device.mobile}
            </h3>
            <h3>
              <span>
                <span id="desktop">Desktop</span> Visits:
              </span>{" "}
              {url.device.desktop}
            </h3>
          </aside>
          <aside>
            <div className="stats__pie">
              <PieChart
                mobileVisits={url.device.mobile}
                DesktopVisits={url.device.desktop}
              />
            </div>
          </aside>
        </section>
      </main>
      <Confrim options={confirmOptions} />
    </div>
  );
}
