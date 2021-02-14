import axios from "./axios";

export const fetchUserUrls = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/url?user=${userId}`)
      .then((raw) => resolve(raw.data))
      .catch((err) => reject(err));
  });
};

export const addUserUrl = (name, url, user, short = null) => {
  const payload = {
    name,
    url,
    user,
    short,
  };

  return new Promise((resolve, reject) => {
    axios
      .post("/url", payload)
      .then((raw) => resolve(raw.data))
      .catch((err) => reject(err));
  });
};

export const deleteUrl = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/url?url_id=${id}`)
      .then((raw) => {
        resolve(raw.data);
      })
      .catch((err) => reject(err));
  });
};
