import React, { useState } from "react";
// import ReactTooltip from "react-tooltip";
import useClippy from "use-clippy";

import { useToasts } from "react-toast-notifications";

import { Link } from "react-router-dom";

function ListItem({ url, deleteHandler }) {
  const [clipboard, setClipboard] = useClippy();

  const { addToast } = useToasts();
  const handleCopy = () => {
    addToast("Short URL Copied", { appearance: "success" });
    setClipboard(process.env.REACT_APP_DOMAIN + url.shortUrl);
  };

  return (
    <li>
      <span>{url.name}</span>
      <span>
        <i
          onClick={handleCopy}
          // data-tip={}
          class="far fa-copy"
        ></i>
        {/* <ReactTooltip effect="solid" /> */}

        <a
          href={url.url}
          // data-tip="Live Site"
        >
          <i class="far fa-eye"></i>
        </a>

        <Link to={{ pathname: `/stats/${url._id}`, state: url }}>
          <i class="fas fa-chart-bar"></i>
        </Link>

        <i
          onClick={deleteHandler}
          // data-tip="Delete"
          class="fas fa-trash"
        ></i>
      </span>
    </li>
  );
}

export default React.memo(ListItem);
