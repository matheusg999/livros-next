import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';


export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { codEditora } = req.query;

        try {
            const nomeEditora = controleEditora.getNomeEditora(Number(codEditora));
            if (nomeEditora) {
                res.status(200).json({ nome: nomeEditora });
            } else {
                res.status(404).json({ message: 'Editora não encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
};
