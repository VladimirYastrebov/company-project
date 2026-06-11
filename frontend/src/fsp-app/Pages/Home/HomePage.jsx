import { HeaderComponents } from "../../components/HeaderComponents.jsx";
import { Filters } from "../../components/filters.jsx";
import { AllWorkers } from "../../components/AllWorkers.jsx";
import { NewEmployee } from "../../components/NewEmployee.jsx";
import getBackendData, { FSP_API } from "../../index.js";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../shared/i18n.js";
import i18n from "../../../shared/i18n";

export const HomePage = () => {
    const [allEmployesState, setEmployes] = useState([]);
    const [higherSalaryState, setHigherSalary] = useState([]);
    const [filtersState, setFilter] = useState(1);
    const [inputFilterValueState, setValue] = useState("");

    useEffect(() => {
        getBackendData().then((data) => {
            setEmployes(data);
            setHigherSalary(data.filter((emp) => emp.upping_salary));
        });
    }, []);

    const everything = {
        everyone: allEmployesState,
        salary: higherSalaryState,
    };

    function addEmploye(newEmployeToAdd) {
        setEmployes((prev) => [...prev, newEmployeToAdd]);
    }

    function deleteEmployee(id) {
        axios
            .delete(FSP_API, { data: { id: id } })
            .then(() => {
                setEmployes((prev) => prev.filter((emp) => emp.id !== id));
                setHigherSalary((prev) => prev.filter((emp) => emp.id !== id));
            })
            .catch((error) => {
                console.error(i18n.t("errorDeleteEmployee"), error);
            });
    }

    function upSalary(employe, id, isUppingSalary) {
        const newUppingSalary = !isUppingSalary;
        axios
            .put(FSP_API, { id: id, upping_salary: newUppingSalary })
            .then(() => {
                if (!isUppingSalary) {
                    const updatedEmploye = { ...employe, upping_salary: true };
                    setEmployes((prev) => prev.map((emp) => (emp.id === id ? updatedEmploye : emp)));
                    setHigherSalary((prev) => [...prev, updatedEmploye]);
                } else {
                    const updatedEmploye = { ...employe, upping_salary: false };
                    setEmployes((prev) => prev.map((emp) => (emp.id === id ? updatedEmploye : emp)));
                    setHigherSalary((prev) => prev.filter((emp) => emp.id !== id));
                }
            })
            .catch((error) => {
                console.error(i18n.t("errorUpdateEmployee"), error);
            });
    }
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#101f4a_0%,#060c1a_45%,#040811_100%)] px-4 py-6 md:px-6">
            <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 md:p-6">
                <HeaderComponents everythingWeNeed={everything} />
                <Filters filter={setFilter} inputValue={setValue} activeFilter={filtersState} />
                <AllWorkers
                    workers={allEmployesState}
                    delWorker={deleteEmployee}
                    addSalary={upSalary}
                    uppingSalary={higherSalaryState}
                    render={filtersState}
                    valueToRender={inputFilterValueState}
                />
                <NewEmployee addNewEmployee={addEmploye} />
            </div>
        </div>
    );
};
