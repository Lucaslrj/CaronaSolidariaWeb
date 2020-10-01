import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3001/users'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir!'
}

const initialState = {
    user: {name: '', numero: '', endereço: '', endereçochegada: '', horario: ''},
    list:[]
}

export default class UserCrud extends Component{
    render(){
        return(
            <Main { ...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
    state = {... initialState}

componentWillMount(){
    axios(baseUrl).then(resp => {
        this.setState({list : resp.data})
    })
}

load(user){
    this.setState({user})
}

remove(user){
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        const list = this.state.list.filter(u => u !== user)
        this.setState({list})
    })
}

renderTable(){
    return(
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Numero</th>
                </tr>
            </thead>
            <tbody>
                {this.renderRows()}
            </tbody>
        </table>
    )
}

renderRows(){
    return this.state.list.map(user =>{
        return(
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.numero}</td>
                <td>
                    <button className="btn btn-warning"
                    onClick={()=>this.load(user)}>
                    <i className="fa fa-pencil">Editar</i>
                    </button>

                    <button className="btn btndanger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash">Excluir</i>
                        </button>
                </td>
            </tr>
        )
    })
}
clear(){
    this.setState({user: initialState.user})
}

save(){
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}`: baseUrl
    axios[method](url,user)
        .then(resp => { const list = this.getUpdateList(resp.data)
        this.setState({ user: initialState.user, list})
    })
    alert("Cadastro Salvo com Sucesso")
}

getUpdateList(user){
    const list = this.state.list.filter(u => u.id !== user.id)
    list.unshift(user)
    return list
}

updateField(event){
    const user = { ... this.state.user}
    user[ event.target.name] = event.target.value
    this.setState({user})
}

renderForm(){
    return(
        <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome... " />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Numero</label>
                        <input type="text" className="form-control"
                            name="numero"
                            value={this.state.user.numero}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Numero ..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Endereço de Saída</label>
                        <input type="text" className="form-control"
                            name="endereço"
                            value={this.state.user.endereço}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Endereço de Saída ..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Endereço de Chegada</label>
                        <input type="text" className="form-control"
                            name="endereçochegada"
                            value={this.state.user.endereçochegada}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Endereço de Chegada ..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Horário de Saída</label>
                        <input type="text" className="form-control"
                            name="horario"
                            value={this.state.user.horario}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o Horário de Saída ..." />
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 d-fex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.save(e)}>Salvar</button>

                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
}