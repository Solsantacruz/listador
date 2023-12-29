// ! Vista principal del programa.
import axios from 'axios';
// hooks, routers, reducers:
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// Componente para visualizar los mensajes:
import { Toaster, toast } from "react-hot-toast";
// Variables de entorno:
import getParamsEnv from "../../functions/getParamsEnv.js";
const { ROOT, API_URL_BASE, IMG_ESPERA, IMG_LINK, IMG_GIT, MY_LNK, MY_GIT, IMG_EXIT } = getParamsEnv();
// Estilos:
import style from "./Home.module.css";
const { container, containerLoading, containerSelectCuentas, containerSelectMov, ContainerMainTitle, contButton, button, selected, img, containerFiles, contIniciarProc, containerNet, imgLink, imgGit, imgSalir } = style;

const Home = () => {
  const navigate = useNavigate();
  const [selectedFileCuentas, setSelectedFileCuentas] = useState(null); // archivo de cuentas a procesar
  const [selectedFileMovim, setSelectedFileMovim] = useState(null);// archivo de movimientos a procesar
  const [keyCuentas, setKeyCuentas] = useState(0); // Clave para permitir elegir archivos repetidos de cuentas
  const [keyMovim, setKeyMovim] = useState(0); // Clave para permitir elegir archivos repetidos de movimientos
  const [loadingFile, setLoadingFile] = useState(false); // indicador de proceso en curso
  const [selectedFileNameCuentas, setSelectedFileNameCuentas] = useState("-"); // archivo de cuentas elegido
  const [selectedFileNameMovim, setSelectedFileNameMovim] = useState("-"); // archivo de movimientos elegido
  const [msgLoad, setMsgLoad] = useState(""); // muestro los mensajes de estado durante el proceso

  const handleFileChangeCuentas = (event) => {
    toast.dismiss(); // cierro mensajes pendientes:
    setSelectedFileCuentas(event.target.files[0]);
    setSelectedFileNameCuentas(event.target.files[0]?.name || "");
    setKeyCuentas(keyCuentas + 1);
  };

  const handleFileChangeMovim = (event) => {
    toast.dismiss(); // cierro mensajes pendientes:
    setSelectedFileMovim(event.target.files[0]);
    setSelectedFileNameMovim(event.target.files[0]?.name || "");
    setKeyMovim(keyMovim + 1);
  };

  const handleStartProcess = () => {
    // ! Comienza el proceso de los archivos.
    if (!selectedFileCuentas || !selectedFileMovim) {
      toast.error("Se deben cargar los archivos antes de iniciar el proceso.");
      return;
    }
    if (loadingFile) { return; }
    setLoadingFile(true); // esto hace que se visualice la animación de loading
    setMsgLoad("Procesando archivo de cuentas...");
    // Cierro mensajes pendientes:
    toast.dismiss();
    // Establezco contadores:
    let totAcc = 0;
    let totMov = 0;
    let totNeg = 0;
    let totLess = 0;
    // Anexo el archivo para ser enviado:
    const formDataCounts = new FormData();
    formDataCounts.append('file', selectedFileCuentas);
    axios.post(API_URL_BASE + "/accounts", formDataCounts) // envío por Axios al backend
      .then(responseAcc => {
        if (responseAcc.data.rx === "ok") {
          totAcc = responseAcc.data.total;
          setMsgLoad("Procesando archivo de movimientos...");
          // Anexo el siguiente archivo para ser enviado:
          const formDataMov = new FormData();
          formDataMov.append('file', selectedFileMovim);
          return axios.post(API_URL_BASE + "/movim", formDataMov)  // envío por Axios al backend
        } else {
          return Promise.reject(responseAcc.data.msg);
        }
      })
      .then(responseMov => {
        if (responseMov.data.rx === "ok") {
          setMsgLoad("Generando bajada de archivo Errores.dat...");
          totMov = responseMov.data.total;
          totNeg = responseMov.data.totalNeg;
          totLess = responseMov.data.menoresDiezMil;
          return axios.get(API_URL_BASE + "/results")  // envío por Axios al backend
        } else {
          return Promise.reject(responseMov.data.msg);
        }
      })
      .then(responseSend => {
        // Creo un pedido de bajada con el contenido del archivo a descargar:
        const blob = new Blob([responseSend.data], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Errores.dat';
        // Simulo el clic en el enlace para iniciar la descarga:
        document.body.appendChild(link);
        link.click();
        // Limpio el enlace y libero recursos:
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        setMsgLoad("-> Archivo descargado.");
        setLoadingFile(false);
        toast.success((t) => (
          <span>
            ¡Proceso finalizado!<br /><br /> El archivo de cuentas tenía {totAcc.toLocaleString()} registros.<br />
            El archivo de movimientos tenía {totMov.toLocaleString()} registros.<br /><br />
            Cuentas con saldo negativo: {totNeg.toLocaleString()}.<br />
            Saldos menores a -$10.000: {totLess.toLocaleString()}.<br /><br />
            <b>El archivo Errors.dat se encuentra disponible en la carpeta de descargas</b><br /><br />
            <button onClick={() => toast.dismiss(t.id)}>Cerrar</button>
          </span>
        ));
        return;
      })
      .catch(error => {
        setLoadingFile(false);
        toast.error(error);
        return;
      });
  }
  return (
    <div className={container}>
      {loadingFile ? (
        <div className={containerLoading}>
          <img className={img} src={IMG_ESPERA} alt="" />
          <h1 className={ContainerMainTitle}>{msgLoad}</h1>
        </div>
      ) : (
        <div className={container}>
          <div className={containerFiles}>
            <div className={containerSelectCuentas}>
              <input
                id="fileInputCuentas"
                type="file"
                onChange={handleFileChangeCuentas}
                accept=".dat"
                style={{ display: 'none' }}
              />
              <div className={contButton}>
                <button className={button} onClick={() => document.getElementById('fileInputCuentas').click()} >Seleccionar archivo de cuentas</button>
              </div>
              <div className={selected}>Seleccionado: {selectedFileNameCuentas}</div>
            </div>
            <div className={containerSelectMov}>
              <input
                id="fileInputMovim"
                type="file"
                onChange={handleFileChangeMovim}
                accept=".dat"
                style={{ display: 'none' }}
              />
              <div className={contButton}>
                <button className={button} onClick={() => document.getElementById('fileInputMovim').click()} >Seleccionar archivo de movimientos</button>
              </div>
              <div className={selected}>Seleccionado: {selectedFileNameMovim}</div>
            </div>
          </div>
          <div className={contIniciarProc}>
            <div className={contButton}>
              <button className={button} onClick={handleStartProcess}>Iniciar proceso</button>
            </div>
          </div>
          <div className={containerNet}>
            <Link to={MY_GIT} target='_blank'                    >
              <img className={imgGit} src={IMG_GIT} style={{ cursor: 'pointer' }} />
            </Link>
            <Link to={MY_LNK} target='_blank'                    >
              <img className={imgLink} src={IMG_LINK} style={{ cursor: 'pointer' }} />
            </Link>
            <img className={imgSalir} src={IMG_EXIT} onClick={() => navigate(ROOT)} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          zIndex: 1000,
        }}
        toastOptions={{
          className: '',
          duration: 120000,
          style: {
            background: '#006175',
            color: '#1fcab3',
          },
          success: {
            style: {
              border: '1px solid #0e0e10',
              padding: '16px',
              color: '#FFFAEE',
            },
            iconTheme: {
              primary: '#1fcab3',
              secondary: '#FFFAEE',
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: 'pink',
              secondary: 'black',
            },
            style: {
              background: '#C43430',
              color: '#fff',
            }
          },
        }}
      />
    </div >
  )
}

export default Home;