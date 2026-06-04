import React, { useReducer } from "react";
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.amount,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    case "RESET":
      return {
        count: 0,
      };
    default:
      return state;
  }
}

function themeReducer(state, action) {
  switch (action.payload) {
    case "light":
      return {
        theme: (state.theme = "light"),
      };
    case "dark":
      return {
        theme: (state.theme = "dark"),
      };
  }
}

export const Lesson2 = () => {
  const initialState = { count: 0 };
  const initialStateTheme = { theme: "light" };
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [themeState, dispatch2] = useReducer(themeReducer, initialStateTheme);
  return (
    <>
      <div>
        <h1>Счетчик: {state.count}</h1>
        <button onClick={() => dispatch({ type: "INCREMENT", amount: 2 })}>
          +
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button onClick={() => dispatch({ type: "RESET" })}>Сбросить</button>
      </div>
      <br />
      <br />
      <br />
      <div
        style={{
          background: themeState.theme === "dark" ? "#333" : "#fff",
          color: themeState.theme === "dark" ? "#fff" : "#000",
        }}
      >
        <button
          onClick={() => dispatch2({ type: "SET_THEME", payload: "light" })}
        >
          Светлая
        </button>
        <button
          onClick={() => dispatch2({ type: "SET_THEME", payload: "dark" })}
        >
          Темная
        </button>
        <p>Текущая тема: {themeState.theme}</p>
      </div>
    </>
  );
};
