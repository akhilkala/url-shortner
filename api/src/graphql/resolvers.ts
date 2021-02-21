import { getAllUrls, getUrlByID, addURL, deleteURL } from "../controllers/url";

export default {
  Query: {
    getAllUrls,
    getUrlByID,
  },
  Mutation: {
    addURL,
    deleteURL,
  },
};
