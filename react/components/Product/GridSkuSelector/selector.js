import styles from "./styles.css"

const Selector = ({variation}) => {

    if(variation == null && variation == undefined) return null 
    return(
        <>
            {
                variation.map((elem, index) => {
                    return(
                        <div className={styles.Selector} key={index}>
                            { elem }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Selector