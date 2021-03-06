import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (err){
            alert('Erro');
        };
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça Login</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register"><FiLogIn size={16} color="red"/>Não tenho cadastro</Link>
                </form>

            </section>
            <img src={heroes} alt="Heroes" />

        </div>
    )
}