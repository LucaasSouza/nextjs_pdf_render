import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query //É feito o desconstruct da queryString para pegar somente a url do pdf passado

  await axios.get(url, { //É feito um get com a url passada via queryString, acompanhado também do header abaixo, para evitar o problema do CORS
    responseType: 'arraybuffer',
    responseEncoding: 'binary'
  })
  .then((response) => { //Após o request, é retornado o pdf em arraybuffer para sua renderização na tela
    return res.status(200).send(response.data)
  })
  .catch((err) => { //Caso dê erro, é retornado um json com os dados do erro
    return res.status(400).json(
      {
        error: err
      }
    )
  })
}