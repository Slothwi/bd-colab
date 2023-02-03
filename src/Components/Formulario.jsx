import { useState } from 'react';
import { Colabs } from './Colabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

const Formulario = () => {
    let [listaColab, setListaColab] = useState(Colabs)
    const [nombreColab, setNombreColab] = useState("");
    const [correoColab, setCorreoColab] = useState("");
    const [buscarColab, setBuscarColab] = useState("");
    const [alertMostrar, setAlertMostrar] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const agregarColaborador = (e) => {
        e.preventDefault();
        if (nombreColab === "" || correoColab === "") {
            setAlertType("danger");
            setAlertMessage("Todos los campos son obligatorios");
            setAlertMostrar(true);
            setBuscarColab("")
            return;
        }else if(listaColab.length === 0){
            setListaColab([...listaColab, {
                id: "1",
                nombre: nombreColab,
                correo: correoColab
            }]);
            setNombreColab("");
            setCorreoColab("");
            setBuscarColab("")
            setAlertMostrar(true);
            setAlertType("success");
            setAlertMessage("Colaborador agregado correctamente");
            return;
        } else{
            listaColab = listaColab.sort((a, b) => a.id - b.id);
            let last = listaColab[listaColab.length - 1]
            let id_last = Number(last.id) + 1;
            let id_new = id_last.toString();
            setListaColab([...listaColab, {
                id: id_new,
                nombre: nombreColab, 
                correo: correoColab 
            }]);
            setNombreColab("");
            setCorreoColab("");
            setBuscarColab("")
            setAlertMostrar(true);
            setAlertType("success");
            setAlertMessage("Colaborador agregado correctamente");
            return;
        }
    }

    const capturaNombre = (e) => {
        setNombreColab(e.target.value);
    }

    const capturarCorreo = (e) => {
        setCorreoColab(e.target.value);
    }

    const capturaBuscar = (e) => {
        setBuscarColab(e.target.value)

    }

    const eliminarColab = (colab) => {
        const listaFiltrada = listaColab.filter(el => el.nombre !== colab.nombre)
        setListaColab(listaFiltrada)
    } 

    const filtro = listaColab.filter((colab) => (colab.nombre.toUpperCase().includes(buscarColab.toUpperCase()) || colab.correo.toUpperCase().includes(buscarColab.toUpperCase())));

    return (
        <div className='container'>
            <div className="d-flex justify-content-between p-2">
                <h3 className="text-light">Buscador de colaboradores</h3>
                <form>
                    <input className="form-control" id="filtro" name="filtro" placeholder="Buscar un colaborador" value={buscarColab} onChange={capturaBuscar} />
                </form>
            </div>
            <Alert className='mt-2' show={alertMostrar} variant={alertType}>
                {alertMessage}
            </Alert>
            <form onSubmit={agregarColaborador}>
                <label htmlFor='nombre'>Nombre del colaborador</label>
                <input type="text" className="form-control" id="nombre" name="nombre" placeholder='Ingresa el nombre del colaborador' value={nombreColab} onChange={capturaNombre} />
                <label htmlFor='correo'>Correo del colaborador</label>
                <input type="text" className="form-control" id="correo" name="correo" placeholder='Ingresa correo del colaborador' value={correoColab} onChange={capturarCorreo} />
                <button type="submit" className="btn btn-primary mt-3">Agregar colaborador</button>
            </form>
            <hr />
            <h1>Listado de colaboradores</h1>
            <table className="table table-striped justify-content-between">
                <tbody>
                    <tr className='tabla'>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    {(buscarColab === "") ? listaColab.map((colab, index) =>
                        <tr key={index}>
                            <td>{colab.nombre}</td>
                            <td>{colab.correo}</td>
                            <td><button className='btn btn-danger' onClick={() => eliminarColab(colab)}>Borrar colaborador</button></td>
                        </tr>) : filtro.map((colab, index) =>
                        <tr key={index}>
                            <td>{colab.nombre}</td>
                            <td>{colab.correo}</td>
                            <td><button className='btn btn-danger' onClick={() => eliminarColab(colab)}>Borrar colaborador</button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Formulario;