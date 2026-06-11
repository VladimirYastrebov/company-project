import { useState, useEffect } from "react";
import { Calendar, Clock, DollarSign, Gift, Users } from "lucide-react";
import "../shared/i18n";
import i18n from "../shared/i18n";

export const HeaderComponents = ({ everythingWeNeed }) => {
    const allEmployes = everythingWeNeed.everyone;
    const toHigherSalary = everythingWeNeed.salary;
    let countOfAll = allEmployes.length;
    let countOfHigherPaymaent = toHigherSalary.length;
    let countOverThousand = allEmployes.filter((emp) => Number(emp.salary) > 1000).length;
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    let dayOfWeek = null;
    let month = null;
    let date = String(now.getDate()).length == 1 ? "0" + now.getDate() : now.getDate();
    let year = now.getFullYear();
    let hours = String(now.getHours()).length == 1 ? "0" + now.getHours() : now.getHours();
    let minutes = String(now.getMinutes()).length == 1 ? "0" + now.getMinutes() : now.getMinutes();
    let seconds = String(now.getSeconds()).length == 1 ? "0" + now.getSeconds() : now.getSeconds();
    switch (now.getDay()) {
        case 0:
            dayOfWeek = "Sun";
            break;
        case 1:
            dayOfWeek = "Mon";
            break;
        case 2:
            dayOfWeek = "Tue";
            break;
        case 3:
            dayOfWeek = "Wed";
            break;
        case 4:
            dayOfWeek = "Thurs";
            break;
        case 5:
            dayOfWeek = "Fri";
            break;
        case 6:
            dayOfWeek = "Sat";
            break;
        default:
            dayOfWeek = "Smth went wrong, refresh the page";
    }
    switch (now.getMonth()) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sept";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
        default:
            month = "Smth went wrong, pls refresh the page";
    }
    return (
        <div>
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-blue-500/40 bg-blue-500/20 p-2.5">
                        <Users className="h-5 w-5 text-blue-300" />
                    </div>
                    <h1 className="m-0 text-2xl font-bold leading-tight text-slate-100 md:text-4xl">
                        {i18n.t("employeeManager")}
                    </h1>
                </div>
                <div className="text-left text-slate-400 md:text-right">
                    <p className="m-0 inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {dayOfWeek}, {month} {date}, {year}
                    </p>
                    <p className="m-0 inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {hours}:{minutes}:{seconds}
                    </p>
                </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-indigo-300/20 bg-linear-to-br from-blue-950/70 to-slate-900/90 p-4">
                    <p className="m-0 inline-flex items-center gap-1.5 text-slate-400">
                        <Users className="h-4 w-4 text-blue-300" />
                        {i18n.t("all_employees")}
                    </p>
                    <p className="my-1 text-3xl font-bold text-slate-100">{countOfAll}</p>
                    <p className="m-0 text-sm text-slate-500">{i18n.t("all_employees_message")}</p>
                </div>
                <div className="rounded-xl border border-indigo-300/20 bg-linear-to-br from-blue-950/70 to-slate-900/90 p-4">
                    <p className="m-0 inline-flex items-center gap-1.5 text-slate-400">
                        <Gift className="h-4 w-4 text-emerald-300" />
                        {i18n.t("with_bonus")}
                    </p>
                    <p className="my-1 text-3xl font-bold text-emerald-400">
                        {countOfHigherPaymaent}
                    </p>
                    <p className="m-0 text-sm text-slate-500">{i18n.t("with_bonus_message")}</p>
                </div>
                <div className="rounded-xl border border-indigo-300/20 bg-linear-to-br from-blue-950/70 to-slate-900/90 p-4">
                    <p className="m-0 inline-flex items-center gap-1.5 text-slate-400">
                        <DollarSign className="h-4 w-4 text-blue-300" />
                        {i18n.t("salary_greater_than")} $1000
                    </p>
                    <p className="my-1 text-3xl font-bold text-blue-400">{countOverThousand}</p>
                    <p className="m-0 text-sm text-slate-500">{i18n.t("salary_greater_than_message")}</p>
                </div>
            </div>
        </div>
    );
};
