import axios from 'axios';
import { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';

const url = [ //PDF's na web que serão renderizados
    'https://araucariageneticabovina.com.br/arquivos/servico/pdfServico_57952bf8ca7af_24-07-2016_17-58-32.pdf',
    'https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf',
    'https://www.ufms.br/wp-content/uploads/2017/09/PDF-teste.pdf',
    'https://www.corenpr.gov.br/portal/images/stories/testepdf2.pdf'
]

export default function PDF(){
    const [pdf, setPDF] = useState('') //State que inicialmente é vazio, mas após o primeiro request teste, armazena a url de um dos pdf's acima
    const [num, setNum] = useState(0) //Armazena o índice selecionado para mostrar na tela

    async function LoadPDF(){ //Função acima que simula o tempo da geração de um pdf, e que depois faz um get para a api local, para renderizá-lo
        console.clear()
        console.log('carregando...') //Seria tipo um 'pre-loader'
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            // console.log(res.data)
            const randomNum = Math.floor(Math.random() * url.length) //Gera um número aleatório para escolher uma dos pdf's do array

            setNum(randomNum) //Atualiza o state com o número selecionado
            setPDF(url[randomNum]) //Atualiza o state do path do pdf
        })
        console.log('finalizado')
    }

    const limparDados = () => { //Limpa os states
        setPDF('')
        setNum(0)
    }
    
    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <section style={{display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0'}}>
                    <button onClick={LoadPDF} style={{cursor: 'pointer'}}>PDF Random</button>
                    <button onClick={limparDados} style={{cursor: 'pointer'}}>Limpar</button>
                </section>

                <div style={{textAlign: 'left'}}>
                    <ul>
                        {
                            url.map((link) => { //Lista os pdf's na tela
                                return (
                                    <li key={link}  style={{marginTop: '6px'}}>
                                        <a href={link} target='_blank' style={{borderBottom: '1px solid black'}}>
                                            {link}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <main>
                    <div>
                        {
                            pdf === '' ? null : //Quando o pdf for diferente de '', é chamada a api local responsável por renderizar os dados do pdf na tela. O path do pdf selecionado é concatenado e passado via queryString
                            <>
                                <p> PDF número: { num + 1 }</p>
                                <Viewer fileUrl={'http://localhost:3000/api/showPDF?url=' + pdf} />
                            </>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}