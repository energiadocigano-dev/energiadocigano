const cartasCigano = [
    { id: 1, nome: "O Cavaleiro", significado: "Novidades, notícias rápidas e movimento. Alguém ou algo está chegando em sua vida." },
    { id: 2, nome: "O Trevo", significado: "Pequenos obstáculos ou sorte momentânea. Dificuldades passageiras que exigem paciência." },
    { id: 3, nome: "O Navio", significado: "Mudanças, viagens ou novos horizons. Momento de transição e busca por novos caminhos." },
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

// Lógica de Autenticação (Simulada com LocalStorage)
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

    // Inicializar lista de bloqueio se não existir
    if (!localStorage.getItem('cigano_blocked_emails')) {
        localStorage.setItem('cigano_blocked_emails', JSON.stringify(['exemplo_bloqueado@teste.com']));
    }

    // Verificar se o usuário já está logado
    const currentUser = JSON.parse(localStorage.getItem('cigano_user'));
    if (currentUser) {
        if (isUserBlocked(currentUser.email)) {
            alert('Sua conta foi bloqueada. Entre em contato com o suporte.');
            localStorage.removeItem('cigano_user');
            location.reload();
        } else {
            showUserLoggedIn(currentUser.name);
        }
    } else {
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', function(e) {
                if (!localStorage.getItem('cigano_user')) {
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

    function isUserBlocked(email) {
        const blocked = JSON.parse(localStorage.getItem('cigano_blocked_emails') || '[]');
        return blocked.includes(email);
    }

    // Lógica de Cadastro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        if (isUserBlocked(email)) {
            alert('Este e-mail está bloqueado no sistema.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('cigano_users') || '[]');
        if (users.find(u => u.email === email)) {
            alert('Este e-mail já está cadastrado!');
            return;
        }

        const newUser = { name, email, pass };
        users.push(newUser);
        localStorage.setItem('cigano_users', JSON.stringify(users));
        localStorage.setItem('cigano_user', JSON.stringify(newUser));

        alert('Cadastro realizado com sucesso!');
        location.reload();
    });

    // Lógica de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        if (isUserBlocked(email)) {
            alert('Sua conta está bloqueada.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('cigano_users') || '[]');
        const user = users.find(u => u.email === email && u.pass === pass);

        if (user) {
            localStorage.setItem('cigano_user', JSON.stringify(user));
            location.reload();
        } else {
            alert('E-mail ou senha incorretos!');
        }
    });

    // Lógica de Esqueci a Senha
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const users = JSON.parse(localStorage.getItem('cigano_users') || '[]');
        const user = users.find(u => u.email === email);

        if (user) {
            alert(`Sua senha é: ${user.pass}\n(Em um sistema real, um e-mail de recuperação seria enviado)`);
            switchContainer(loginContainer);
        } else {
            alert('E-mail não encontrado em nossa base.');
        }
    });

    // Lógica de Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('cigano_user');
        location.reload();
    });

    function showUserLoggedIn(name) {
        if (userInfo) {
            userInfo.classList.remove('hidden');
            userNameDisplay.textContent = `Olá, ${name.split(' ')[0]}`;
        }
        if (authOverlay) authOverlay.classList.add('hidden');
    }

    // Função global para bloqueio (para uso no console pelo administrador)
    window.bloquearUsuario = function(email) {
        const blocked = JSON.parse(localStorage.getItem('cigano_blocked_emails') || '[]');
        if (!blocked.includes(email)) {
            blocked.push(email);
            localStorage.setItem('cigano_blocked_emails', JSON.stringify(blocked));
            alert(`Usuário ${email} bloqueado com sucesso!`);
            if (currentUser && currentUser.email === email) {
                localStorage.removeItem('cigano_user');
                location.reload();
            }
        } else {
            alert('Este usuário já está bloqueado.');
        }
    };

    window.desbloquearUsuario = function(email) {
        let blocked = JSON.parse(localStorage.getItem('cigano_blocked_emails') || '[]');
        blocked = blocked.filter(e => e !== email);
        localStorage.setItem('cigano_blocked_emails', JSON.stringify(blocked));
        alert(`Usuário ${email} desbloqueado!`);
    };
});
