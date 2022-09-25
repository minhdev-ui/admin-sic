import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  disableBarcodeScanner,
  enableBarcodeScanner,
  setHistoryInfo,
} from "react-usb-barcode-scanner";
import config from "../../../components/Scanner/config";
import { AdminDashboard } from "../../store";
import "./assets/style.scss";
//  import icons
// import backend
import DashboardBlog from "./Tabs/DashboardBlog";
import DashboardCtv from "./Tabs/DashboardCtv";
import DashboardEvent from "./Tabs/DashboardEvent";
import DashboardRoom from "./Tabs/DashboardRoom";

const DashboardTab = ({ indexTab }) => {
  switch (indexTab) {
    case 1:
      return (
        <>
          <DashboardRoom />
        </>
      );
    case 2:
      return (
        <>
          <DashboardCtv />
        </>
      );
    case 3:
      return <DashboardBlog />;
    case 4:
      return <DashboardEvent />;
    default:
      return;
  }
};

const Dashboard = () => {
  const tokenAdmin = localStorage.getItem("token");
  const tabDashboard = AdminDashboard((state) => state.dashboard);
  const currentTab = AdminDashboard((state) => state.currentTab);
  const [indexTab, setIndexTab] = useState(currentTab);
  return (
    <section>
      <div className="select-options">
        {tabDashboard.map((item, i) => {
          if (!item.adminAllow) {
            item.disabled = false;
          } else if (tokenAdmin !== "undefined") {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
          return (
            <div
              className={
                item.status
                  ? "option option--active"
                  : item.disabled
                  ? "option option--disabled"
                  : "option"
              }
              key={i}
              onClick={() => {
                tabDashboard.map((it) =>
                  it.id === item.id && !it.disabled
                    ? (it.status = true)
                    : (it.status = false)
                );
                AdminDashboard.setState({ dashboard: tabDashboard });
                if (!item.disabled) {
                  AdminDashboard.setState({ currentTab: item.id });
                  setIndexTab(item.id);
                }
              }}
            >
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <div className="Dashboard-main-content">
        <DashboardTab indexTab={indexTab} />
      </div>
    </section>
  );
};

const mapStateToProps = ({ barcodeScanner: { isBusy, data, history } }) => ({
  isBusy,
  data,
  barcodeHistory: history,
});

export default connect(mapStateToProps, {
  enableBarcodeScanner,
  disableBarcodeScanner,
  setHistoryInfo,
})(Dashboard);
