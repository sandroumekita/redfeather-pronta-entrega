import React, { useState, useLayoutEffect, useEffect } from "react";
import { Query, useLazyQuery } from "react-apollo";
import getSession from "../../queries/getSession.gql";
import { Link } from "vtex.render-runtime";
import styles from "./styles.css";

const LoggedIn = ({ children }) => {
  const [fetchSession, { data: session, loading: sessionLoading }] =
    useLazyQuery(getSession);
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => fetchSession(), []);
  useEffect(() => {
    if (session && session.profile != null) {
      if (session && session.profile != null) {
        const url = `/api/io/safedata/CL/search?_where=email=${session.profile.email}&_fields=approved`;

        const options = {
          method: "GET",
        };
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            if (data[0].approved != true) {
              if (window.location.href.indexOf("/falta-liberacao") == -1) {
                window.location.href = "/falta-liberacao";
              }
            }
          })
          .catch((err) => console.error("error:" + err));
      } else {
        if (
          window.location.href.indexOf("/login") == -1 &&
          window.location.href.indexOf("/cadastre-se") == -1
        ) {
          if (session && session.profile == null) {
            window.location.href =
              "/login?returnUrl=" + window.location.pathname;
          }
        }
      }
    } else {
      if (
        window.location.href.indexOf("/login") == -1 &&
        window.location.href.indexOf("/cadastre-se") == -1
      ) {
        if (session && session.profile == null) {
          window.location.href = "/login?returnUrl=" + window.location.pathname;
        }
      }
    }
  }, [session, sessionLoading]);

  return null;
};

export default LoggedIn;
