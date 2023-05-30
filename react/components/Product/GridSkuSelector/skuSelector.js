import { FormattedPrice } from 'vtex.formatted-price'

import styles from "./styles.css"
import Variations from "./variations"
import Quantity from "./quantity"

const SkuSelector = ({items, queue, setQueue, setRender}) => {

    if(items == null && items == undefined) return null 
    return(
        <div className={styles.wrapperSkuSelectorScroll}>
            <div className={styles.wrapperSkuSelector}>
                {
                    items.map((elem, index) => {

                        if(elem.sellers[0].commertialOffer.AvailableQuantity > 0) {
                            
                            return(
                                <div className={`${styles.SkuSelector} ${elem?.variations[0]?.name == "Tamanho" && styles[`var_${elem?.variations[0]?.values[0]}`]}`} key={index}>
                                    <img src={elem.images[0].imageUrl} />
                                    <div className={styles.SelectorInfo}>
                                        <h2 className={styles.Title}>{ elem.nameComplete }</h2>
                                        <div className={styles.Row}>
                                            <Variations variations={elem.variations} />
                                            <Quantity item={elem} queue={queue} setQueue={setQueue} />
                                            <div className={styles.Price}>
                                                Preço unitário:<br />
                                                <strong><FormattedPrice value={elem.sellers[0].commertialOffer.Price} /></strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            setRender(false)
                            return null
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SkuSelector