import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, Gift, Trash2, User, XCircle } from "lucide-react";
import "../../shared/i18n";
import i18n from "../../shared/i18n";

function renderEmployeeCard(employe, delEmploye, upSalary) {
    const salaryValue = Number(employe.salary);
    const salaryToShow = Number.isFinite(salaryValue) ? salaryValue.toLocaleString() : employe.salary;
    return (
        <div
            key={employe.id}
            className="grid items-center gap-4 rounded-xl border border-indigo-300/20 bg-linear-to-br from-blue-950/70 to-slate-900 p-4 md:grid-cols-[2fr_1.2fr_auto]"
        >
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-900 text-xl font-bold text-slate-100">
                    <User className="h-7 w-7 text-slate-100" />
                </div>
                <div>
                    <Link
                        className="inline-block text-2xl font-bold text-slate-100 transition hover:text-blue-300"
                        to={`/fsp/emploeyeById/${employe.id}`}
                    >
                        {employe.name}
                    </Link>
                    <p className="mt-1 text-slate-400">{i18n.t("id")}: {employe.id}</p>
                </div>
            </div>
            <div>
                <p className="mt-1 inline-flex items-center gap-1.5 text-slate-400">
                    <DollarSign className="h-4 w-4 text-blue-300" />
                    {i18n.t("salary")}
                </p>
                <p className="text-3xl font-bold text-blue-400">${salaryToShow}</p>
                <p
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold ${
                        employe.upping_salary
                            ? "bg-emerald-900/40 text-emerald-300"
                            : "bg-rose-900/30 text-rose-300"
                    }`}
                >
                    {employe.upping_salary ? (
                        <CheckCircle className="h-4 w-4" />
                    ) : (
                        <XCircle className="h-4 w-4" />
                    )}
                    {i18n.t("bonus")}: {employe.upping_salary ? i18n.t("yes") : i18n.t("no")}
                </p>
            </div>
            <div className="flex flex-row gap-2 md:flex-col">
                <button
                    className="min-w-32 rounded-lg border border-blue-600 bg-blue-900/30 px-3 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-800/40"
                    onClick={() => upSalary(employe, employe.id, employe.upping_salary)}
                >
                    <span className="inline-flex items-center gap-1.5">
                        <Gift className="h-4 w-4" />
                        {employe.upping_salary ? i18n.t("remove_bonus") : i18n.t("give_bonus")}
                    </span>
                </button>
                <button
                    className="min-w-32 rounded-lg border border-rose-500/70 bg-rose-900/20 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-900/35"
                    onClick={() => delEmploye(employe.id)}
                >
                    <span className="inline-flex items-center gap-1.5">
                        <Trash2 className="h-4 w-4" />
                        {i18n.t("delete")}
                    </span>
                </button>
            </div>
        </div>
    );
}

export const AllWorkers = ({
    workers,
    delWorker,
    addSalary,
    uppingSalary,
    render,
    valueToRender,
}) => {
    render = Number(render);
    valueToRender = String(valueToRender || "").trim().toLowerCase();

    let employees = [];

    switch (render) {
        case 2:
            employees = uppingSalary;
            break;
        case 3:
            employees = workers.filter((item) => Number(item.salary) > 1000);
            break;
        case 4:
            employees = workers.filter((item) =>
                String(item.name || "").toLowerCase().startsWith(valueToRender),
            );
            break;
        default:
            employees = workers;
    }

    if (!employees.length) {
        return (
            <section className="mt-4 rounded-xl border border-indigo-300/20 bg-slate-900/90 p-4">
                <h2 className="mb-3 text-2xl font-bold text-slate-100">{i18n.t("employeeList")}</h2>
                <p className="m-0 text-slate-400">{i18n.t("noEmployeesFoundFilter")}</p>
            </section>
        );
    }

    return (
        <section className="mt-4 rounded-xl border border-indigo-300/20 bg-slate-900/90 p-4">
            <h2 className="mb-3 text-2xl font-bold text-slate-100">{i18n.t("employeeList")}</h2>
            <div className="flex flex-col gap-3">
                {employees.map((item) => renderEmployeeCard(item, delWorker, addSalary))}
            </div>
        </section>
    );
};
