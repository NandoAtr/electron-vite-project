import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { SettingsOverview } from "./Components/Settings/SettingsOverview";
import { Settings } from "./Pages/Settings";
import ProtectedRoute from "./Routers/ProtectedRoute";
import Login from "./Pages/Login";
import { CommingSoon } from "./Pages/CommingSoon";
import { HowWorks } from "./Components/HowWorks/HowWorks";
import PlanAndBilling from "./Components/Settings/PlanAndBilling";
import Account from "./Components/Settings/Account";
import ResetPassword from "./Components/Settings/ResetPassword";
import { SettingsLayout } from "./Layouts/SettingsLayout";
import ConnectedDevices from "./Components/Settings/ConnectedDevices";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<CommingSoon />} />
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="settings" element={<Outlet />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/billing"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <PlanAndBilling />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/account"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <Account />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/devices"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <ConnectedDevices />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/password"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <ResetPassword />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/notifications"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <Settings />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/account/edit"
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <Settings />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/forum"
        element={
          <ProtectedRoute>
            <CommingSoon />
          </ProtectedRoute>
        }
      />
      <Route
        path="/breve"
        element={
          <ProtectedRoute>
            <CommingSoon />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/how"
        element={
          <ProtectedRoute>
            <HowWorks />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
