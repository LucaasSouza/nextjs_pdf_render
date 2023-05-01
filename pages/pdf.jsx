import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';

const url = [
    'https://araucariageneticabovina.com.br/arquivos/servico/pdfServico_57952bf8ca7af_24-07-2016_17-58-32.pdf',
    'https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf',
    'https://www.ufms.br/wp-content/uploads/2017/09/PDF-teste.pdf',
    'https://www.corenpr.gov.br/portal/images/stories/testepdf2.pdf'
]

export default function PDF(){
    const [pdf, setPDF] = useState('') //State que inicialmente é vazio, mas após o primeiro request teste, armazena a url de um dos pdf's acima

    function LoadPDF(link) { //Função acima que simula o tempo da geração de um pdf, e que depois faz um get para a api local, para renderizá-lo
        if(link === null){
            const randomNum = Math.floor(Math.random() * url.length) //Gera um número aleatório para escolher uma dos pdf's do array
            setPDF(url[randomNum]) //Atualiza o state do path do pdf
        }else{
            setPDF(link)
        }
    }

    const handleClose = () => {
        return setPDF('')
    }
    
    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <h2 onClick={() => { console.log(url) }}>
                    Clique em um link para renderizá-lo ou clique para renderizar um aleatório
                </h2>
                <section style={{display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0'}}>
                    <button onClick={() => LoadPDF(null)} style={{cursor: 'pointer'}}>PDF Random</button>
                </section>

                <div style={{textAlign: 'left'}}>
                    <ul>
                        {
                            url.map((link) => { //Lista os pdf's na tela
                                return (
                                    <li key={link}  style={{marginTop: '6px', cursor: 'pointer'}}>
                                        <p>
                                            <span onClick={() => LoadPDF(link) }>
                                                <span>{ link === pdf ? '👉🏽 ' : '' }</span>
                                                { link }
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
                </div>

                <main>
                    <div>
                        <Dialog onClose={handleClose} open={pdf !== '' ? true : false} fullWidth>
                            <DialogContent >
                                <Button variant="outlined" onClick={handleClose} startIcon={<CloseIcon />} /><br />
                                <Viewer fileUrl={'http://localhost:3000/api/showPDF?url=' + pdf} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </main>
            </div>
        </div>
    )
}