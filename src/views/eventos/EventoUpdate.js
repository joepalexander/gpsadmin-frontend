import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormRuta';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const GET_RUTA = gql`
    query getRuta($id:ID!){
        getSingleRuta(id:$id){
            _id
            fecha_salida
            fecha_cita
            cliente{
                _id
                nombre
            }
            origen{
                _id
                nombre
            }
            destino{
                _id
                nombre
            }
            linea_transporte{
                _id
                nombre
            }
            operador{
                _id
                nombre
                apellido_paterno
                apellido_materno
            }
            camion{
                _id
                descripcion
            }
            caja{
                _id
                descripcion
            }
            equipo_gps{
                _id
                descripcion
            }
        }
    }
`;

const UPDATE_RUTA = gql`
    mutation updateRuta($id:ID!, $data:RutaInputUpdate!){
        updateOneRuta(id:$id, data:$data){
            _id
        }
    }
`;

const ALL_USERS =  gql`
    query getAllUsers{
        getUsers{
            _id
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
        }
    }
`;

const ALL_CLIENTES =  gql`
    query getAllClientes($nombre:String!){
        getSearchCliente(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const GET_LINEAS_TRANSPORTE =  gql`
    query getAllLineaTransporte($nombre:String!){
        getSearchLineaTransporte(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const CREATE_USER = gql`
    mutation createUser($data:UserInput!){
        createNewUser(data:$data){
            _id
        }
    }
`;

const CREATE_RUTA = gql`
    mutation createRuta($data:RutaInput!){
        createNewRuta(data:$data){
            _id
        }
    }
`;

const GET_UBICACION_ORIGEN =  gql`
    query searchUbicacionOrigen($nombre:String!){
        getSearchUbicacion(nombre:$nombre){
            _id
            nombre
        }
    }
`;

const GET_OPERADORES =  gql`
    query searchOperador($nombre:String!){
        getSearchOperador(nombre:$nombre){
            _id
            nombre
            apellido_paterno
            apellido_materno
        }
    }
`;

const GET_CAMIONES =  gql`
    query searchCamion($descripcion:String!){
        getSearchCamion(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

const GET_CAJAS =  gql`
    query searchCaja($descripcion:String!){
        getSearchCaja(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

const GET_EQUIPOS_GPS =  gql`
    query searchEquipoGps($descripcion:String!){
        getSearchEquipoGps(descripcion:$descripcion){
            _id
            descripcion
        }
    }
`;

const typeheadstyle = {
    "font-size": '0.8rem',
    "border-radius": '10rem',
    padding: '1.5rem 1rem',
}

const typeheadstyle2 = {
    padding: '0 0',
    border: '0 !important'
}

const typeheadstyle3 = {
    border: '0 !important'
}

function EventoUpdate({match, history})  {
    const [ getUsers ] = useMutation(ALL_USERS);
    const [ getClientes ] = useMutation(ALL_CLIENTES);
    const [ getLineasTransporte ] = useMutation(GET_LINEAS_TRANSPORTE);
    const [ getUbicacionOrigen ] = useMutation(GET_UBICACION_ORIGEN);
    const [ getOperador ] = useMutation(GET_OPERADORES);
    const [ getCamion ] = useMutation(GET_CAMIONES);
    const [ getCaja ] = useMutation(GET_CAJAS);
    const [ getEquipoGps ] = useMutation(GET_EQUIPOS_GPS);
    const [ sendUser ] = useMutation(CREATE_USER);
    const [ sendRuta ] = useMutation(CREATE_RUTA);
    const [optionsCliente, setOptionsCliente] = useState([{id:"5e9bc189912d97481ba86c39", nombre:"MIKE MARRTINEZ BAUTISTA"}]);
    const [optionsOrigen, setOptionsOrigen] = useState([]);
    const [optionsDestino, setOptionsDestino] = useState([]);
    const [optionsLineasTransporte, setOptionsLineasTransporte] = useState([]);
    const [optionsOperador, setOptionsOperador] = useState([]);
    const [optionsCamion, setOptionsCamion] = useState([]);
    const [optionsCaja, setOptionsCaja] = useState([]);
    const [optionsEquipoGps, setOptionsEquipoGps] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState([{id:"5e9bc189912d97481ba86c39", nombre:"MIKE MARRTINEZ BAUTISTA"}]);
    const [selectedOrigen, setSelectedOrigen] = useState([]);
    const [selectedDestino, setSelectedDestino] = useState([]);
    const [selectedLineasTransporte, setSelectedLineasTransporte] = useState([]);
    const [selectedOperador, setSelectedOperador] = useState([]);
    const [selectedCamion, setSelectedCamion] = useState([]);
    const [selectedCaja, setSelectedCaja] = useState([]);
    const [selectedEquipoGps, setSelectedEquipoGps] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('06:00');

    const onHandleSearchClientes = async (query) => {
        if(query.length >= 3){
            setOptionsCliente([]);
            try {
                const { data, errors } = await getClientes({variables:{nombre:query}});
                if (data) {
                    // LLenamos options
                    if(Array.isArray(data.getSearchCliente)){
                        const searchResults = data.getSearchCliente.map((i) => ({
                            id : i._id,
                            nombre : i.nombre
                        }));
                        setOptionsCliente(searchResults);
                    } else {
                        const searchResult = [{
                            id : data.getSearchCliente._id,
                            nombre : data.getSearchCliente.nombre
                        }];
                        setOptionsCliente(searchResult);
                    }
                }
                if (errors) {
                    setOptionsCliente([]);
                }
            } catch (e) {
                setOptionsCliente([]);
            }
        }
    };

    const onHandleSearchLineasTransporte = async (query) => {
        if(query.length >= 3){
            setOptionsCliente([]);
            try {
                const { data, errors } = await getLineasTransporte({variables:{nombre:query}});
                if (data) {
                    // LLenamos options
                    const searchResults = data.getSearchLineaTransporte.map((i) => ({
                        id : i._id,
                        nombre : i.nombre
                    }));
                    handleInputOptions('linea_transporte', searchResults);
                }
                if (errors) {
                    setOptionsLineasTransporte([]);
                }
            } catch (e) {
                setOptionsLineasTransporte([]);
            }
        }
    };

    const onHandleSearchOrigen = async (query) => {
        if(query.length >= 5){
            handleInputOptions('origen', []);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                    }));
                    handleInputOptions('origen', searchResults);
                }
            }
        }
    };

    const onHandleSearchDestino = async (query) => {
        if(query.length >= 5){
            handleInputOptions('destino', []);
            const { data } = await getUbicacionOrigen({variables:{nombre:query}});
            if (data) {
                if (data.errors) console.log(data.errors); 
                // LLenamos options
                if(data.getSearchUbicacion){
                    const searchResults = data.getSearchUbicacion.map((i) => ({
                        id : i._id,
                        nombre : i.nombre
                    }));
                    handleInputOptions('destino', searchResults);
                }
            }
        }
    };

    const onHandleSearchOperador = async (query) => {
        if(query.length >= 5){
            handleInputOptions('operador', []);
            const { data, errors } = await getOperador({variables:{nombre:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchOperador){
                    const searchResults = data.getSearchOperador.map((i) => ({
                        id : i._id,
                        nombre : i.nombre,
                        apellido_paterno : i.apellido_paterno,
                        apellido_materno : i.apellido_materno
                    }));
                    handleInputOptions('operador', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchCamion = async (query) => {
        if(query.length >= 5){
            handleInputOptions('camion', []);
            const { data, errors } = await getCamion({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchCamion){
                    const searchResults = data.getSearchCamion.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('camion', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchCaja = async (query) => {
        if(query.length >= 5){
            handleInputOptions('caja', []);
            const { data, errors } = await getCaja({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchCaja){
                    const searchResults = data.getSearchCaja.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('caja', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleSearchEquipoGps = async (query) => {
        if(query.length >= 5){
            handleInputOptions('equipo_gps', []);
            const { data, errors } = await getEquipoGps({variables:{descripcion:query}});
            if (data) { 
                // LLenamos options
                if(data.getSearchEquipoGps){
                    const searchResults = data.getSearchEquipoGps.map((i) => ({
                        id : i._id,
                        descripcion : i.descripcion
                    }));
                    handleInputOptions('equipo_gps', searchResults);
                }
            }
            if (errors) console.log(data.errors); 
        }
    };

    const onHandleTypeahead = (name, value) => {
        switch (name) {
            case 'cliente':
                setSelectedCliente(value);
                break;
            case 'origen':
                handleInputSelected('origen', value);
                break;
            case 'destino':
                handleInputSelected('destino', value);
                break;
            case 'linea_transporte':
                handleInputSelected('linea_transporte', value);
                break;
            case 'operador':
                handleInputSelected('operador', value);
                break;
            case 'camion':
                handleInputSelected('camion', value);
                break;
            case 'caja':
                handleInputSelected('caja', value);
                break;
            case 'equipo_gps':
                handleInputSelected('equipo_gps', value);
                break;
        
            default:
                break;
        }
    };

    const handleInputFechaSalida = (date) =>{
        handleInputChange('fecha_salida', date);
    };

    const handleChangeFechaCita = (date) =>{
        handleInputChange('fecha_cita', date);
    };

    const [ updateRuta ] = useMutation(UPDATE_RUTA);

    const { id } = match.params
    const { data, loading } = useQuery(GET_RUTA, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateRuta({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors); 
            history.push('/');
        }
    };
    const multiple = false;

    const {
        inputs,
        handleInputChange,
        handleInputOptions,
        handleSubmit,
        handleInputSelected,
        options,
        selected
    } = useForm(catchData, data);

    return (
        <>
        <Layout title="Crear un Nuevo Usuario" >
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Evento</h1>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="cliente"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.cliente}
                                    placeholder="Selecciona el cliente..."
                                    selected={selected.cliente}
                                    //className="form-control form-control-user"
                                    searchText="Buscando clientes..."
                                    onInputChange={onHandleSearchClientes}
                                    onChange={(value)=>onHandleTypeahead('cliente', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                    <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="origen"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.origen}
                                    placeholder="Selecciona el origen..."
                                    selected={selected.origen}
                                    //className="form-control form-control-user"
                                    searchText="Buscando origen..."
                                    onInputChange={onHandleSearchOrigen}
                                    onChange={(value)=>onHandleTypeahead('origen', value)}
                                    />
                            </div>
                            <div className="col-sm-6">
                                <Typeahead 
                                    filterBy={(option, props) => {return true;}}
                                    id="destino"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.destino}
                                    placeholder="Selecciona el destino..."
                                    selected={selected.destino}
                                    //className={"form-control form-control-user"}
                                    searchText="Buscando destino..."
                                    onInputChange={onHandleSearchDestino}
                                    onChange={(value)=>onHandleTypeahead('destino', value)}
                                    />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={inputs.fecha_salida}
                                onChange={handleInputFechaSalida}
                                name="fecha_salida"
                                flaceholderText="Fecha de salida"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Hora"
                                dateFormat="d/MM/yyyy h:mm"
                                minDate={new Date()}
                                />
                            </div>
                            <div className="col-sm-6">
                            <DatePicker
                                className={"form-control form-control-user"}
                                selected={inputs.fecha_cita}
                                onChange={handleChangeFechaCita}
                                name="fecha_cita"
                                flaceholderText="Fecha de cita"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Hora"
                                dateFormat="d/MM/yyyy h:mm"
                                minDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <Typeahead //style={typeheadstyle}
                                    filterBy={(option, props) => {return true;}}
                                    id="linea_transporte"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.linea_transporte}
                                    placeholder="Selecciona la linea de transporte..."
                                    selected={selected.linea_transporte}
                                    //className="form-control form-control-user"
                                    searchText="Buscando lineas de transportes..."
                                    onInputChange={onHandleSearchLineasTransporte}
                                    onChange={(value)=>onHandleTypeahead('linea_transporte', value)}
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="operador"
                                    labelKey="nombre"
                                    multiple={multiple}
                                    options={options.operador}
                                    placeholder="Selecciona el operador..."
                                    selected={selected.operador}
                                    //className="form-control form-control-user"
                                    searchText="Buscando operadores..."
                                    onInputChange={onHandleSearchOperador}
                                    onChange={(value)=>onHandleTypeahead('operador', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="camion"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.camion}
                                    placeholder="Selecciona el camion..."
                                    selected={selected.camion}
                                    //className="form-control form-control-user"
                                    searchText="Buscando camiones..."
                                    onInputChange={onHandleSearchCamion}
                                    onChange={(value)=>onHandleTypeahead('camion', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                            <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="caja"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.caja}
                                    placeholder="Selecciona el caja..."
                                    selected={selected.caja}
                                    //className="form-control form-control-user"
                                    searchText="Buscando cajas..."
                                    onInputChange={onHandleSearchCaja}
                                    onChange={(value)=>onHandleTypeahead('caja', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group">
                        <Typeahead
                                    filterBy={(option, props) => {return true;}}
                                    id="gps"
                                    labelKey="descripcion"
                                    multiple={multiple}
                                    options={options.equipo_gps}
                                    placeholder="Selecciona el equipo Gps..."
                                    selected={selected.equipo_gps}
                                    //className="form-control form-control-user"
                                    searchText="Buscando equipo Gps..."
                                    onInputChange={onHandleSearchEquipoGps}
                                    onChange={(value)=>onHandleTypeahead('equipo_gps', value)}
                                    inputClassName="notwork"
                                    />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <Link className="btn btn-secondary btn-user btn-block" to="/" >Cancelar</Link>
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <button type="submit" className="btn btn-success btn-user btn-block">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
        </>
    );
}

export default EventoUpdate;