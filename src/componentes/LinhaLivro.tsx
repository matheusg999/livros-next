import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro'; 


const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: number) => void; 
}


export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <div className="d-flex flex-column">
                    <strong>{livro.titulo}</strong>
                    <button 
                        onClick={() => excluir(livro.codEditora)} 
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
