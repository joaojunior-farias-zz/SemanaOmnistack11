import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../service/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function HandleRegisterNewIncident(e) {
        e.preventDefault();

        const data = { title, description, value };

        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            alert(`Incident: ${response.data.title} cadastrado com Sucesso.`);

            history.push('/profile');

        } catch (err) {
            alert('Error ao cadastra novo incidente, tente novamente.')
        }

    }

    return (
        <div className="new-incident-container ">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Volta para home</Link>


                </section>

                <form onSubmit={HandleRegisterNewIncident}>
                    <input placeholder="Tḯtulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}