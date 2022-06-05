import { useFormik } from "formik";
import React from "react";
import FileInput from "../../components/input/FileInput";
import { useAuth } from "../../context";
import { APIKit, uploadFile } from "../../services/api";
import "./create.css";

const CreateDocument = () => {
  const { toast } = useAuth(useAuth);
  const formik = useFormik({
    initialValues: {
      bi: null,
      dire: null,
      passporte: null,
      endereco: null,
      nuit: null,
      rendimento: null,
      outros: null,
    },
    onSubmit: async (values) => {
      try {
        const toastID = toast.loading("Carregando Ficheiros.");
        values.bi = await uploadFile(values?.bi);
        values.dire = await uploadFile(values?.dire);
        values.passporte = await uploadFile(values?.passporte);
        values.endereco = await uploadFile(values?.endereco);
        values.nuit = await uploadFile(values?.nuit);
        values.rendimento = await uploadFile(values?.rendimento);
        values.outros = await uploadFile(values?.outros);
        toast.dismiss(toastID);
        const toast2 = toast.loading("Enviando Dados!");
        APIKit.post("/documentos", values)
          .then(() => {
            toast.success("Dados submetidos com sucesso!");
          })
          .catch(() => {
            toast.error("Ocorreu um erro ao submeter dados!");
          })
          .finally(() => toast.dismiss(toast2));
      } catch (err) {
        toast.error("Ups, ocorreu um erro ao submeter a empresa!");
      }
    },
  });
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text">Actualizar Documentos</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">DETALHES DO CLIENTE</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes aos detalhes do
          cliente
        </p>
        <div className="card mb-3">
          <p className="mb-3">Bilhete de Identidades</p>
          <FileInput
            name="bi"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("bi", file)}
            value={formik.values?.bi?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">DIRE</p>
          <FileInput
            name="dire"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("dire", file)}
            value={formik.values?.dire?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Passaporte</p>
          <FileInput
            name="passporte"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("passporte", file)}
            value={formik.values?.passporte?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Morada</p>
          <FileInput
            name="endereco"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("endereco", file)}
            value={formik.values?.endereco?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">NUIT</p>
          <FileInput
            name="nuit"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("nuit", file)}
            value={formik.values?.nuit?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Declaração de rendimento</p>
          <FileInput
            name="rendimento"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("rendimento", file)}
            value={formik.values?.rendimento?.name || ""}
          />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Outros</p>
          <FileInput
            name="outros"
            placeholder="Escolha um ficheiro"
            inputEvent={(file) => formik.setFieldValue("outros", file)}
            value={formik.values?.outros?.name || ""}
          />
        </div>
        <div className="flex">
          <button type="submit" className="action-button" to="/admin">
            <span>Enviar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateDocument;
