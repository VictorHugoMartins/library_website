import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api.js';

import './styles.css';
// import { useEffect } from 'react/cjs/react.production.min';

export default function Profile() {
    const [books, setBooks] = useState([]);
    const libraryName = localStorage.getItem('libraryName');
    const libraryId = localStorage.getItem('libraryId');

    const history = useHistory();

    useEffect(() => {
        try{
            api.get('profile', {
                headers: {
                    Authorization: libraryId,
                }
            }).then(response => {
                console.log(response.data);
                setBooks(response.data);
            })
        } catch (err ){
            alert("Erro ao carregar livros!");
        }
    }, [libraryId]);

    async function handleDeleteBook(id){
        try {
            await api.delete(`books/${id}`, {
                headers: {
                    Authorization: libraryId,
                }
            });

            alert("O livro foi apagado dos registros!")
            setBooks(books.filter(book => book.id !== id));
        } catch (err ){
            alert("Erro ao deletar livro!");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/'); // volta pra onde tava antes
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Biblioteca de Alexandria"/>
                <span>Bem vinda, {libraryName}!</span>
            
                <Link className="button" to='/books/new'>Cadastrar novo livro</Link>
            
                <button type="button" onClick={handleLogout} >
                    <FiPower size={18} color="#E02041"/>
                </button>

            </header>

            <h1>Livros cadastrados</h1>
            <ul>
                { books.map(book => (
                    <li key={book.id} >
                        <strong>LIVRO:</strong>
                        <p>{book.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{book.description}</p>

                        <strong>PREÇO:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</p>

                        <button type="button" onClick={() => handleDeleteBook(book.id)}>
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}