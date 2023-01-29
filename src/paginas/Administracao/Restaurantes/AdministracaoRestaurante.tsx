import { Button, TableContainer, Paper, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import TableBody from '@mui/material/TableBody';
import { Link as RouterLink } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    useEffect(() => {
        http.get('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<RouterLink to={`/admin/restaurantes/${restaurante.id}`}>editar</RouterLink>]
                        </TableCell>
                        <TableCell>
                            <Button
                                onClick={() => excluir(restaurante)}
                                variant="outlined"
                                color="error"
                            >
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;