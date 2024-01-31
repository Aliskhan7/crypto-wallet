import React from "react";
import { Layout } from "antd";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}

export default AppContent;
