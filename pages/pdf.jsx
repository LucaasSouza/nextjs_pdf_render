//React Imports e axios
import axios from 'axios';
import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
//Mui Materials Import
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
//MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

export default function PDF(){
    const zoomPluginInstance = zoomPlugin() //Instância do plugin de zoom
    const { Zoom } = zoomPluginInstance

    const [size, setSize] = useState(1.5) //Controla a escala do viewer
    const [pdf, setPDF] = useState('') //State que inicialmente é vazio, mas após o primeiro request teste, armazena a url de um dos pdf's acima
    const [url, setURL] = useState([ //State que armazena os links 'base'
        'https://araucariageneticabovina.com.br/arquivos/servico/pdfServico_57952bf8ca7af_24-07-2016_17-58-32.pdf',
        'https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf',
        'https://www.ufms.br/wp-content/uploads/2017/09/PDF-teste.pdf',
        'https://www.corenpr.gov.br/portal/images/stories/testepdf2.pdf'
    ])

    function CarregarPDF(link) { 
        if(link === null){
            const randomNum = Math.floor(Math.random() * url.length) //Gera um número aleatório para escolher uma dos pdf's do array
            setPDF(url[randomNum]) //Atualiza o state do path do pdf
        }else{
            setPDF(link)
        }
    }

    async function AdicionarURL(){
        const urlPDF = prompt('Adicione uma nova url:')

        await axios.get('http://localhost:3000/api/showPDF?url=' + urlPDF) //Faz o get com a url inserida, para verificar se é um link de pdf válido
        .then((res) => {
            setURL((prevTasks) => { return [ ...prevTasks, urlPDF ] }) //Caso seja válido, ele adiciona ao state
        })
        .catch((err) => {
            alert('URL inválida') //Caso seja inválido, é retornado um alert
        })
    }

    const handleClose = () => { //Limpa o state 'pdf', fechando o modal e o conteúdo nele
        setPDF('')
        setSize(1.5)
    }

    const changeSize = (data, zoom) => { //É passado por parâmetro o método que altera o zoom e a "key" se a ação é zoomIn ou zoomOut
        data.onZoom(zoom)
        setSize(zoom)
    }
    
    return (
        <>
            <div style={{textAlign: 'center'}}>
                <header>
                    <h2>
                        Clique em um link para renderizá-lo ou clique para renderizar um aleatório
                    </h2>
                    <section style={{display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0'}}>
                        <button onClick={() => CarregarPDF(null)} style={{cursor: 'pointer'}}>PDF Random</button>
                        <button onClick={AdicionarURL} style={{cursor: 'pointer'}}>Adicionar URL</button>
                    </section>
                </header>

                <main style={{textAlign: 'left'}}>
                    <section>
                        <ul>
                            {
                                url.map((link) => { //Lista os pdf's na tela
                                    return (
                                        <li key={link}  style={{marginTop: '6px'}}>
                                            <p>
                                                <span onClick={() => CarregarPDF(link) } style={{cursor: 'pointer'}}>
                                                    { (link === pdf ? '👉🏽 ' : '') + link }
                                                </span>

                                                <a href={link} target='_blank' style={{marginLeft: '30px', color: 'blue', borderBottom: '1px solid blue'}}>
                                                    Abrir Link
                                                </a>
                                            </p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </main>

                <div>
                    <Dialog onClose={handleClose} open={pdf !== '' ? true : false} fullWidth>
                        <DialogContent>
                            <div>
                                <Button variant="outlined" onClick={handleClose} >
                                    <CloseIcon />
                                </Button>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'absolute',
                                    zIndex: '99',
                                    right: 0,
                                    top: 0,
                                    margin: '18px',
                                    opacity: '0.6'
                                }}
                            >
                                <Zoom>
                                    {(props) => (
                                        <Button
                                            style={{cursor: 'pointer'}}
                                            disabled={props.scale === 4}
                                            onClick={() => changeSize(props, (size + 0.5))}
                                        >
                                            <ZoomInIcon
                                                fontSize='large'
                                            />
                                        </Button>
                                    )}
                                </Zoom>

                                <Zoom>
                                    {(props) => (
                                        <Button
                                            style={{cursor: 'pointer'}}
                                            disabled={props.scale === 0.5}
                                            onClick={() => changeSize(props, (size - 0.5))}
                                        >
                                            <ZoomOutIcon
                                                fontSize='large'
                                            />
                                        </Button>
                                    )}
                                </Zoom>
                            </div>

                            <div>
                                <Viewer
                                    fileUrl={'http://localhost:3000/api/showPDF?url=' + pdf}
                                    defaultScale={size}
                                    plugins={[zoomPluginInstance]}    
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}