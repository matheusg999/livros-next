

import styles from './styles.module.css'; 
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ControleLivro } from '../classes/controle/ControleLivros'; 
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro'; 


const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = (props: { livro: Livro; excluir: (id: string) => void }) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <div className="d-flex flex-column">
                    <strong>{livro.titulo}</strong>
                    <button 
                        onClick={() => livro._id && excluir(livro._id)} 
                        className="btn btn-danger mt-2" 
                    >
                        Excluir
                    </button>
                </div>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul className="list-unstyled">
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};
  
const LivroLista = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            controleLivros.obterLivros().then((dados) => {
                setLivros(dados);
                setCarregado(true);
            });
        }
    }, [carregado]);

    const excluir = (id: string) => {
        controleLivros.excluir(id).then(() => {
            setCarregado(false); 
        });
    };

    return (
        <main className="container my-4">
            <h1 className="mb-4">Catálogo de Livros</h1>
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th className="col-2">Título</th>
                        <th className="col-6">Resumo</th>
                        <th className="col-2">Editora</th>
                        <th className="col-2">Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro._id || Math.random()} 
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};
  
  export default LivroLista;
  