import React, { useState } from "react";

const RegularComponent = ({ name }) => {
  console.log("RegularComponent перерисован");
  return <div>Привет, {name}!</div>;
};

export function Lesson() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Иван");

  return (
    <div>
      <h1>Демонстрация React.memo</h1>

      <div>
        <button onClick={() => setCount(count + 1)}>
          Увеличить счетчик: {count}
        </button>
        <button onClick={() => setName(name === "Иван" ? "Мария" : "Иван")}>
          Сменить имя: {name}
        </button>
      </div>

      <div>
        <div>
          <h3>Обычный компонент:</h3>
          <RegularComponent name={name} />
        </div>
      </div>
    </div>
  );
}
