import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { BoardProvider } from "@/contexts/BoardContext";
import { BoardPage } from "@/pages/BoardPage";
import { ErrorPageRoutes } from "@/pages/errors/ErrorPageRoutes";
import { ErrorToast } from "@/components/errors/ErrorToast";
import { ErrorModal } from "@/components/errors/ErrorModal";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import "./index.css";

function App() {
    return (
        <ErrorProvider>
            <ErrorBoundary>
                <BoardProvider>
                    <Routes>
                        <Route index element={<BoardPage />} />
                        <Route path="errors/*" element={<ErrorPageRoutes />} />
                        <Route path="*" element={<Navigate to="errors/404" replace />} />
                    </Routes>
                    <ErrorToast />
                    <ErrorModal />
                </BoardProvider>
            </ErrorBoundary>
        </ErrorProvider>
    );
}

export default App;
