// ! Vista inicial del programa.
// hooks, routers, reducers:
import { useNavigate } from "react-router-dom";
// Estilos:
import style from "./Landing.module.css";
const { container, containerImg, mainTitle, secondText, img, contButton, button } = style;
// Variables de entorno:
import getParamsEnv from "../../functions/getParamsEnv.js";
const { HOME, IMG_LAND } = getParamsEnv();

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className={container}>
            <div className={containerImg}>
                <img className={img} src={IMG_LAND} alt="" />
            </div>
            <h1 className={mainTitle}>Listador</h1>
            <h2 className={secondText}>(proyecto de Paulo Vinci)</h2>
            <p className={contButton} href="/">
                <button className={button} onClick={() => navigate(HOME)} >Ingresar</button>
            </p>
        </div >
    )
};

export default Landing;

