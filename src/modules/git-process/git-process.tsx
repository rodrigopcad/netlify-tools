import React from "react";

import style from "./git-process.module.css";

const GitProcess: React.FC = () => {
    return <div className={style.container}>
        <h1>Processo GIT de desenvolvimento de funcionalidades e correções</h1>

        <h2>Criar uma branch</h2>
        <p>A branch de trabalho sempre será criada a partir da branch master e deverá ser nomeada com um dos prefixos:
        </p>
        <ul>
            <li><b>feature/</b> (nova funcionalidade)</li>
            <li><b>bugfix/</b> (correção de bug de desenvolvimento)</li>
            <li><b>hotfix/</b> (correção de bug de produção)</li>
        </ul>
        <p>Na sequência, utilize a identificação da tarefa do Jira. Exemplo: <b>DSW-17865-</b>.</p>
        <p>Em seguida, use uma breve descrição da tarefa. Exemplo: <b>acesso-curso</b>.</p>
        <p>Então, a branch de exemplo será nomeada como: <b>feature/DSW-17865-acesso-curso</b>.</p>

        <ol>
            <li>Sincronize o repositório local com o repositório remoto e remova todas as
                referências locais que não são mais necessárias:</li>
            <pre>git fetch -pt</pre>
            <li>Acesse a branch master:</li>
            <pre>git switch master</pre>
            <li>Atualize a branch master com o repositório remoto:</li>
            <pre>git pull</pre>
            <li>Crie a branch de trabalho:</li>
            <pre>git switch -c feature/DSW-17865-acesso-curso</pre>
        </ol>

        <h2>Commit</h2>
        <p>O título da mensagem será curto, de até oitenta caracteres, escrito em modo imperativo. Não há problema em
            exceder os oitenta caracteres, mas deve-se tentar manter este limite.</p>
        <p>O título deverá iniciar com o ID da tarefa do Jira seguido de dois pontos (:), na sequência, o
            texto do título, que não será pontuado e deverá ser escrito em letras minúsculas.</p>
        <p>Se necessário, pule duas linhas e descreva o commit. Não há limite de linhas, porém, deve-se pular uma linha
            a cada oitenta caracteres.</p>
        <p>Antes de realizar um commit, revise as alterações de código com o comando git diff ou com o diff tool
            configurado.</p>
        <p><b>Lembre-se: a mensagem indica o que o commit faz.</b></p>
        <p>Responda a pergunta antes de escrever o commit.</p>
        <p>O que o commit faz?<br />Respostas:</p>
        <ol>
            <li>adicionando query parameters</li>
            <li>adicionei query parameters</li>
            <li>adiciona query parameters</li>
        </ol>
        <p>A resposta número 3 é a adequada, porque indica o que o commit faz e usa o verbo adicionar no imperativo.</p>
        <p>Exemplo de mensagem de commit:</p>
        <pre>{
            `DSW-17865: altera query parameters 
Altera o query parameter id_usuario para USU_ID, para manter a padronização em todas as passagens de parâmetros.`
        }</pre>

        <h2>Atualize as branches de desenvolvimento/homologação</h2>
        <p>No exemplo, iremos atualizar a branch develop com a mudanças adicionadas na branch de trabalho.</p>
        <ol>
            <li>Acesse a branch develop:</li>
            <pre>git switch develop</pre>
            <li>Atualize a branch develop com o repositório remoto:</li>
            <pre>git pull</pre>
            <li>Faça o merge com as alterações da branch de trabalho:</li>
            <pre>git merge feature/DSW-17865-acesso-curso</pre>
            <li>Atualize o repositório remoto:</li>
            <pre>git push</pre>
        </ol>
        <p>Realize o mesmo procedimento com a branch de homologação após validar o ambiente de desenvolvimento.</p>

        <h2>Preparação do pull request</h2>
        <p>A branch master só deverá receber atualizações mediante pull request. Siga os procedimentos para preparar a
            branch de trabalho para ação.</p>
        <ol>
            <li>Sincronize o repositório local com o repositório remoto e remova todas as referências locais que não são
                mais necessárias:</li>
            <pre>git fetch -pt</pre>
            <li>Acesse a branch master:</li>
            <pre>git switch master</pre>
            <li>Atualize a branch master com o repositório remoto:</li>
            <pre>git pull</pre>
            <li>Acesse a branch de trabalho:</li>
            <pre>git switch feature/DSW-17865-acesso-curso</pre>
            <li>Caso exista qualquer alteração na branch master após a atualização realizada no passo 3, deve-se levar
                as atualizações da branch master para a branch de trabalho:</li>
            <pre>git rebase master</pre>
            <li>O comando rebase altera o histórico dos commits. Ele altera o hash de cada commit da branch que recebe
                as alterações. Então, se a branch de trabalho já estiver no repositório remoto, será necessário apagá-la
                antes de subir as alterações para não duplicar os commits:</li>
            <pre>git push origin --delete feature/DSW-17865-acesso-curso</pre>
            <li>Suba a branch de trabalho para o repositório remoto:</li>
            <pre>git push -u origin feature/DSW-17865-acesso-curso</pre>
            <p>Caso a branch de trabalho esteja sendo utilizada por outros desenvolvedores, não é indicado o uso do
                comando <b>rebase</b>, por conta da reescrita do histórico. Substitua os passos <b>5</b>, <b>6</b> e
                <b>7</b> pelos passos <b>8</b> e <b>9</b>.</p>
            <li>Junte a branch master a branch de trabalho:</li>
            <pre>git merge --ff feature/DSW-17865-acesso-curso</pre>
            <li>Suba a branch de trabalho para o repositório remoto:</li>
            <pre>git push</pre>
            <li>Crie o arquivo compactado, do tipo zip, contendo as alterações para anexar ao pull request. O nome do
                arquivo compactado, será o ID da tarefa do Jira:</li>
            <pre>{
                `git archive -o ARQUIVO_COMPACTADO.zip BRANCH_DE_TRABALHO $(git diff --name-only --diff-filter=ACMRT BRANCH_DE_ORIGEM BRANCH_DE_TRABALHO)`
            }</pre>
            <p>Exemplo do comando <b>git archive</b> com os dados do exemplo:</p>
            <pre>{
                `git archive -o DSW-17865.zip DSW-17865-acesso-curso $(git diff --name-only --diff-filter=ACMRT master DSW-17865-acesso-curso)`
            }</pre>
            <li>Crie o pull request para juntar a branch de trabalho a branch master. Selecione ao
                menos um revisor e anexe o arquivo zip.</li>
        </ol>

        <h2>Finalização</h2>
        <p>Após a aceitação e finalização da pull request pela equipe Plataforma, apague a branch de trabalho.</p>
        <ol>
            <li>Apagar a branch no repositório remoto:</li>
            <pre>git push origin --delete feature/DSW-17865-acesso-curso</pre>
            <li>Apague a branch no repositório local:</li>
            <pre>git branch -D feature/DSW-17865-acesso-curso</pre>
        </ol>
    </div>;
};

export default GitProcess;