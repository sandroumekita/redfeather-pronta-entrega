import style from "./styles.css"
import React from "react"
import useProduct from "vtex.product-context/useProduct"

function FlagShelf() {

    const product = useProduct();

    return(
        product?.product?.clusterHighlights[0]?.id == 156 ?
            <div className={style.flagDetail}>
                Desconto Progressivo
            </div>
        : null
    )
}

export default FlagShelf;