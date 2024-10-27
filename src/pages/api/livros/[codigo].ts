import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;

    if (req.method === 'DELETE') {
        try {
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir livro' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};
