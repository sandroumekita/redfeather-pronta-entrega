import {
  useState,
  useEffect
} from 'react';

import {
  Input,
} from 'vtex.styleguide';

function InputPhone({state: { data, setData }, name, label }) 
{
  const [value, setValue] = useState('');

  const handleChange = (ev) => {
    const typed = ev.currentTarget.value;
    if (typed.length <= 14) setValue(mask(typed));
  }

  useEffect(() => {
    setData({ ...data, [name]: value });
  }, [value]);

  const mask = (typed) => {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    const str = typed.replace(/[^0-9]/g, "").slice(0, 11);
    return str.replace(regex, "($1)$2-$3");
  }

  return <Input required onChange={handleChange} value={value} name={name} size="large" label={label} />;
}

export default InputPhone;