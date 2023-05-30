import { useRef, useState, useEffect } from "react";

import {
  Layout,
  PageHeader,
  PageBlock,
  Button,
  Input,
  Textarea,
  DatePicker,
  Dropzone,
  ToastProvider,
  withToast,
  ToastConsumer,
  InputCurrency,
  EXPERIMENTAL_Select,
  RadioGroup,
} from "vtex.styleguide";

import InputDate from "./Inputs/date";
import AddressForm from "./Inputs/cep";
import InputPhone from "./Inputs/phone";
import InputCnpj from "./Inputs/cnpj";
import InputCpf from "./Inputs/cpf";

import styles from "./styles.css";

const optionsArea = [
  {
    value: "Elogios",
    label: "Elogios",
  },
  {
    value: "Reclamação",
    label: "Reclamação",
  },
  {
    value: "Sugestão",
    label: "Sugestão",
  },
  {
    value: "Outros",
    label: "Outros",
  },
];

const Register = ({ showToast }) => {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [money, setMoney] = useState(null);
  const [date, setDate] = useState(new Date());
  const [cnpj, setCnpj] = useState();
  const form = useRef();

  const [simples, setSimples] = useState({
    value: "",
    error: false,
    errorMessage: "Campo é obrigatório",
  });
  const [newsletter, setNewsletter] = useState({
    value: "",
    error: false,
    errorMessage: "Campo é obrigatório",
  });

  useEffect(() => {}, [simples, newsletter]);

  const handleFile = (value) => {
    setFile(value);
  };

  const handleReset = (files) => {
    if (files) {
      setFile(null);
    }
  };

  const handleChange = (ev, label = "") => {
    let name = ev?.currentTarget?.name;
    let value = ev?.currentTarget?.value;

    if (value == undefined) {
      name = label;
      value = ev.value;
    }

    if (name == "email") {
      setData({ ...data, [name]: value, userId: value });
    } else if (name == "inscricao_estadual" && value == "Isento") {
      setData({ ...data, stateRegistration: "Isento" });
    } else if (name == "inscricao_estadual" && value == "não") {
      setData({ ...data, stateRegistration: "" });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const formatDate = (date) => {
    if (date === "") return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    const url =
      "https://redfeatheratacado.mid.wedigi.house/api/dataentities/CL/documents";
    const settings = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    fetch(url, settings)
      .then((res) =>
        res.json().then((res) => {
          if (
            data.address != undefined &&
            data.postalCode != undefined &&
            data.state != undefined &&
            data.city != undefined &&
            data.number != undefined &&
            data.neighborhood != undefined
          ) {
            let address = `${data.address}, ${data.number} - ${data.neighborhood}, ${data.city} - ${data.state}, ${data.postalCode}`;

            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                address +
                "&key=AIzaSyBKEtul2f9spyr_4u4AkEPZxhap15RAfb0"
            )
              .then((response) => response.json())
              .then((response) => {
                const latitude = response?.results[0]?.geometry?.location?.lat;
                const longitude = response?.results[0]?.geometry?.location?.lng;

                data.geoCoordinate = `${latitude}, ${longitude}`;
                data.addressType = "Comercial";
                data.country = "Brasil";

                const url =
                  "https://redfeatheratacado.mid.wedigi.house/api/dataentities/AD/documents";
                const settings = {
                  method: "PUT",
                  body: JSON.stringify(data),
                };
                fetch(url, settings)
                  .then((res) => res.json().then((res) => {}))
                  .catch((err) => {
                    setError(true);
                  });
              });
          } else {
            setError(true);
          }

          setError(false);
        })
      )
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <>
      {error === null ? (
        <form ref={form} onSubmit={submitHandler} className="mt6">
          <h2>Dados pessoais</h2>

          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <Input
                required
                onChange={handleChange}
                name="firstName"
                size="large"
                label="Nome Responsável"
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                required
                onChange={handleChange}
                name="lastName"
                size="large"
                label="Sobrenome Responsável"
              />
            </div>
            <div className={styles.inputGroup}>
              <InputCpf state={{ data, setData }} form={form} />
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <InputPhone
                state={{ data, setData }}
                name="businessPhone"
                label="Telefone"
              />
            </div>
            <div className={styles.inputGroup}>
              <InputPhone
                state={{ data, setData }}
                name="phone"
                label="Celular"
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <Input
                required
                onChange={handleChange}
                type="email"
                name="email"
                size="large"
                label="E-mail"
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <RadioGroup
                required
                label="Aceita receber promoção?"
                name="isNewsletterOptIn"
                value={newsletter.value}
                options={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                onChange={(e) => {
                  setNewsletter({
                    value: e.currentTarget.value,
                    error: false,
                    errorMessage: "",
                  });
                  handleChange(e);
                }}
              />
            </div>
          </div>

          <h2>Dados Empresa</h2>

          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <Input
                required
                onChange={handleChange}
                name="corporateName"
                size="large"
                label="Razão social"
              />
            </div>
            <div className={styles.inputGroup}>
              <Input
                required
                onChange={handleChange}
                name="tradeName"
                size="large"
                label="Nome fantasia"
              />
            </div>
            <div className={styles.inputGroup}>
              <InputCnpj state={{ data, setData }} form={form} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.inputGroup}>
              <RadioGroup
                required
                label="Inscrição Estadual é Isento?"
                name="inscricao_estadual"
                value={simples.value}
                options={[
                  { value: "Isento", label: "Sim" },
                  { value: "não", label: "Não" },
                ]}
                onChange={(e) => {
                  setSimples({
                    value: e.currentTarget.value,
                    error: false,
                    errorMessage: "",
                  });
                  handleChange(e);
                }}
              />
            </div>
          </div>
          {simples.value == "não" && (
            <div className={styles.flex}>
              <div className={styles.inputGroup}>
                <Input
                  required
                  onChange={handleChange}
                  name="stateRegistration"
                  size="large"
                  label="Inscrição Estadual"
                />
              </div>
            </div>
          )}

          <h2>Endereço</h2>

          <AddressForm state={{ data, setData }} form={form} />

          <div className={styles.buttonForm}>
            <Button type="submit" variation="secondary">
              Enviar
            </Button>
          </div>
        </form>
      ) : (
        <div className={styles["alert-container"]}>
          {error ? (
            <>
              <h4>
                Desculpe, houve um erro :'(
                <br />
                <span>Tente mais tarde</span>
              </h4>
              <button onClick={() => window.location.reload()}>
                Recarregar
              </button>
            </>
          ) : (
            <h4>
              Cadastro concluído com sucesso!
              <br />
              <span>
                Agora vamos iniciar uma análise e entraremos em contato após a
                aprovação do seu cadastro.
              </span>
            </h4>
          )}
        </div>
      )}
    </>
  );
};

function Form() {
  return (
    <ToastProvider positioning={"window"}>
      <ToastConsumer>
        {({ showToast }) => <Register showToast={showToast} />}
      </ToastConsumer>
    </ToastProvider>
  );
}

export default withToast(Form);
