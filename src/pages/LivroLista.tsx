

import styles from './styles.module.css'; 
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro'; 

const baseURL = 'http://localhost:3000/api/livros';

const LivroLista = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    const obterLivros = async () => {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    };

    const excluirLivro = async (codigo: number) => {
        const response = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE',
        });
        return response.ok;
    };

    useEffect(() => {
        obterLivros().then((data) => {
            setLivros(data);
            setCarregado(true);
        });
    }, []);

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            setLivros(livros.filter((livro) => livro.codigo !== codigo));
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1 className={styles.title}>Lista de Livros</h1>
                {carregado ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Resumo</th>
                                <th>Editora</th>
                                <th>Autores</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro) => (
                                <LinhaLivro 
                                    key={livro.codigo} 
                                    livro={livro} 
                                    excluir={excluir} 
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando livros...</p>
                )}
            </main>
        </div>
    );
};

export default LivroLista;
