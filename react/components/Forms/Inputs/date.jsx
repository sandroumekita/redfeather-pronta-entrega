import {
  useState,
  useEffect
} from 'react';

import {
  Input,
} from 'vtex.styleguide';

function InputDate({
  state: { data, setData }
}) {
  const [value, setValue] = useState('');

  const handleChange = (ev) => {
    const typed = ev.currentTarget.value;
    if (typed.length <= 10) setValue(mask(typed));
  }

  useEffect(() => {
    setData({ ...data, ["birthdate"]: value });
  }, [value]);

  const mask = (typed) => {
    return typed.replace(/(\d{2})(\d{2})(\d{4})/g,"\$1\/\$2\/\$3");
  }

  return <Input required onChange={handleChange} value={value} name="phone" size="large" label="Data de Nascimento" />;
}

export default InputDate;