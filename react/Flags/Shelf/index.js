import style from "./styles.css"
import React from "react"
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

function FlagShelf() {

    const productSummary = useProductSummary()

    return(
        productSummary?.product?.clusterHighlights[0]?.id == 156 ?
            <div className={style.flag}>
                Desconto Progressivo
            </div>
        : null
    )
}

export default FlagShelf;