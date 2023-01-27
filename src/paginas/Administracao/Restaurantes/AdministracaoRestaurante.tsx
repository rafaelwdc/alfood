import { TableContainer, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}> 
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<Link to={`/admin/restaurante/${restaurante.id}`}>editar</Link>]
                        </TableCell>
                    </TableRow>)}
                    
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default AdministracaoRestaurantes;