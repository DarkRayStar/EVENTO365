import React, { Component } from 'react';
import AdminService from '../UserServices/AdminService';
import Grid from '@material-ui/core/Grid';

class ListAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all_admin: [],
            currentPage: 1,
            usersPerPage: 5,
            search: ''
        }

        this.addAdmin = this.addAdmin.bind(this);
        this.editAdmin = this.editAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.searchChange = this.searchChange.bind(this);

    }

    changePage = event => {
        //console.log(event,"asdasdwqeqwe")
        this.setState({
            [event.target.name]: parseInt(event.target.value) //without bind
            //currentPage: parseInt(event.target.value)  same
        });
    }

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.all_admin.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.all_admin.length / this.state.usersPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.all_admin.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };



    componentDidMount() {
        AdminService.getAdmins().then((res) => {
            this.setState({ all_admin: res.data });
        });

    }


    searchChange(event) {
        this.setState({
            search: event.target.value
        });

    }

    cancelSearch = () => {
        this.setState({
            search: ''
        });

        AdminService.getAdmins().then((res) => {
            this.setState({
                all_admin: res.data
            });

        });
        this.state.currentPage = 1;

    }

    searchData = () => {
        AdminService.searchAdmin(this.state.search).then((res) => {
            this.setState({
                all_admin: res.data,
                currentPage: 1
            });

        });
    }

    deleteAdmin(id) {

        AdminService.deleteAdmin(id).then(res => {
            this.setState({ admin: this.state.admin.filter(admin => admin.id !== id) });
        });
    }

    confirmation(id) {
        var result = window.confirm("Are you sure to delete?");
        if (result) {
            AdminService.deleteAdmin(id).then(res => {
                this.setState({ admin: this.state.admin.filter(admin => admin.id !== id) });
            });
        }
    }

    viewAdmin(id) {
        this.props.history.push(`/view-admin/${id}`);
    }

    editAdmin(id) {
        this.props.history.push(`/add-admin/${id}`);
    }

    addAdmin() {
        this.props.history.push('/add-admin/_addadmin');
    }

    goToRegAdmin(){
        this.props.history.push('/add-admin/_addadmin')
    }

    logout(){
        this.props.history.push('/admin-login')
    }



    render() {
        const { all_admin, currentPage, usersPerPage, search } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firsIndex = lastIndex - usersPerPage;
        const currentAdmins = all_admin.slice(firsIndex, lastIndex);
        const totalPage = Math.ceil(all_admin.length / usersPerPage);
       

        return (
            <div style={{marginTop:'15px'}}>

                

                <main role="main">
                    <header class="section">
                        <article>
                            <div class="line text-center">
                            <button className="userButtons" onClick={this.goToRegAdmin.bind(this)} style={{width:'40%',borderRadius:'10px',height:'40px',marginRight:'40px'}}>REGISTER NEW ADMIN</button>
                                <button className="userButtons" onClick={this.logout.bind(this)} style={{width:'40%',borderRadius:'10px',height:'40px'}}>LOGOUT</button>
                                <br/> <br/> <br/>
                                
                                <h2 class="text-dark   text-thin text-line-height-1">USER MANAGER</h2>
                                
                                
                                <br/>
                            </div>
                            <Grid container spacing={2} justify="center">
                            <section class="full-width" style={{width:'1400px'}}>

                                <div className="row" >

                                    <ul class="nav nav-tabs nav-justified mb-3 " id="ex1" role="tablist">
                                        <li class="nav-item " role="presentation">
                                            <a
                                                class="nav-link"
                                                id="ex3-tab-1"
                                                data-mdb-toggle="pill"
                                                href="/list-customer"
                                                role="tab"
                                                aria-controls="ex3-pills-1"
                                                aria-selected="false"
                                            >REGISTERED CUSTOMERS</a
                                            >
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a
                                                class="nav-link active"
                                                id="ex3-tab-2"
                                                data-mdb-toggle="pill"
                                                href=""
                                                role="tab"
                                                aria-controls="ex3-pills-2"
                                                aria-selected="true"
                                            >ADMINS</a
                                            >
                                        </li>

                                    </ul>

                                </div>
                                <br></br>

                                <div className="row formDivgg">
                                    <div style={{ background: "#F2F2F2" }}>

                                        <div style={{ "float": "left" }}>
                                            <i class="fa fa-list-alt"> EVENTO 365 USER MANAGEMENT</i>
                                        </div>

                                        <div style={{ "float": "right" }}>
                                            <div className="input-group btn-group-sm " style={{ marginTop: '5px' }}>
                                                <input type="text" style={{ border: 0 }} value={this.state.search} className="form-control" placeholder="Search.." name="search"
                                                     onChange={this.searchChange} />

                                                <div className="input-group-append btn-group-sm">
                                                    <button className="btn btn-outline-success" style={{ width: '35px' }} onClick={this.searchData}>
                                                        <i class="fa fa-search"></i>

                                                    </button>
                                                    <button className="btn btn-outline-danger" style={{ width: '35px' }} onClick={this.cancelSearch}>
                                                        <i class="fa fa-close">🗘</i>

                                                    </button>

                                                </div>
                                            </div>


                                        </div>
                                        <br /><br />
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th> Name</th>
                                                <th> Email</th>
                                                <th> Address</th>
                                                <th> NIC</th>
                                                <th> Birthday</th>
                                                <th> Mobile</th>
                                                <th> Gender</th>
                                                <th> Type</th>
                                                <th> Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentAdmins.length == 0 ? 
                                                <tr align="center">
                                                    <td colSpan="6">No Entries Available</td>
                                                </tr> :
                                                currentAdmins.map(
                                                    admin =>
                                                        <tr key={admin.id}>
                                                            <td>{admin.name}</td>
                                                            <td>{admin.email}</td>
                                                            <td>{admin.address}</td>
                                                            <td>{admin.nic}</td>
                                                            <td>{admin.birthday}</td>
                                                            <td>{admin.mobile}</td>
                                                            <td>{admin.gender}</td>
                                                            <td>{admin.admin_type}</td>
                                                            <td>
                                                                <div class="btn-group" role="group" >
                                                                    <button onClick={() => this.editAdmin(admin.id)} className="userButtons" style={{ width: '80px', height: '35px', marginRight: '5px' }}>Update</button>
                                                                    <button onClick={() => this.viewAdmin(admin.id)} className="userButtons" style={{ width: '80px', height: '35px', marginRight: '5px' }}>View</button>
                                                                    <button onClick={() => this.confirmation(admin.id)} className="userButtons" style={{ width: '80px', height: '35px', marginRight: '5px' }}>Delete</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <tfoot >
                                        <div style={{ "float": "left" }}>
                                            Showing Page {currentPage} of {totalPage}
                                        </div>
                                        <div style={{ "float": "right" }}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <button className="btn" disabled={currentPage === 1 ? true : false}
                                                        onClick={this.firstPage}>
                                                        <i class="fa fa-backward"> First</i>

                                                    </button>
                                                    <button className="btn" disabled={currentPage === 1 ? true : false}
                                                        onClick={this.prevPage}>
                                                        <i class="fa fa-step-backward"> Prev</i>

                                                    </button>
                                                </div>
                                                <input type="text" name="currentPage" className="form-control" style={{ width: "50px" }} value={currentPage}
                                                    onChange={this.changePage} />

                                                <div className="input-group-append">
                                                    <button className="btn" disabled={currentPage === totalPage ? true : false}
                                                        onClick={this.nextPage}>
                                                        <i class="fa fa-step-forward"> Next</i>

                                                    </button>
                                                    <button className="btn" disabled={currentPage === totalPage ? true : false}
                                                        onClick={this.lastPage}>
                                                        <i class="fa fa-forward"> Last</i>

                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </tfoot>
                                </div>

                            </section>
                            </Grid>

                        </article>
                    </header>
                </main>





            </div>
        );
    }
}

export default ListAdminComponent;