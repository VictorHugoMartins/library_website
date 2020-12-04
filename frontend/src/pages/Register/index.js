import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiRefreshCcw } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css'

export default function Register() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const [ errorStatus, setErrorStatus ] = useState('');
    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    const history = useHistory();

    function testEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleRegister(e) {
        e.preventDefault();
        
        setLoadingSubmit(true);
        if (name === '') {
            setErrorStatus('411');
            setLoadingSubmit(false);
            return;
        } else if (email === '') {
            setErrorStatus('412');
            setLoadingSubmit(false);
            return;
        } else if (email === '') {
            setErrorStatus('411');
            setLoadingSubmit(false);
            return;
        } else if (email === '') {
            setErrorStatus('411');
            setLoadingSubmit(false);
            return;
        }
        const validate = testEmail(email);
        if(!validate) {
            setErrorStatus('417');
            setLoadingSubmit(false);
            return;
        }

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        console.log(data);

        try {
            const response = await api.post('libraries', data);
            alert(`Seu id de acesso: ${response.data.id}`);
            history.push('/');
        } catch ( err ) {
            alert("Erro no cadastro, tente novamente.");
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Alexandria" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a se encontrarem com seus novos livros favoritos!</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da biblioteca"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}/>
                    
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}/>
                        <input
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{width: 80 }} />
                    </div>

                    <button className="button" type="submit">
                        {
                            loadingSubmit === true ? (
                                <FiRefreshCcw size={22} color="#fff" className="loading-sign" />
                            ) : 'Cadastrar'
                        }
                    </button>
            
                </form>
            </div>
        </div>
    );
}