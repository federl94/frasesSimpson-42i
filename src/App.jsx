import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logosimpson.png";
import { Button, Container, Spinner } from "react-bootstrap";
import Frase from "./components/Frase";
import { useEffect, useState } from "react";

function App() {
  const [personaje, setPersonaje] = useState({});
  const [mostrasSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    consultarAPI();
  }, []);
  const consultarAPI = async () => {
    try {
      setMostrarSpinner(true);
      //peticion GET
      const respuesta = await fetch(
        "https://thesimpsonsquoteapi.glitch.me/quotes"
      );
      const dato = await respuesta.json();
      console.log(respuesta);
      console.log(dato[0]);
      setPersonaje(dato[0]);
      setMostrarSpinner (false);
    } catch (error) {
      console.log(error);
    }
  };
  const componenteRenderizado = (mostrasSpinner)? (<div className="my-5">
  <Spinner animation="border" variant="primary" />
  </div>) : <Frase personaje={personaje} />



  return (
    <>
      <Container className="text-center my-5">
        <img src={logo} alt="Logo de los simpson" className="w-50" />
        {componenteRenderizado}
        <Button variant="warning" onClick={consultarAPI}>Obtener frase</Button>
      </Container>
    </>
  );
}

export default App;
