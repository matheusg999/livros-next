import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros'; // Ajuste o caminho conforme necessário

const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const livros = controleLivro.obterLivros();
            res.status(200).json(livros);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } else if (req.method === 'POST') {
        try {
            const livroData = req.body;
            controleLivro.incluir(livroData);
            res.status(200).json({ message: 'Livro incluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao incluir livro' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};

export { controleLivro };