import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "./index.css";
import FspApp from "./fsp-app/App";
import KanbanApp from "./kanban-app/App";
import { useTranslation } from "react-i18next";

function App() {
    const { t } = useTranslation();
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-col">
                <header className="w-full border-b border-(--border) bg-[#1a1a2e] text-white">
                    <nav className="flex w-full items-center gap-6 px-6 py-3">
                        <span className="mr-4 text-lg font-semibold tracking-tight">
                            {t("companyPortal")}
                        </span>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("home")}
                        </NavLink>
                        <NavLink
                            to="/fsp"
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("employeeManagement")}
                        </NavLink>
                        <NavLink
                            to="/kanban"
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("projectManagement")}
                        </NavLink>
                    </nav>
                </header>

                <main className="w-full flex-1">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="flex min-h-[calc(100svh-53px)] w-full items-center justify-center bg-(--bg) px-6">
                                    <div className="text-center">
                                        <h1 className="text-(--text-h)">
                                            {t("welcomeToCompanyPortal")}
                                        </h1>
                                        <p className="mt-4 max-w-xl text-(--text)">
                                            {t("gettingStarted")}
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                                            <Link
                                                to="/fsp"
                                                className="rounded-lg border border-(--border) px-5 py-2.5 font-medium text-(--text-h) transition hover:bg-(--code-bg)"
                                            >
                                                {t("employeeManagement")}
                                            </Link>
                                            <Link
                                                to="/kanban"
                                                className="rounded-lg border border-(--border) px-5 py-2.5 font-medium text-(--text-h) transition hover:bg-(--code-bg)"
                                            >
                                                {t("projectManagement")}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                        <Route path="/fsp/*" element={<FspApp />} />
                        <Route path="/kanban/*" element={<KanbanApp />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
