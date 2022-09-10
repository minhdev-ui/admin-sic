import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { BarcodeScanner } from "react-usb-barcode-scanner";
import FormModal from "../components/formModal";
import Config from "../../../../db.config";
import { Box } from "@mui/material";
import { async } from "@firebase/util";
import createNotification from "../../../../components/elements/Nofication";
import BarcodeReader from "react-barcode-reader";

const DashboardRoom = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [msv, setMsv] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScanner = (msv) => {
    setOpen(true);
    setMsv(msv);
    // getDetailData();
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(`${Config.API_URL}/api/room`);
    return response;
  };

  useEffect(() => {
    if(open === false) {
      const responseData = getData();
      responseData.then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }else {
      return
    }
  }, [open]);

  const removeRoom = (_id) => {
    axios
      .patch(`${Config.API_URL}/api/room/${_id}`, { entered: false })
      .then(() => {
        const responseData = getData();
        responseData.then((res) => {
          setData(res.data);
          setLoading(false);
        });
      });
  };

  console.log(msv);

  const handleCreate = (obj) => {
    setOpen(false)
    axios(`${Config.API_URL}/api/room/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: obj,
    })
      .then((res) => {
        createNotification("success", { message: "Đã Thêm" });
        const responseData = getData();
        responseData.then((res) => {
          setData(res.data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        createNotification("error", { message: "Lỗi" });
      });
  };

  return (
    <div className="Dashboard-room">
      <BarcodeReader onScan={handleScanner} />
      {open ? (
        <FormModal visible={open} Msv={msv} handleCreate={handleCreate} onClose={() => setOpen(false)}/>
      ) : (
        <div>....</div>
      )}
      <div className="inner-room">
        <h3 className="inner-room-form--heading">
          Danh Sách Sinh Viên Vào Phòng
        </h3>
        <Table
          loading={loading}
          dataSource={data.filter((item) => item.entered === true)}
          columns={[
            {
              title: "Ảnh",
              dataIndex: ["image"],
              render(value) {
                return (
                  <Box component="img" src={value} width={50} height={50} />
                );
              },
            },
            {
              title: "Mã Sinh Viên",
              dataIndex: ["msv"],
            },
            {
              title: "Họ Tên",
              dataIndex: ["name"],
            },
            {
              title: "Ngày Sinh",
              dataIndex: ["date"],
            },
            {
              title: "Lớp",
              dataIndex: ["class"],
            },
            {
              title: "Chức Năng",
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
            <div>Mã Sinh Viên</div>
            <div>Họ Tên</div>
            <div>Ngày Sinh</div>
            <div>Lớp</div>
            <div>Chức Năng</div>
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
