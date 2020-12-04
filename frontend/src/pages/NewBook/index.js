import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api'

export default function NewBook() {
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');
    const [price, setPrice ] = useState('');

    const libraryId = localStorage.getItem('libraryId');

    const history = useHistory();

    async function handleNewBook(e){
        e.preventDefault();
        const data = {
            title,
            description,
            price
        };

        try {
            await api.post('books', data, {
                headers: {
                    Authorization: libraryId,
                }
            })

            alert('O livro foi cadastrado!')
            history.push('/profile');
        } catch ( err ) {
            alert('Erro ao cadastrar livro, tente novamente');
        }
    }
    
    return(
        <div className="new-book-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Alexandria" />
                    <h1>Cadastrar novo livro</h1>
                    <p>Descreva o livro de uma forma que os leitores queiram ler!</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                
                </section>

                <form onSubmit={handleNewBook}>
                    <input 
                        placeholder="Título do livro"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Preço em reais"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>
            
                </form>
            </div>
        </div>
    );
}