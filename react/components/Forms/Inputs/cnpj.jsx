import {
  useState
} from 'react';

import {
  Input,
} from 'vtex.styleguide';

function InputCnpj({
  state: {
    data,
    setData
  },
  form
}) {
  const [value, setValue] = useState('');

  const handleChange = (ev) => {
    let name = ev.currentTarget.name;
    let typed = ev.currentTarget.value.replace(/[\/.-]/g, '');
    if(typed.length <= 14) {
      setValue(mask(typed, 'cpnj'))
      setData({ ...data, [name]: typed, "isCorporate": true });
    }
  }

  function mask(typed, type) {
    if (type === 'cpf') {
      return typed.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (type === 'cpnj') {
      return typed.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }
  }

  return <Input required onChange={handleChange} value={value} maxlength="14" name="corporateDocument" size="large" label="CNPJ" />;
}

export default InputCnpj;