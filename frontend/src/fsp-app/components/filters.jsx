import { Search } from "lucide-react";
import "../shared/i18n";
import i18n from "../shared/i18n";

export const Filters = ({ filter, inputValue, activeFilter }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    inputValue(value);
    filter(value.trim() ? 4 : 1);
  };

  function getButtonClass(buttonFilter) {
    const baseClass =
      "rounded-lg border px-4 py-2 text-sm font-medium transition md:text-base";
    const activeClass =
      "border-blue-500 bg-linear-to-b from-blue-500 to-blue-700 text-white";
    const inactiveClass = "border-blue-900/70 bg-slate-900 text-slate-200 hover:border-blue-600";
    return `${baseClass} ${activeFilter === buttonFilter ? activeClass : inactiveClass}`;
  }

  return (
    <div className="mt-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          name="searchEmploeye"
          placeholder={i18n.t("search_employees")}
          className="w-full rounded-lg border border-blue-900/70 bg-slate-950 py-3 pl-11 pr-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          className={getButtonClass(1)}
          onClick={() => {
            filter(1);
          }}
        >
          {i18n.t("all_employees")}
        </button>
        <button
          className={getButtonClass(2)}
          onClick={() => {
            filter(2);
          }}
        >
          {i18n.t("with_bonus")}
        </button>
        <button
          className={getButtonClass(3)}
          onClick={() => {
            filter(3);
          }}
        >
          {i18n.t("salary_greater_than")} $1000
        </button>
      </div>
    </div>
  );
};
