import React, { useState } from 'react';
import authenticate from '../utils/authenticate';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

function NavBar(){
    const {isAuthenticated, payload} = authenticate();
    const [isUserOpen, setIsUserOpen] = useState(false);

    const toggleUser = (e) => {
        e.preventDefault();
        setIsUserOpen(!isUserOpen);
    };
    
    return (
        <>
            <ul className="navbar-nav ml-auto">
                {/*  Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                <a className="nav-link dropdown-toggle" href="#dropdown" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw"></i>
                </a>
                {/*  Dropdown - Messages */}
                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
                </li>

                {/*  Nav Item - Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                {/* <a className="nav-link dropdown-toggle" href="#alertsDropdown" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a> */}
                {/*  Dropdown - Alerts */}
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                    Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#a">
                    <div className="mr-3">
                        <div className="icon-circle bg-primary">
                        <i className="fas fa-file-alt text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#b">
                    <div className="mr-3">
                        <div className="icon-circle bg-success">
                        <i className="fas fa-donate text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#c">
                    <div className="mr-3">
                        <div className="icon-circle bg-warning">
                        <i className="fas fa-exclamation-triangle text-white"></i>
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending for your account.
                    </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#d">Show All Alerts</a>
                </div>
                </li>

                {/*  Nav Item - Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                {/* <a className="nav-link dropdown-toggle" href="#d" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-envelope fa-fw"></i>
                    <span className="badge badge-danger badge-counter">7</span>
                </a> */}
                {/*  Dropdown - Messages */}
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">
                    Message Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#e">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                        <div className="status-indicator bg-success"></div>
                    </div>
                    <div className="font-weight-bold">
                        <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#f">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                        <div className="status-indicator"></div>
                    </div>
                    <div>
                        <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                        <div className="small text-gray-500">Jae Chun · 1d</div>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#g">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                        <div className="status-indicator bg-warning"></div>
                    </div>
                    <div>
                        <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#h">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                        <div className="status-indicator bg-success"></div>
                    </div>
                    <div>
                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                    </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#i">Read More Messages</a>
                </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/*  Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" onClick={toggleUser} href="#menuUser" >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ isAuthenticated ? payload.nombre: 'Iniciar Sesión'}</span>
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="Perfil" />
                    </a>
                {/*  Dropdown - User Information */}
                    <Collapse isOpen={isUserOpen} className="dropdown-menu dropdown-menu-right shadow animated--grow-in">
                        <Link className="dropdown-item" to="/profile">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Perfil
                        </Link>
                        <Link className="dropdown-item" to="/settings">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Configuración
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/logout">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Cerrar Sesión
                        </Link>
                    </Collapse>
                </li>

            </ul>
        </>
    );
}

export default NavBar;