import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';

const Fromulario = ({crearCita}) => {

    // Crear State de citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })

    // 2do state
    const [error, actualizarError] =  useState(false)

    // Funcion que se ejecuta cada que el usuario escribe un input
    const actualizarState = e => {
        actualizarCita({
            ...cita, //creamos una copia para que no lo sobre escriba
            [e.target.name]: e.target.value // toma el contenido de los campos y agarra su valores
        })
    }

    // Extaer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario precione gregar cita
    const submiCita = e => {
        e.preventDefault();

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
            hora.trim() === '' || sintomas.trim() === '' ){
                actualizarError(true);
            return;
        }

        // eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid(); 

        // Crear  la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> 
            : null }

            <form 
            onSubmit={submiCita} 
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Describa los síntomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"                    
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
export default Fromulario;