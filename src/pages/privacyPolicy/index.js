import React from 'react';

import { Container, Footer } from './styles';

export default function PrivacyPolicy() {
  const year = new Date().getFullYear();
  return (
    <Container>
      <div>
        <h1>Política de Privacidade - e-ncarte</h1>
        <p>
          A E-ncarte Publicidade Digital tem como uma de suas diretrizes a
          segurança das informações dos clientes bem como dos usuários de nossas
          plataformas
        </p>
        <p>
          Abaixo esclarecemos nossa dinâmica de trabalho quanto aos dados e
          informações que utilizamos em nosso trabalho de publicidade digital.
        </p>
        <p>
          <b>
            Importante! Caso não concorde com o conteúdo da nossa política de
            privacidade, não é recomendável baixar nosso aplicativos nem acessar
            quaisquer uma de nossas web páginas.
          </b>
        </p>
        <h2>Coleta de dados</h2>
        <p>
          Em nossos sites e aplicativo, não coletamos ou solicitamos as
          informações dos usuários.
        </p>
        <h2>Fique Atento!</h2>
        <ul>
          <li>
            Não solicitamos dados bancários ou confidenciais como CPF, RG e
            outros;
          </li>
          <li>Não oferecemos quaisquer formas de pagamento;</li>
          <li>Não recebemos quaisquer valores dos nossos usuários;</li>
          <li>
            Nosso aplicativo é totalmente gratuito no play store e livre de
            propagandas;
          </li>
          <li>
            Não enviamos boletos, faturas ou qualquer cobrança para nossos
            usuários;
          </li>
        </ul>
        <h2>Navegação no site e uso do Aplicativo</h2>
        <p>
          Ao visitar nosso site, é inserido um ‘cookie’ no seu navegador por
          meio do software Google Analytics, para identificar a quantidade de
          vezes que você retorna ao nosso endereço. São coletadas, anonimamente,
          informações, como endereço IP, localização geográfica, fonte de
          referência, tipo de navegador e duração da visita e páginas visitadas.
          Dessa forma conhecemos as sua preferências e a utilizamos para lhe
          entregar uma melhor experiência de uso.
        </p>
        <h2>Informações Pessoais</h2>
        <p>
          Ressaltamos que a E-ncarte Publicidade Digital não coleta ou armazena
          nenhuma informação pessoal, tais como: e-mail, telefone ou outras de
          identificação pessoal.
        </p>
        <Footer>e-ncarte publicidade digital ® - {year}</Footer>
      </div>
    </Container>
  );
}
