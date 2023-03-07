import "./assets/style.scss";

import { useEffect, useState } from "react";
import ListArticle from "./ListArticle";
import axios from "axios";
import dbConfig from "../../../db.config";

const BlogAdmin = () => {
  const [article, setArticle] = useState([]);
  const [sortedValue, setSortedValue] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${dbConfig.API_URL}/api/article`, {
        params: {
          categorize:
            sortedValue === "" || sortedValue === "All"
              ? ["Event", "Blog"]
              : sortedValue,
        },
      })
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      });
  }, [sortedValue]);

  return (
    <>
      <ListArticle
        data={article}
        loading={loading}
        sortedFunc={setSortedValue}
      ></ListArticle>
    </>
  );
};

export default BlogAdmin;
