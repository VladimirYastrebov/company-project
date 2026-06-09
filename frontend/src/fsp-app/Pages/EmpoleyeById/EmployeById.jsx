import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FSP_API } from "../../index.js";
import {
    ArrowLeft,
    Calendar,
    Clock,
    DollarSign,
    IdCard,
    TrendingUp,
    User,
    Users,
    CheckCircle,
    XCircle,
} from "lucide-react";
import "../shared/i18n";
import i18n from "../shared/i18n";

export const EmployeById = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchEmployee() {
            setIsLoading(true);
            setError("");

            try {
                const response = await axios.get(FSP_API);
                const foundEmployee = response.data.find((item) => String(item.id) === String(id));
                setEmployee(foundEmployee || null);
            } catch {
                setError(i18n.t("errorFetchEmployee"));
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmployee();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
                <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
                    <p className="text-lg text-slate-300">{i18n.t("employeeLoading")}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
                <div className="w-full max-w-xl rounded-2xl border border-red-900/50 bg-slate-900/80 p-8">
                    <p className="text-red-400 text-lg">{error}</p>
                    <Link
                        to="/fsp"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="ml-1.5">{i18n.t("backToEmployeeList")}</span>
                    </Link>
                </div>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
                <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
                    <h2 className="text-3xl font-semibold">{i18n.t("employeeNotFound")}</h2>
                    <p className="mt-3 text-slate-300">
                        {i18n.t("employeeNotFoundMessage", { id })}
                    </p>
                    <Link
                        to="/fsp"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="ml-1.5">{i18n.t("backToEmployeeList")}</span>
                    </Link>
                </div>
            </div>
        );
    }

    const avatarLetter = employee.name ? employee.name[0].toUpperCase() : "?";
    const salaryValue = Number(employee.salary);
    const formattedSalary = Number.isFinite(salaryValue)
        ? salaryValue.toLocaleString("en-US")
        : employee.salary;

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4">
                    <Link
                        to="/fsp"
                        className="inline-flex items-center gap-1.5 text-blue-400 font-semibold transition hover:text-blue-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {i18n.t("backToEmployeeList")}
                    </Link>
                    <div className="hidden items-center gap-3 text-slate-400 sm:flex">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {new Date().toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-slate-400" />
                            {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        </span>
                    </div>
                </div>

                <section className="rounded-2xl border border-slate-800 bg-linear-to-b from-slate-900 to-slate-900/70 p-6 md:p-8 shadow-2xl shadow-blue-950/30">
                    <div className="mb-4 flex items-center justify-center gap-1.5 text-slate-200">
                        <Users className="h-5 w-5 text-blue-300" />
                        <span className="text-sm font-medium tracking-wide">
                            {i18n.t("employeeManager")}
                        </span>
                    </div>
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-700/50 text-5xl font-bold text-slate-100 ring-1 ring-blue-500/50">
                        {avatarLetter}
                    </div>

                    <h2 className="mt-6 text-center text-4xl font-bold tracking-tight">
                        {i18n.t("employeeDetails")}
                    </h2>

                    <div className="mt-8 space-y-4">
                        <div className="grid grid-cols-[1fr_auto] items-center rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4">
                            <p className="inline-flex items-center gap-1.5 text-slate-400">
                                <IdCard className="h-4 w-4 text-slate-400" />
                                {i18n.t("id")}
                            </p>
                            <p className="text-lg font-medium text-slate-100">{employee.id}</p>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] items-center rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4">
                            <p className="inline-flex items-center gap-1.5 text-slate-400">
                                <User className="h-4 w-4 text-slate-400" />
                                {i18n.t("name")}
                            </p>
                            <p className="text-lg font-medium text-slate-100">{employee.name}</p>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] items-center rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4">
                            <p className="inline-flex items-center gap-1.5 text-slate-400">
                                <DollarSign className="h-4 w-4 text-blue-300" />
                                {i18n.t("salary")}
                            </p>
                            <p className="text-3xl font-bold text-blue-400">${formattedSalary}</p>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] items-center rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4">
                            <p className="inline-flex items-center gap-1.5 text-slate-400">
                                <TrendingUp className="h-4 w-4 text-slate-400" />
                                {i18n.t("salaryIncreaseStatus")}
                            </p>
                            <div className="flex items-center gap-2">
                                <p
                                    className={`text-xl font-semibold ${
                                        employee.upping_salary
                                            ? "text-emerald-400"
                                            : "text-rose-400"
                                    }`}
                                >
                                    {employee.upping_salary ? "Yes" : "No"}
                                </p>
                                {employee.upping_salary ? (
                                    <CheckCircle size={16} color="green" />
                                ) : (
                                    <XCircle size={16} color="red" />
                                )}
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/fsp"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-4 text-lg font-semibold text-white transition hover:bg-blue-500"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="ml-1.5">{i18n.t("backToEmployeeList")}</span>
                    </Link>
                </section>
            </div>
        </div>
    );
};
