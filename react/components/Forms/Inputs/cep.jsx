import {
  useState,
  useEffect
} from 'react';

import {
  Input,
  Dropdown
} from 'vtex.styleguide';

import styles from '../styles.css';

const options = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

function AddressForm({
  state: {
    data,
    setData
  },
  form
}) {
  const [value, setValue] = useState('');

  const handleSearch = (ev) => {
    fetch(`https://viacep.com.br/ws/${ev.currentTarget.value}/json/`, {
      method: 'GET',
    }).then((res) => {
      res.json().then((res) => {
        setData({ ...data, ["state"]: res.uf, ["city"]: res.localidade, ["address"]: res.logradouro, ["neighborhood"]: res.bairro });
        form.current.querySelector("#city").value = res.localidade;
        form.current.querySelector("#address").value = res.logradouro;
        form.current.querySelector("#neighborhood").value = res.bairro;
      })
    })
  }

  const handleChange = (ev) => {
    const typed = ev.currentTarget.value;
    if (typed.length <= 9) setValue(mask(typed));
    handleData(ev);
  }

  const handleData = (ev) => {
    let name = ev.currentTarget.name;
    let value = ev.currentTarget.value;
    setData({ ...data, [name]: value });
  }

  const mask = (valor) => {
    return valor.replace(/(\d{5})(\d{3})/g,"\$1\-\$2");
  }

  return (
    <>
      <div className={styles.flex}>
        <div className={`${styles.inputGroup}`}>
          <Input required onChange={handleData} name="addressName" size="large" label="Nome Endereço (ex: Loja)" />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={`${styles.inputGroup} ${styles.maxW35}`}>
          <Input required onChange={handleChange} onBlur={handleSearch} value={value} name="postalCode" size="large" label="Cep" />
        </div>
        <div className={`${styles.inputGroup}`}>
          <Input required onChange={handleData} id="address" name="street" size="large" label="Endereço" />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={`${styles.inputGroup}`}>
          <Input required onChange={handleData} id="number" name="number" size="large" label="Número" />
        </div>
        <div className={`${styles.inputGroup}`}>
          <Input onChange={handleData} id="complement" name="complement" size="large" label="Complemento" />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.inputGroup}>
          <Input required onChange={handleData} id="neighborhood" name="neighborhood" size="large" label="Bairro" />
        </div>
        <div className={styles.inputGroup}>
          <Input required onChange={handleData} id="city" name="city" size="large" label="Cidade" />
        </div>
        <div className={styles.inputGroup}>
          <Dropdown
            name="state"
            size="large"
            label="Estado"
            value={data.state}
            options={options}
            onChange={(_, v) => setData({ ...data, state: v })}
          />
        </div>
      </div>
    </>
  )
}

export default AddressForm;