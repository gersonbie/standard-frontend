import React, { useEffect, useState } from "react";
import SellerIcon from "../../../assets/svgs/seller";
import CustomTable from "../../../components/CustomTable";
import { headersAtendimento } from "../../../constants/dictionary";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
import "./perfil.css";

const Perfil = () => {
  const { usuario, toast, logout } = useAuth(useAuth);
  const [reservas, setReservas] = useState([]);
  const fetchData = () => {
    APIKit.get(`/marcacoes?id=${usuario.id}`)
      .then((response) => setReservas(response.data))
      .catch(() => toast.error("Erro ao Buscar usuários!"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container perfil">
      <div className="profile-card shadow">
        <div className="icon relative">
          <SellerIcon />
          {usuario?.ativo ? (
            <div className="enabled-circle" />
          ) : (
            <div className="disabled-circle" />
          )}
        </div>
        <div className="flex-col p-4 profile-main">
          <h3 className="mb-1 blue-text">{usuario?.nome}</h3>
          <span className="text-opaque">{usuario?.email}</span>
          <span className="text-opaque">{usuario?.contacto}</span>
          <button
            type="button"
            onClick={logout}
            className="logout ph-4 pv-1 shadow"
          >
            Terminar sessão
          </button>
        </div>
        <div className="flex-col profile-footer p-4">
          <div className="flex">
            <CustomTable header={headersAtendimento} items={reservas?.items} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
