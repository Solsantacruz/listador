//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/listador';
    const MY_LNK = import.meta.env.VITE_MY_LINKEDIN || 'https://www.linkedin.com/in/paulo-damian-vinci/';
    const MY_GIT = import.meta.env.VITE_MY_GITHUB || 'https://github.com/PauloDamianVinci/listador';
    const ROOT = import.meta.env.VITE_ROOT || '/';
    const HOME = import.meta.env.VITE_HOME || '/home';
    const IMG_LAND = import.meta.env.VITE_IMG_LAND || '/src/assets/Land.jpg';
    const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/loading.gif';
    const IMG_LINK = import.meta.env.VITE_IMG_LINKEDIN || '/src/assets/LINKEDIN.PNG';
    const IMG_GIT = import.meta.env.VITE_IMG_GITHUB || '/src/assets/GIT.PNG';
    const IMG_EXIT = import.meta.env.VITE_IMG_SALIR || '/src/assets/Salir.PNG';

    return { API_URL_BASE, HOME, IMG_LAND, ROOT, IMG_ESPERA, IMG_LINK, IMG_GIT, MY_LNK, MY_GIT, IMG_EXIT }
}