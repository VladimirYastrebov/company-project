import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "./index.css";
import FspApp from "./fsp-app/App";
import KanbanApp from "./kanban-app/App";

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-col">
                <header className="w-full border-b border-(--border) bg-[#1a1a2e] text-white">
                    <nav className="flex w-full items-center gap-6 px-6 py-3">
                        <span className="mr-4 text-lg font-semibold tracking-tight">
                            Company Portal
                        </span>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/fsp"
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            Employee Management
                        </NavLink>
                        <NavLink
                            to="/kanban"
                            className={({ isActive }) =>
                                `transition hover:text-blue-300 ${isActive ? "text-blue-300" : "text-white/90"}`
                            }
                        >
                            Project Management
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
                                            Welcome to Company Portal
                                        </h1>
                                        <p className="mt-4 max-w-xl text-(--text)">
                                            Choose a section from the navigation above to get
                                            started.
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                                            <Link
                                                to="/fsp"
                                                className="rounded-lg border border-(--border) px-5 py-2.5 font-medium text-(--text-h) transition hover:bg-(--code-bg)"
                                            >
                                                Employee Management
                                            </Link>
                                            <Link
                                                to="/kanban"
                                                className="rounded-lg border border-(--border) px-5 py-2.5 font-medium text-(--text-h) transition hover:bg-(--code-bg)"
                                            >
                                                Project Management
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
