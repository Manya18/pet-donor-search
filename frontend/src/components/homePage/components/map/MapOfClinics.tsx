import styles from "./mapOfClinics.module.css"

const MapOfClinics = () => {
    return ( 
        <div className={styles.map__section}>
            <h2 id='place' className={styles.map__title}>Где сдать кровь?</h2>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A9d264997fa1aa9b6dbea0837d67cd50e0c0946ee898a5975977e258aef87f142&amp;source=constructor"
                width="1200"
                height="350"
            ></iframe>{" "}
        </div>
     );
}
 
export default MapOfClinics;