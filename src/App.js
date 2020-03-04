import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './componets/Formulario';
import Cita from './componets/Cita';
import Footer from './componets/Footer';
import PropTypes from 'prop-types';

function App() {

  // Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas 
  const [citas, guardarCitas] =  useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el stata cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  // Funcion que tome las cits actuales y agregue las nueva
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  // Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'


  return (
    <Fragment>
      <h1>Adminstrador de pacientes</h1>
      
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
            
          </div>
          
        </div>
        <h1 className="one-half">
              <Footer/>
        </h1>
      </div>
      
    </Fragment>
  );
}

Formulario.propTypes={
  crearCita: PropTypes.func.isRequired
}


export default App;
