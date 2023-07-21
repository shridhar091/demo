import React from "react"
import { Link, Route, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "../helper/PrivateRoute"
import Home from './Home'
import RegistrationForm from "./register"
import Login from "./login"
import DashBoard from "./DashBoard"
import jwt_decode from "jwt-decode";
import Account from "./Account"
import Setting from "./Setting"
import Map from "./Map"
import { useSelector } from "react-redux"
import Booking from "./Booking"
import StaffDashBoard from "./staff/StaffDashBoard"


const Navbar = (props) => {
    let token = localStorage.getItem('token')
    let tokendata
    if (token) {
        tokendata = jwt_decode(token)
    }


    const userInfo = useSelector((state) => { return state.user.data })
    console.log(userInfo);
    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                {token && tokendata.role === 'admin' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EV CHARGER</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/dashboard'>DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/account'>Account</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/setting'>Setting</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }
                                        }}>LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}
                {token && tokendata.role === 'staff' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EV CHARGER</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/dashboard'>DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/logout'
                                            onClick={(e) => {
                                                const confirm = window.confirm('Are You Sure')
                                                if (confirm) {
                                                    localStorage.clear()
                                                    props.history.push('/login')
                                                }
                                            }}>LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                    )}

                {token && tokendata.role === 'Customer' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EV CHARGER</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/map'>Map</Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link className="nav-link active" aria-current="page" to='/booking'>Booking</Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to='/'>Setting</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }
                                        }}>LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}
                {
                    !token &&
                    <div className="container-fluid">
                        <span className="navbar-brand" href="#">EV CHARGER</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/register'>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/login'>Login</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </nav>
            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={RegistrationForm} />
            <Route path='/login'
                render={(props) => (
                    <Login {...props} />
                )} />

            {token && tokendata.role === 'admin' && <div><PrivateRoute path='/dashboard' component={DashBoard} />
                <PrivateRoute path='/account' component={Account} />
                <PrivateRoute path='/setting' component={Setting} />
            </div>}
            {token && tokendata.role === 'Customer' && <div><PrivateRoute path='/map' component={Map} />
                    <PrivateRoute path='/booking' component={Booking} />
            </div>
            }
            {token && tokendata.role === 'staff' && <div><PrivateRoute path='/dashBoard' component={StaffDashBoard} />
            </div>
            }
        </div >
    )
}
export default withRouter(Navbar)