import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { addUserUrl } from "../../utils/requests";

import { Spinner } from "react-spinners-css";

const validateURL = (url) => {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return re.test(url);
};

export default function AddUrl() {
  useDocumentTitle("URL Shortner | Add URL");

  const nameRef = useRef();
  const longRef = useRef();
  const shortRef = useRef();

  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const long = longRef.current.value;
    const short = shortRef.current.value;

    const errors = [];

    if (!name) errors.push("Name is Required");
    if (!long) errors.push("Long URL is Required");
    else if (!validateURL(long)) errors.push("Long URL is Not Valid");

    if (errors.length === 0) {
      setLoading(true);
      addUserUrl(name, long, "5f8c1844079627624d630a21", short).then(() => {
        setLoading(false);
        history.push("/");
      });
    } else {
      e.target.reset();
      setErrors(errors);
    }
  };

  return (
    <div className="add">
      <main>
        <h1>Add A URL</h1>
        <p>
          Enter a Short ID for a custom short URL otherwise a random one will be
          genereated
        </p>
        {errors.map((error) => (
          <div key={error} className="error">
            {error}
          </div>
        ))}
        {!loading ? (
          <form onSubmit={handleSubmit}>
            <input ref={nameRef} placeholder="Name" type="text" />
            <input ref={longRef} placeholder="Long URL" type="text" />
            <input ref={shortRef} placeholder="Short ID" type="text" />
            <button>ADD</button>
          </form>
        ) : (
          <div className="add__loading">
            <Spinner color="#e6e0d3" />
          </div>
        )}
        <Link to="/">
          <h3>
            {" "}
            <i class="fas fa-home"></i> Back to Home
          </h3>
        </Link>
      </main>
    </div>
  );
}
