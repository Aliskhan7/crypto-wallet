import { Layout } from "antd";
import AppHeader from "./components/layout/AppHeader.tsx";
import AppSider from "./components/layout/AppSider.tsx";
import AppContent from "./components/layout/AppContent.tsx";

function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default App;
