import React, { useEffect, useState } from "react";
import DetailArticle from "./DetailArticle";
import UpdateArticle from "./UpdateArticle";
import { AiFillDelete } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { BsFillPenFill } from "react-icons/bs";
// import CreateArticle from "./CreateArticle";
import { Link } from "react-router-dom";
import dbConfig from "../../../db.config";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import createNotification from "../../../components/elements/Nofication";
import { deleteObject, getStorage, ref } from "firebase/storage";
import axios from "axios";
import Loading from "../../../components/elements/Loading";

const ListArticle = ({ data, sortedFunc, loading }) => {
  // Article List Data from firebase
  const [article, setArticle] = useState([]);

  // For Detail Page
  const [showDetailArticle, setShowDetailArticle] = useState(false); // show detail

  // For Update Page
  const [showUpdateArticle, setShowUpdateArticle] = useState(false);

  // Get Single Post Data
  const [post, setPost] = useState();

  // For search features
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    document.querySelector(".main-admin-content").scrollTo(0, 0);
  }, [showDetailArticle, showUpdateArticle]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  function handleSortedValue(value) {
    sortedFunc(value);
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setArticle(data);
    }
  }, [data]);

  function handleDeleteArticle(id, imageName) {
    function deleteImage() {
      const storage = getStorage();
      const desertRef = ref(storage, `images/${imageName}`);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          createNotification("success", "Xoá ảnh thành công");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
    console.log("ID: ", id);
    if (window.confirm("Bạn có chắc chắn muốn xoá bài viết này?") == true) {
      // const deleteData = doc(db, "article", id);
      // await deleteDoc(deleteData);

      axios
        .get(`${dbConfig.API_URL}/api/article/delete/${id}`)
        .then(() => {
          createNotification("success", "Xoá thành công");
        })
        .catch((err) => console.log(err));
      deleteImage();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  function handleUpdate(post) {
    setPost(post);
    setShowUpdateArticle(true);
  }
  function handleShowDetail(post) {
    setShowDetailArticle(true);
    setPost(post);
  }

  return (
    <div
      style={{ position: "relative", height: "100%" }}
      className={`article_admin_container`}
    >
      {showDetailArticle && (
        <div className="article_detail">
          <span
            className="article_create_close"
            onClick={() => setShowDetailArticle(false)}
          >
            <AiFillCloseCircle size={30}></AiFillCloseCircle>
          </span>
          <DetailArticle post={post}></DetailArticle>
        </div>
      )}
      {showUpdateArticle && (
        <div className="article_update">
          <span
            className="article_create_close"
            onClick={() => setShowUpdateArticle(false)}
          >
            <AiFillCloseCircle size={30}></AiFillCloseCircle>
          </span>
          <UpdateArticle post={post}></UpdateArticle>
        </div>
      )}
      {!showDetailArticle && !showUpdateArticle && (
        <>
          <div className="article_admin_features">
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              Sorted{" "}
              <select size="1" className="article_sorted">
                <option
                  onClick={(e) => handleSortedValue(e.target.value)}
                  value=""
                  selected
                >
                  All
                </option>
                <option
                  onClick={(e) => handleSortedValue(e.target.value)}
                  value="Blog"
                >
                  Blog
                </option>
                <option
                  onClick={(e) => handleSortedValue(e.target.value)}
                  value="Event"
                >
                  Event
                </option>
              </select>
            </div>
            <div className="article_admin_search ">
              <input
                type="text"
                placeholder="Search here"
                onChange={handleSearch}
              />
              <AiOutlineSearch
                size={30}
                className="search_icon"
              ></AiOutlineSearch>
            </div>
          </div>

          <Link to="/Blog-Event/add" className="article_add_button">
            +
          </Link>

          {loading ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, margin: 0 }}
                aria-label="simple table"
              >
                <TableHead
                  sx={{
                    backgroundColor: "#6B6DFF",
                    th: {
                      color: "#fff",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">Tiêu đề</TableCell>
                    <TableCell align="center">Phân trang</TableCell>
                    <TableCell align="center">Tuỳ chọn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {article.length > 0 && article ? (
                    article
                      .filter((value) => {
                        if (searchValue === "") {
                          return value;
                        } else if (
                          value.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((row, index) => {
                        return (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">
                              {row.categorize}
                            </TableCell>
                            <TableCell align="center">
                              <div className="article_admin_list_option">
                                <AiFillDelete
                                  className="article_admin_option delete"
                                  onClick={() => {
                                    handleDeleteArticle(row._id, row.imageName);
                                  }}
                                ></AiFillDelete>
                                <BiDetail
                                  className="article_admin_option"
                                  onClick={() => handleShowDetail(row)}
                                ></BiDetail>
                                <BsFillPenFill
                                  className="article_admin_option"
                                  onClick={() => handleUpdate(row)}
                                ></BsFillPenFill>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableCell colSpan={4} align="center">
                      Hiện không có bài viết nào!
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </div>
  );
};

export default ListArticle;
