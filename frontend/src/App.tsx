import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "./index.css";
import FspApp from "./fsp-app/App";
import KanbanApp from "./kanban-app/App";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./shared/components/LanguageSwitcher";

function App() {
    const { t } = useTranslation();
    
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-col">
                <header className="w-full border-b border-(--border) bg-[#1a1a2e] text-white">
                    <nav className="flex w-full flex-wrap items-center gap-2 px-4 py-3 md:gap-6 md:px-6">
                        <span className="mr-2 shrink-0 text-base font-semibold tracking-tight md:mr-4 md:text-lg">
                            {t("companyPortal")}
                        </span>
                        <div className="flex flex-1 flex-wrap items-center gap-2 md:gap-4">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `rounded-md px-2 py-1 text-sm transition hover:text-blue-300 md:text-base ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("home")}
                        </NavLink>
                        <NavLink
                            to="/fsp"
                            className={({ isActive }) =>
                                `rounded-md px-2 py-1 text-sm transition hover:text-blue-300 md:text-base ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("employeeManagement")}
                        </NavLink>
                        <NavLink
                            to="/kanban"
                            className={({ isActive }) =>
                                `rounded-md px-2 py-1 text-sm transition hover:text-blue-300 md:text-base ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            {t("projectManagement")}
                        </NavLink>
                        </div>
                    </nav>
                </header>

                <main className="w-full flex-1">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="flex min-h-[calc(100svh-53px)] w-full items-center justify-center bg-(--bg) px-4 py-10 md:px-6 md:py-14">
                                    <div className="max-w-3xl text-center">
                                        <h1 className="text-(--text-h) text-4xl font-semibold md:text-5xl lg:text-6xl">
                                            {t("welcomeToCompanyPortal")}
                                        </h1>
                                        <p className="mt-4 max-w-2xl text-base text-(--text) md:text-lg">
                                            {t("gettingStarted")}
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
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
                <footer className="border-t border-(--border) bg-[#1a1a2e] text-white">
                    <LanguageSwitcher />
                </footer>
            </div>
        </BrowserRouter>
    );
}

//ToDo чекнуть возможность смотреть преференс пользака из LocalStorage
export default App;
