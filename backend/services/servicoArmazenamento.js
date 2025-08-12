const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_CHAVE_ACESSO,
  secretAccessKey: process.env.AWS_CHAVE_SECRETA,
  region: process.env.AWS_REGIAO,
});

const s3 = new AWS.S3();
const BUCKET = process.env.BUCKET_S3;

async function enviarArquivo(caminhoLocal, chave) {
  const fileStream = fs.createReadStream(caminhoLocal);
  const params = {
    Bucket: BUCKET,
    Key: chave,
    Body: fileStream,
    ACL: 'public-read', // ou retire e use URLs pré-assinadas
  };

  const res = await s3.upload(params).promise();
  return res.Location;
}

async function apagarLocal(caminho) {
  return fs.promises.unlink(caminho).catch(() => {});
}

module.exports = { enviarArquivo, apagarLocal };