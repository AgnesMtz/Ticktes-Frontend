import React from "react";

const Alerta = ({ alerta }) => {
  return (
    <div
      className={` ${
        alerta.error ? "from-red-400 to-red-600" : "from-green-200 to-green-600"
      } mx-auto w-11/12 rounded-xl bg-gradient-to-br p-3
        text-center text-sm font-bold uppercase text-white`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
