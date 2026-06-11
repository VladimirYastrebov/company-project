import axios from "axios";
import { useState } from "react";
import { FSP_API } from "../index.js";
import { Plus } from "lucide-react";
import "../../shared/i18n";
import i18n from "../../shared/i18n";

export const NewEmployee = ({ addNewEmployee }) => {
    const [message, setMessage] = useState("");

    async function handleAddNewEmployee(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const employeName = formData.get("nameOfNewEmployee");
        const employeSalary = formData.get("salaryOfNewEmployee");

        const newEmploye = {
            name: employeName,
            id: Date.now().toString(),
            salary: employeSalary,
            upping_salary: false,
        };

        try {
            const response = await axios.post(FSP_API, newEmploye);
            setMessage(i18n.t("employeeAddedSuccessfully"));
            addNewEmployee(response.data);
        } catch (error) {
            console.error(error);
            setMessage(i18n.t("errorAddingEmployee"));
        }

        event.target.reset();
    }

    return (
        <section className="mt-4 rounded-xl border border-indigo-300/20 bg-slate-900/90 p-4">
            <h2 className="mb-3 text-2xl font-bold text-slate-100">{i18n.t("addNewEmployee")}</h2>
            {message && <p className="mb-2 text-blue-300">{message}</p>}
            <form onSubmit={handleAddNewEmployee} className="grid gap-2.5 md:grid-cols-[1fr_1fr_auto]">
                <input
                    className="rounded-lg border border-blue-900/70 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500"
                    type="text"
                    name="nameOfNewEmployee"
                    placeholder={i18n.t("enterEmployeeName")}
                    required
                />
                <input
                    className="rounded-lg border border-blue-900/70 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500"
                    type="number"
                    name="salaryOfNewEmployee"
                    placeholder={i18n.t("enterEmployeeSalary")}
                    required
                />
                <button
                    type="submit"
                    className="rounded-lg border border-blue-500 bg-linear-to-b from-blue-500 to-blue-700 px-5 py-3 font-semibold text-white transition hover:from-blue-400 hover:to-blue-600"
                >
                    <span className="inline-flex items-center gap-1.5">
                        <Plus className="h-4 w-4" />
                        {i18n.t("addEmployee")}
                    </span>
                </button>
            </form>
        </section>
    );
};
