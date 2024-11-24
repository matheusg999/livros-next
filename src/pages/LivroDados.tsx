import styles from './styles.module.css'; 
import { useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { useRouter } from 'next/router';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { ControleLivro } from '../classes/controle/ControleLivros'; 
import { Livro } from '../classes/modelo/Livro';

const controleLivros = new ControleLivro(); 
const controleEditora = new ControleEditora();

export const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome,
    }));

    const router = useRouter();

   
    const incluir = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const livro = new Livro(codEditora, titulo, resumo, autores.split('\n'), '');
        controleLivros.incluir(livro).then(() => {
            
            router.push('/LivroLista');
        });
    };

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    return (
        <div className={`container ${styles.container}`}>
            <Head>
                <title>Cadastro de Livros</title>
            </Head>
            <Menu />
            <main className="mt-5">
                <h1 className="text-center mb-4">Cadastrar Livro</h1>
                <form onSubmit={incluir} className="bg-light p-4 rounded shadow-sm">
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea
                            className="form-control"
                            id="resumo"
                            rows={3}
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores</label>
                        <textarea
                            className="form-control"
                            id="autores"
                            rows={2}
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editora" className="form-label">Editora</label>
                        <select
                            id="editora"
                            className="form-select"
                            value={codEditora}
                            onChange={tratarCombo}
                        >
                            {opcoes.map(editora => (
                                <option key={editora.value} value={editora.value}>
                                    {editora.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Salvar</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;
