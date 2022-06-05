import pt from "date-fns/locale/pt";
import { useFormik } from "formik";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Dropdown from "../../components/input/Dropdown";
import RadioButton from "../../components/input/RadioButton";
import TextInput from "../../components/input/TextInput";
import {
  provinciaAtendimento,
  tipoAgencia,
  tiposAtendimento
} from "../../constants/dictionary";
import { APIKit } from "../../services/api";
import "./reserva.css";

registerLocale("pt", pt);

const CreateReserva = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      provincia: "",
      agencia: "",
      tipo: "",
      descricao: "",
      data: "",
    },
    validationSchema: Yup.object({
      provincia: Yup.string().required("Campo obrigatório"),
      agencia: Yup.string().required("Campo obrigatório"),
      tipo: Yup.string().required("Campo obrigatório"),
      descricao: Yup.string().required("Campo obrigatório"),
      data: Yup.string().required("Campo obrigatório"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const toastID = toast.loading("Enviando Dados!", { duration: 4 * 1000 });
      APIKit.post("/marcacoes", values)
        .then(() => {
          toast.success("Marcação realizada com sucesso!", {
            duration: 5 * 1000,
          });
          setTimeout(() => {
            history.push("/perfil");
          }, 2*1000);
          resetForm();
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao fazer marcação!");
        })
        .finally(() => toast.dismiss(toastID));
    },
  });
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text">Marcação</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">AGENDE MARCAÇÃO</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes a marcação do cliente
        </p>
        <div className="choose">
          <Dropdown
            className="mb-3"
            name="provincia"
            items={provinciaAtendimento}
            label="Província"
            onChange={formik.handleChange}
            placeholder="Selecione a Província"
          />

          <Dropdown
            className="mb-3"
            name="agencia"
            items={tipoAgencia}
            label="Agência"
            onChange={formik.handleChange}
            placeholder="Selecione a Agência"
          />
        </div>
        <div className="card mb-3">
          <p className="mb-2">Tipo de Atendimento</p>
          <div className="flex flex-wrap gap-2">
            {tiposAtendimento.map((item) => (
              <RadioButton
                key={item.value}
                name="tipo"
                selected={formik.values?.tipo}
                label={item.label}
                value={item.value}
                onChange={formik.handleChange}
              />
            ))}
          </div>
        </div>
        <div className="card mb-3">
          <p className="mb-2">Data - Hora </p>

          <DatePicker
            selected={formik.values?.data}
            onChange={(date) => formik.setFieldValue("data", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            name="data"
            locale="pt"
            placeholderText="Escolha a data"
            dateFormat="dd - MMMM h:mm"
          />
        </div>
        <TextInput
          className="card mb-3"
          name="descricao"
          label="Descrição da Marcação"
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="flex">
          <button tipo="submit" className="action-button" to="/admin">
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateReserva;
