import React, { useState, useEffect } from 'react'
import { Query, useLazyQuery } from 'react-apollo'
import getSession from '../../queries/getSession.gql'
import { Link } from 'vtex.render-runtime'
import styles from './styles.css'

export default function WdtConditionIsLoggedIn(props) {
    const { Then, Else } = props
    const [fetchSession, { data: session, loading: sessionLoading }] = useLazyQuery(getSession)
    const [allowed, setAllowed] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => fetchSession(), [])
    useEffect(() => {
        if (session && session.profile != null) {
            const url = `/api/io/safedata/CL/search?_fields=_all&_where=(email=${session.profile.email})`;
            const options = {
                method: 'GET'
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    if (data[0].approved) {
                        setAllowed(true)
                    } else {
                        setAllowed(false)
                        setMessage("Infelizmente o site é restrito apenas para usuários com perfil aprovados pela Red Feather, para obter acesso entre em <strong>contato por aqui.</strong>")
                    }
                })
                .catch(err => console.error('error:' + err));
        } else {
            setAllowed(false)
        }
    }, [session, sessionLoading])

    const handleClick = (e) => {
        e.preventDefault()
        window.location.href = `/login?returnUrl=${window.location.pathname}`
    }

    const handleRegister = (e) => {
        e.preventDefault()
        window.location.href = `/cadastre-se?returnUrl=${window.location.pathname}`
    }

    const handleLink = (e) => {
        e.preventDefault()
        window.location.href = `mailto:jr@redfeather.com.br`
    }

    if (!session) return null
    return (
        <div className={styles.containerLoggedIn}>
            {
                !allowed ?
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
                :
                    <Then />
            }
        </div>
    );
}