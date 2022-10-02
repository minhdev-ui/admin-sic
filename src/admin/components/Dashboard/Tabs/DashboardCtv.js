import {
  FormLabel,
  IconButton,
  Input,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";
// import Modal from "@mui/material/Modal";
import { EyeOutlined } from "@ant-design/icons";
import { Box } from "@mui/system";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import createNotification from "../../../../components/elements/Nofication";
import config from "../../../../db.config";
import exportUsersToExcel from "../../../../utils/exportExcel";
import Loading from "../../../../utils/Loading";
import generateUUID from "../../../store/uuid";

const TOKEN_ADMIN = generateUUID();

const TableCTV = ({ data, isLoading, handleDeleteCtv }) => {
  const [openModel, setOpenModel] = useState(false);
  const [ctvDetail, setCtvDetail] = useState({});
  const [delModal, setDelModal] = useState(false);

  const handleOpen = (id) => {
    setCtvDetail(id);
    setOpenModel(true);
  };
  const handleClose = () => {
    setOpenModel(false);
  };
  function handleCtvDetail(id) {
    return axios.get(`${config.API_URL}/api/ctv/${id}`);
  }
  return (
    <>
      {data ? (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100vh", position: "relative" }}
        >
          <Table
            loading={isLoading}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            columns={[
              {
                title: "Họ Tên",
                dataIndex: ["fullName"],
              },
              {
                title: "Email",
                dataIndex: ["email"],
              },
              {
                title: "Số Điện Thoại",
                dataIndex: ["phone"],
              },
              {
                title: "Lớp",
                dataIndex: ["class"],
              },
              {
                title: "Ban Lựa Chọn",
                dataIndex: ["answer"],
                render(value) {
                  return value.join(", ");
                },
              },
              {
                title: "Lời Nhắn",
                dataIndex: ["message"],
                render(value) {
                  return (
                    <Stack
                      direction="col"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <EyeOutlined
                        onClick={() => handleOpen(value)}
                        style={{ color: "#1F51FF" }}
                      />
                      <>
                        {openModel && (
                          <Modal
                            centered
                            title="Lời Nhắn"
                            visible={openModel}
                            footer={[
                              <Button
                                key="Close"
                                type="primary"
                                onClick={handleClose}
                              >
                                Close
                              </Button>,
                            ]}
                            closable={false}
                          >
                            <Typography>
                              {ctvDetail === ""
                                ? "Không có lời nhắn nào cả"
                                : ctvDetail}
                            </Typography>
                          </Modal>
                        )}
                      </>
                    </Stack>
                  );
                },
              },
              {
                title: "Tùy Chọn",
                dataIndex: ["_id"],
                render(value) {
                  return (
                    <>
                      <div className="article_admin_list_option">
                        <AiFillDelete
                          className="article_admin_option delete"
                          onClick={() => setDelModal(true)}
                        ></AiFillDelete>
                      </div>
                      {delModal ? (
                        <Modal
                          centered
                          title="Xác Nhận Xóa"
                          visible={delModal}
                          footer={[
                            <Button
                              key="Cancel"
                              type="ghost"
                              onClick={() => setDelModal(false)}
                            >
                              Cancel
                            </Button>,
                            <Button
                              key="Confirm"
                              type="primary"
                              onClick={() => {
                                setDelModal(false);
                                handleDeleteCtv(value);
                              }}
                            >
                              Confirm
                            </Button>,
                          ]}
                          closable={false}
                        >
                          <Typography>Nhấn Nút Confirm Để Xác Nhận</Typography>
                        </Modal>
                      ) : (
                        ""
                      )}
                    </>
                  );
                },
              },
            ]}
          />
        </TableContainer>
      ) : (
        <Box
          height="70vh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading />
        </Box>
      )}
    </>
  );
};

const SearchBar = ({ setSearchQuery, handleSubmit }) => (
  <form
    style={{
      display: "flex",
      flexDirection: "row",
    }}
    onSubmit={(e) => e.preventDefault()}
  >
    <Stack direction="row" position="relative" alignItems="center">
      <FormLabel
        sx={{
          marginRight: "10px",
        }}
      >
        Tìm Kiếm
      </FormLabel>
      <Input
        sx={{
          input: {
            marginBottom: "0 !important",
          },
        }}
        onChange={(e) => {
          // setSearchQuery(e.target.value);
          handleSubmit(e.target.value);
        }}
      />
    </Stack>
  </form>
);

const DashboardCtv = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [authorize, setAuthorize] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const workSheetColumnName = [
    "MSV",
    "Họ Tên",
    "Ngày Sinh",
    "Giới Tính",
    "Lớp",
    "Email",
    "Số Điện Thoại",
    "Ban Lựa Chọn",
    "Lời Nhắn",
    "Facebook Link",
  ];
  const workSheetName = "Ctv";
  const filePath = "./outputFiles/ctv.xlsx";
  const handleExportCtv = () => {
    exportUsersToExcel(data, workSheetColumnName, workSheetName, filePath);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCtvData() {
    setLoading(true);
    await axios.get(`${config.API_URL}/api/ctv`).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setData(res?.data?.filter((item) => item.isDeleted === false));
        setFullData(res?.data?.filter((item) => item.isDeleted === false));
      }
    });
  }
  function handleDeleteCtv(id) {
    axios
      .patch(`${config.API_URL}/api/ctv/${id}`, { isDeleted: true })
      .then((res) => {
        if (res.status === 200) {
          createNotification("success", { message: "Xoá thành công! :3" });
        }
        getCtvData();
      })
      .catch((err) => {
        createNotification("error", { message: "Lỗi Òy! T_T" });
        console.log(err);
      });
  }
  function filterCtvData(query) {
    let filterData;
    if (query === "") {
      getCtvData();
    } else {
      filterData =
        fullData && fullData.filter((item) => item.fullName.toLowerCase().includes(query.toLowerCase()) === true);
      setData(filterData);
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  async function clearCollection() {
    data &&
      data.forEach((item) =>
        axios.patch(`${config.API_URL}/api/ctv/${item._id}`, {
          isDeleted: true,
        })
      );
  }
  useEffect(() => {
    getCtvData();
  }, []);
  const modelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 200,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "#000",
    overflow: "hidden",
    borderRadius: "8px",
    opacity: 1,
  };
  return (
    <>
      <Stack margin="10px 0">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap="10px">
            <Button type="primary" onClick={() => getCtvData()}>
              Refresh
            </Button>
            <Button
              onClick={() => {
                console.log("Auth: ", TOKEN_ADMIN);
                setOpen(true);
              }}
              type="danger"
              disabled={data.length === 0 ? true : false}
            >
              Delete All
            </Button>
            {open && (
              <Modal
                centered
                title="Lời Nhắn"
                visible={open}
                footer={[
                  <Button type="primary" key="cancel" onClick={handleClose}>
                    Cancel
                  </Button>,
                  <Button
                    key="confirm"
                    type="primary"
                    onClick={() => {
                      authorize === TOKEN_ADMIN
                        ? clearCollection()
                            .then(
                              createNotification(
                                "success",
                                "Xoá thành công! :3"
                              )
                            )
                            .catch((err) => {
                              createNotification("error", "Lỗi Òy! T_T");
                              console.log(err);
                            })
                        : createNotification("error", "Authorize Failed");
                      setOpen(false);
                    }}
                  >
                    Confirm
                  </Button>,
                ]}
                closable={false}
              >
                <Box overflow="hidden" sx={modelStyle}>
                  <Typography color="#39FF14" variant="h6" letterSpacing="2px">
                    Authorize
                  </Typography>
                  <Input
                    placeholder="********"
                    sx={{
                      width: "100%",
                      margin: "10px 0",
                    }}
                    onChange={(e) => setAuthorize(e.target.value)}
                  />
                </Box>
              </Modal>
            )}
            <Button
              onClick={handleExportCtv}
              disabled={data.length === 0 ? true : false}
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                backgroundColor: "#39FF14",
              }}
            >
              export <SiMicrosoftexcel />
            </Button>
          </Stack>
          <SearchBar
            setSearchQuery={setSearchQuery}
            handleSubmit={filterCtvData}
          />
        </Stack>
        <Stack>
            <Typography color="#000">
            Tổng Số CTV Đăng Ký: {data.length} Đơn
          </Typography>
        </Stack>
      </Stack>
      <TableCTV
        data={data}
        isLoading={loading}
        handleDeleteCtv={handleDeleteCtv}
      />
    </>
  );
};

export default DashboardCtv;
