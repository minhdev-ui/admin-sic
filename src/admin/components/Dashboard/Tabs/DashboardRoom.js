import { Box } from "@mui/material";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { MdRemoveCircle } from "react-icons/md";
import createNotification from "../../../../components/elements/Nofication";
import Config from "../../../../db.config";
import FormModal from "../components/formModal";
import avatarMale from "../../../../assets/images/admin/avatar.png";
import avatarFemale from "../../../../assets/images/admin/girlAva.png";
const DashboardRoom = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [msv, setMsv] = useState("");
  const now = new Date().getHours();
  const [loading, setLoading] = useState(false);

  const handleScanner = (msv) => {
    setOpen(true);
    setMsv(msv);
    // getDetailData();
  };
  const getData = async () => {
    setLoading(true);
    const response = await axios.get(`${Config.API_URL}/api/room`, {
      params: { entered: true },
    });
    return response;
  };

  useEffect(() => {
    if (open === false) {
      const responseData = getData();
      responseData.then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } else {
      return;
    }
  }, [open]);

  const handleRemoveAllRoom = () => {
    data.map((item) => removeRoom(item._id));
  };

  useEffect(() => {
    if (now === 17) {
      handleRemoveAllRoom();
    } else {
      return;
    }
  }, [now]);

  const removeRoom = (_id) => {
    axios
      .patch(`${Config.API_URL}/api/room/${_id}`, {
        entered: false,
      })
      .then((res) => {
        if (res.status === 200) {
          const responseData = getData();
          responseData.then((res) => {
            if (res.status === 200) {
              setData(res.data);
              setLoading(false);
            }
          });
        }
      });
  };
  const handleCreate = (obj) => {
    setOpen(false);
    localStorage.setItem("RoomStudent", { ...data, obj });
    axios(`${Config.API_URL}/api/room/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: obj,
    })
      .then((res) => {
        createNotification("success", { message: "???? Th??m" });
        const responseData = getData();
        responseData.then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        createNotification("error", { message: "L???i" });
      });
  };

  const handleEntered = (_id, obj) => {
    setOpen(false);
    axios
      .patch(`${Config.API_URL}/api/room/${_id}`, {
        ...obj,
        entered: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const responseData = getData();
          responseData.then((res) => {
            if (res.status === 200) {
              localStorage.setItem("RoomStudent", JSON.stringify(res.data));
              // setData(res.data.filter((item) => item === true));
              setLoading(false);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        createNotification("error", { message: "L???i" });
      });
  };

  return (
    <div className="Dashboard-room">
      <BarcodeReader onScan={handleScanner} />
      {open ? (
        <FormModal
          visible={open}
          Msv={msv}
          handleCreate={handleCreate}
          handleEntered={handleEntered}
          onClose={() => setOpen(false)}
        />
      ) : (
        <div></div>
      )}
      <div className="inner-room">
        <h3 className="inner-room-form--heading">
          Danh S??ch Sinh Vi??n V??o Ph??ng
        </h3>
        <Table
          loading={loading}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          columns={[
            {
              title: "???nh",
              dataIndex: ["gender"],
              render(value) {
                return (
                  <Box
                    component="img"
                    src={value === 0 ? avatarMale : avatarFemale}
                    width={50}
                    height={50}
                  />
                );
              },
            },
            {
              title: "M?? Sinh Vi??n",
              dataIndex: ["msv"],
            },
            {
              title: "H??? T??n",
              dataIndex: ["name"],
            },
            {
              title: "Ng??y Sinh",
              dataIndex: ["date"],
            },
            {
              title: "L???p",
              dataIndex: ["class"],
            },
            {
              title: "Ch???c N??ng",
              dataIndex: ["_id"],
              render(value) {
                return (
                  <MdRemoveCircle
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => {
                      removeRoom(value);
                    }}
                  />
                );
              },
            },
          ]}
        />
        {/* <div className="inner-room-content">
          <div className="inner-form-heading">
            <div>M?? Sinh Vi??n</div>
            <div>H??? T??n</div>
            <div>Ng??y Sinh</div>
            <div>L???p</div>
            <div>Ch???c N??ng</div>
          </div>
          <div className="inner-room-form">
            <div className="inner-room-main">
              {data
                .filter((item) => item.enterRoom === true)
                .map((item, i) => {
                  return (
                    <div className="inner-room-member">
                      <div>{item.svId}</div>
                      <div>{item.name}</div>
                      <div>{item.date}</div>
                      <div>{item.class}</div>
                      <div>
                        <MdRemoveCircle
                          onClick={() => {
                            updateSinhVien(item._id, {
                              enterRoom: false,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardRoom;
