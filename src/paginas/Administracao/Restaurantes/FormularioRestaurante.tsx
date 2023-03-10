import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';


const FormularioRestaurante = () => {

    const paramentros = useParams();

    useEffect(() => {
        if (paramentros.id) {
            http.get<IRestaurante>(`restaurantes/${paramentros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [paramentros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (paramentros.id) {
            http.put(`restaurantes/${paramentros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso")
                })
        }
    }

    return (
        <Box>
            <Container maxWidth='lg' sx={{ marginTop: 1 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">
                            Formulário Restaurante
                        </Typography>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />
                            <Button
                                sx={{ marginTop: 1 }}
                                fullWidth
                                type='submit'
                                variant="outlined"
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default FormularioRestaurante; 