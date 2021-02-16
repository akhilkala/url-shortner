import { getAllUrls, getUrlByID, addURL, deleteURL } from "../controllers/url";
import { login, register } from "../controllers/auth";

export default {
  Query: {
    getAllUrls,
    getUrlByID,
  },
  Mutation: {
    login,
    register,
    addURL,
    deleteURL,
  },
};
