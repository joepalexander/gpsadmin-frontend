import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Layout from '../../common/Layout';
import useForm from '../../hooks/useFormLineaTransporte';
import authHOC from '../../utils/authHOC';

const GET_LINEA_TRANSPORTE = gql`
    query getLineaTransporte($id:ID!){
        getSingleLineaTransporte(id:$id){
            nombre
            contacto
            email
            telefono
            celular
            cp
            direccion
            georeferenciax
            georeferenciay
        }
    }
`;

const UPDATE_LINEA_TRANSPORTE = gql`
    mutation updateLineaTransporte($id:ID!, $data:LineaTransporteInputUpdate!){
        updateOneLineaTransporte(id:$id, data:$data){
            _id
        }
    }
`;

function LineaTransporteUpdate({ match, history })  {
    const [ updateLineaTransporte ] = useMutation(UPDATE_LINEA_TRANSPORTE);
    const { id } = match.params
    const { data, loading } = useQuery(GET_LINEA_TRANSPORTE, {variables:{id}});

    const catchData = async (inputs) => {
        const { data } = await updateLineaTransporte({variables:{id:match.params.id, data:{...inputs}}});
        if (data) {
            if (data.errors) console.log(data.errors);
            window.location.href = "/lineastrasporte";
        }
    };

    const {
        inputs,
        handleInputChange,
        handleSubmit
    } = useForm(catchData, data);

    if(loading) return <h2>Cargando....</h2>

    return (
    <>
    <Layout title="Actualiza Cliente" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Actualizar Datos Línea de Transporte</h1>
        </div>
        <div className="row">
            <div className="col-lg-12 col-md-10 mx-auto">
                <form className="user" onSubmit={handleSubmit}>
                    <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.nombre?inputs.nombre:''} className="form-control form-control-user" name="nombre" placeholder="Nombre Línea de Tranporte" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.contacto?inputs.contacto:''} className="form-control form-control-user" name="contacto" placeholder="Nombre del contacto" required={true} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.email?inputs.email:''} className="form-control form-control-user" name="email" placeholder="Correo electrónico" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.telefono?inputs.telefono:''} className="form-control form-control-user" name="telefono" placeholder="Teléfono" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.celular?inputs.celular:''} className="form-control form-control-user" name="celular" placeholder="Celular" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.cp?inputs.cp:''} className="form-control form-control-user" name="cp" placeholder="C.P." required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciax?inputs.georeferenciax:''} className="form-control form-control-user" name="georeferenciax" placeholder="X" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.georeferenciay?inputs.georeferenciay:''} className="form-control form-control-user" name="georeferenciay" placeholder="Y" required={false} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleInputChange}  value={inputs.direccion?inputs.direccion:''} className="form-control form-control-user" name="direccion" placeholder="Dirección" required={false} />
                        </div>
                    <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <Link className="btn btn-secondary btn-user btn-block" to="/lineastrasporte" >Cancelar</Link>
                        </div>
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <button type="submit" id="createUser" className="btn btn-success btn-user btn-block">
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
};

export default authHOC(LineaTransporteUpdate);