import React, { useContext } from "react";
import Layout from "./components/Layout";
import { AppContext } from "./contexts/AppContext";
import CFADashboard from "./pages/cfadashboard/CFADashboard";
import { DeviceProvider } from "./provider/DeviceProvider";

const App: React.FC = () => {
  const { isUpdate, setUpdate } = useContext(AppContext);

  setUpdate(false); // đặt giá trị của isLoading là true

  return (
    <DeviceProvider>
      {/* {isUpdate && <div>Loading...</div>} */}
      <Layout>
        <CFADashboard />
      </Layout>
    </DeviceProvider>
  );
};

export default App;
