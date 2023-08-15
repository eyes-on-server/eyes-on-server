const footer = document.createElement('template');

footer.innerHTML = `
    <div class="footer">
        <div class="container">
            <div class="esquerda_footer">
                <img src="./img/icon_no_bg.png" class="logo">
            </div>
            <div class="direita_footer">
                <div class="contatos">
                    <img src="./img/github_icon.png">
                    <img src="./img/linkedin_icon.png">
                    <img src="./img/num_sei.png">
                </div>
                <span>
                    © 2023 - Eyes On Server. 
                    Todos os direitos reservados.
                </span>
            </div>
        </div>
    </div>
    `

document.body.appendChild(footer.content);