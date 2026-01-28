const cartasCigano = [
    { id: 1, nome: "O Cavaleiro", significado: "Novidades, notícias rápidas e movimento. Alguém ou algo está chegando em sua vida." },
    { id: 2, nome: "O Trevo", significado: "Pequenos obstáculos ou sorte momentânea. Dificuldades passageiras que exigem paciência." },
    { id: 3, nome: "O Navio", significado: "Mudanças, viagens ou novos horizontes. Momento de transição e busca por novos caminhos." },
    { id: 4, nome: "A Casa", significado: "Equilíbrio, família e estabilidade. Refere-se ao seu lar e à sua base emocional." },
    { id: 5, nome: "A Árvore", significado: "Saúde, crescimento e vitalidade. Representa algo que está criando raízes profundas." },
    { id: 6, nome: "As Nuvens", significado: "Confusão mental, dúvidas e instabilidade. Momento de incerteza onde a visão está embaçada." },
    { id: 7, nome: "A Serpente", significado: "Traição, inveja ou sensualidade. Cuidado com pessoas falsas ou situações perigosas." },
    { id: 8, nome: "O Caixão", significado: "Finalizações, transformações e renascimento. Algo precisa terminar para que o novo surja." },
    { id: 9, nome: "As Flores", significado: "Felicidade, alegria e reconhecimento. Um presente do destino ou um momento de beleza." },
    { id: 10, nome: "A Foice", significado: "Corte brusco, decisão necessária ou colheita. Momento de desapegar do que não serve mais." },
    { id: 11, nome: "O Chicote", significado: "Conflitos, discussões ou poder mental. Representa energia intensa que pode ser construtiva ou destrutiva." },
    { id: 12, nome: "Os Pássaros", significado: "Comunicação, parceria e liberdade. Alegria nas pequenas coisas e trocas sociais." },
    { id: 13, nome: "A Criança", significado: "Inocência, novos começos e espontaneidade. Representa o início de algo novo e puro." },
    { id: 14, nome: "A Raposa", significado: "Estratégia, cautela e armadilhas. Use a inteligência para evitar ser enganado." },
    { id: 15, nome: "O Urso", significado: "Proteção, força ou ciúme. Pode representar uma figura de autoridade ou sobrecarga emocional." },
    { id: 16, nome: "A Estrela", significado: "Esperança, proteção espiritual e brilho. Seus guias estão iluminando seu caminho." },
    { id: 17, nome: "A Cegonha", significado: "Novidades, mudanças positivas e renovação. Ciclos que se renovam com boas surpresas." },
    { id: 18, nome: "O Cachorro", significado: "Fidelidade, amizade e lealdade. Alguém de confiança está ao seu lado." },
    { id: 19, nome: "A Torre", significado: "Isolamento, espiritualidade ou instituições. Momento de olhar para dentro de si mesmo." },
    { id: 20, nome: "O Jardim", significado: "Vida social, público e colheita. O resultado do que você plantou está florescendo." },
    { id: 21, nome: "A Montanha", significado: "Desafios, bloqueios ou justiça. Obstáculos que exigem esforço e perseverança para superar." },
    { id: 22, nome: "O Caminho", significado: "Escolhas, decisões e livre arbítrio. Você está diante de uma encruzilhada importante." },
    { id: 23, nome: "O Rato", significado: "Desgaste, perdas ou estresse. Algo está consumindo sua energia silenciosamente." },
    { id: 24, nome: "O Coração", significado: "Amor, paixão e sentimentos profundos. As emoções estão em destaque neste momento." },
    { id: 25, nome: "O Anel", significado: "Alianças, parcerias e compromissos. União de forças, seja no amor ou nos negócios." },
    { id: 26, nome: "Os Livros", significado: "Segredos, estudos e conhecimento. Algo que ainda não foi revelado ou aprendizado necessário." },
    { id: 27, nome: "A Carta", significado: "Mensagens, documentos e notícias escritas. Comunicação formal que traz informações." },
    { id: 28, nome: "O Cigano", significado: "Energia masculina, ação e racionalidade. Representa o consulente homem ou uma figura masculina." },
    { id: 29, nome: "A Cigana", significado: "Energia feminina, intuição e receptividade. Representa a consulente mulher ou uma figura feminina." },
    { id: 30, nome: "Os Lírios", significado: "Paz, pureza e maturidade. Um período de tranquilidade e harmonia duradoura." },
    { id: 31, nome: "O Sol", significado: "Sucesso, clareza e energia vital. A carta mais positiva, indicando vitória e luz." },
    { id: 32, nome: "A Lua", significado: "Intuição, mistério e reconhecimento. Suas emoções e méritos estão em evidência." },
    { id: 33, nome: "A Chave", significado: "Soluções, aberturas e sucesso. Você tem o poder de abrir as portas que deseja." },
    { id: 34, nome: "Os Peixes", significado: "Prosperidade, dinheiro e abundância. Fluxo material e oportunidades financeiras." },
    { id: 35, nome: "A Âncora", significado: "Segurança, estabilidade e confiança. Momento de firmar seus pés e encontrar porto seguro." },
    { id: 36, nome: "A Cruz", significado: "Destino, fé e provação. O fim de um sofrimento ou uma carga que traz aprendizado." }
];

