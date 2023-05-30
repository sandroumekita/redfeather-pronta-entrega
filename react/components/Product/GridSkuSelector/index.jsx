import { useState, useEffect } from "react";

import { Query, useLazyQuery } from "react-apollo";
import getSession from "../../../queries/getSession.gql";
import { Link } from "vtex.render-runtime";

import styles from "./styles.css";

// VTEX
import useProduct from "vtex.product-context/useProduct";

import SkuSelector from "./skuSelector";
import Totals from "./totals";

const GridProducts = () => {
  const [queue, setQueue] = useState([]);
  const [render, setRender] = useState(true);

  const [fetchSession, { data: session, loading: sessionLoading }] =
    useLazyQuery(getSession);
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => fetchSession(), []);
  useEffect(() => {
    if (session && session.profile != null) {
      const url = `/api/io/safedata/CL/search?_fields=_all&_where=(email=${session.profile.email})`;
      const options = {
        method: "GET",
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].approved) {
            setAllowed(true);
          } else {
            setAllowed(false);
            setMessage(
              "Infelizmente o site é restrito apenas para usuários com perfil aprovados pela Red Feather, para obter acesso entre em <strong>contato por aqui.</strong>"
            );
          }
        })
        .catch((err) => console.error("error:" + err));
    } else {
      setAllowed(false);
    }
  }, [session, sessionLoading]);

  const productContext = useProduct();

  useEffect(() => {}, [queue, allowed]);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/login?returnUrl=${window.location.pathname}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    window.location.href = `/cadastre-se?returnUrl=${window.location.pathname}`;
  };

  const handleLink = (e) => {
    e.preventDefault();
    window.location.href = `mailto:jr@redfeather.com.br`;
  };

  //if(render == false) return null

  return (
    <>
      {/* !allowed ? 
                    <>
                    {
                        message ? 
                                <Link onClick={handleLink} className={styles.responseMessage} dangerouslySetInnerHTML={{ __html: message }} /> 
                            :
                                <div className={styles.container}>
                                    <Link onClick={handleClick} className={styles.loginCta}>Login</Link>
                                    <Link onClick={handleRegister} className={styles.loginRegister}>Cadastre-se</Link>
                                </div>
                    }
                    </>
                : */}
      <>
        <SkuSelector
          items={productContext?.product?.items}
          queue={queue}
          setQueue={setQueue}
          setRender={setRender}
        />
        <Totals queue={queue} />
      </>
    </>
  );
};

export default GridProducts;
