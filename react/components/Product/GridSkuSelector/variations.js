import Selector from "./selector"
import styles from "./styles.css"

const SkuSelector = ({variations}) => {

    if(variations == null && variations == undefined && variations.length == 0) return null 
    return(
        <div className={styles.GridVariation}>
            {
                variations.map((elem, index) => {
                    
                    elem.name == "Cores" && elem.values[0]

                    return(
                        <div key={index}>
                            <Selector variation={elem.values} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkuSelector