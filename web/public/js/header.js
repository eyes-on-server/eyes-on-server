const header = document.createElement('template');

header.innerHTML = `
    <div class="header">
        <div class="container">
            <div class="esquerda_header">
                <a href="./index.html"><img src="./img/icon.png" class="logo"></a>
            </div>
            <div class="direita_header">
                <div class="conta">
                    <img src="./img/user_icon.png" class="imagem_usuario">
                    <a href="./login.html" id="login_cliente" class="nome_usuario">Login do cliente</a>
                </div>
                <hr>
                <div class="links_navbar">
                    <ul class="navbar">
                        <li><div class="linka"><a href="">Produto</a></div></li>
                        <li><div class="linka"><a href="">Solução</a></div></li>
                        <li><div class="linka"><a href="">Quem somos</a></div></li>
                        <li><div class="linka"><a href="">Contato</a></div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `

document.body.appendChild(header.content);