// Configuração da API (URL onde o script Python está rodando)
const API_URL = "http://localhost:5000";

document.addEventListener('DOMContentLoaded', function() {
    const authOverlay = document.getElementById('auth-overlay');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const forgotContainer = document.getElementById('forgot-container');
    
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const showForgot = document.getElementById('show-forgot');
    const backToLogin = document.getElementById('back-to-login');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotForm = document.getElementById('forgot-form');
    
    const userInfo = document.getElementById('user-info');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');

    // Verificar se o usuário já está logado na sessão atual
    const currentUser = JSON.parse(sessionStorage.getItem('cigano_user'));
    if (currentUser) {
        showUserLoggedIn(currentUser.nome);
    } else {
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', function(e) {
                if (!sessionStorage.getItem('cigano_user')) {
                    e.stopImmediatePropagation();
                    authOverlay.classList.remove('hidden');
                }
            }, true);
        }
    }

    // Navegação entre containers
    showRegister.addEventListener('click', (e) => { e.preventDefault(); switchContainer(registerContainer); });
    showLogin.addEventListener('click', (e) => { e.preventDefault(); switchContainer(loginContainer); });
    showForgot.addEventListener('click', (e) => { e.preventDefault(); switchContainer(forgotContainer); });
    backToLogin.addEventListener('click', (e) => { e.preventDefault(); switchContainer(loginContainer); });

    function switchContainer(target) {
        [loginContainer, registerContainer, forgotContainer].forEach(c => c.classList.add('hidden'));
        target.classList.remove('hidden');
    }

    // Lógica de Cadastro com Python API
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const senha = document.getElementById('reg-pass').value;

        try {
            const response = await fetch(`${API_URL}/cadastrar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });
            const data = await response.json();

            if (data.success) {
                alert(data.message);
                // Após cadastrar, faz login automático
                sessionStorage.setItem('cigano_user', JSON.stringify({ nome, email }));
                location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor Python. Certifique-se de que o app.py está rodando.");
        }
    });

    // Lógica de Login com Python API
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-pass').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('cigano_user', JSON.stringify(data.user));
                location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor Python.");
        }
    });

    // Lógica de Logout
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('cigano_user');
        location.reload();
    });

    function showUserLoggedIn(nome) {
        if (userInfo) {
            userInfo.classList.remove('hidden');
            userNameDisplay.textContent = `Olá, ${nome.split(' ')[0]}`;
        }
        if (authOverlay) authOverlay.classList.add('hidden');
    }
});
