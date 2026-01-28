/* ============================================
   ENERGIA DO CIGANO - MAIN JAVASCRIPT
   ============================================ */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create SVG icon element
 */
function createIcon(name, size = 24) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 24 24`);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const icons = {
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    star: '<polygon points="12 2 15.09 10.26 23.77 10.36 17.13 16.01 19.09 24.29 12 18.54 4.91 24.29 6.87 16.01 0.23 10.36 8.91 10.26 12 2"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    messageCircle: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  };

  svg.innerHTML = icons[name] || '';
  return svg;
}

/**
 * Smooth scroll to element
 */
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (mobileNav) {
    mobileNav.classList.toggle('active');
    
    // Update icon
    const icon = menuToggle.querySelector('svg');
    if (mobileNav.classList.contains('active')) {
      menuToggle.innerHTML = '';
      menuToggle.appendChild(createIcon('x', 24));
    } else {
      menuToggle.innerHTML = '';
      menuToggle.appendChild(createIcon('menu', 24));
    }
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (mobileNav && mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
    menuToggle.innerHTML = '';
    menuToggle.appendChild(createIcon('menu', 24));
  }
}

// ============================================
// NAVIGATION SETUP
// ============================================

function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('nav a, .mobile-nav a');

  // Menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
    menuToggle.innerHTML = '';
    menuToggle.appendChild(createIcon('menu', 24));
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Update active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// LOGO CLICK TO HOME
// ============================================

function setupLogoClick() {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

// ============================================
// WHATSAPP BUTTON SETUP
// ============================================

function setupWhatsAppButton() {
  const whatsappLink = 'https://wa.me/5521982684928?text=Olá,%20gostaria%20de%20agendar%20um%20jogo%20de%20baralho%20cigano.';
  
  // Find all WhatsApp buttons and links
  const whatsappElements = document.querySelectorAll('[data-whatsapp]');
  whatsappElements.forEach(el => {
    el.href = whatsappLink;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  // Floating button
  const floatingBtn = document.querySelector('.whatsapp-float');
  if (floatingBtn) {
    floatingBtn.href = whatsappLink;
    floatingBtn.target = '_blank';
    floatingBtn.rel = 'noopener noreferrer';
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target);
    });
  });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with fade-in animation
  document.querySelectorAll('.benefit-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ============================================
// ACTIVE SECTION HIGHLIGHT
// ============================================

function setupActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// FAQ ACCORDION
// ============================================

function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    if (summary) {
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.hasAttribute('open')) {
            otherItem.removeAttribute('open');
          }
        });

        // Toggle current item
        if (item.hasAttribute('open')) {
          item.removeAttribute('open');
        } else {
          item.setAttribute('open', '');
        }
      });
    }
  });
}

// ============================================
// BLOG NAVIGATION
// ============================================

function setupBlogNavigation() {
  const blogLinks = document.querySelectorAll('[data-blog-link]');
  
  blogLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = link.getAttribute('data-blog-link');
      window.location.href = `blog-post.html?slug=${slug}`;
    });
  });
}

// ============================================
// INITIALIZE ALL
// ============================================

function init() {
  // Setup all features
  setupNavigation();
  setupLogoClick();
  setupWhatsAppButton();
  setupSmoothScroll();
  setupIntersectionObserver();
  setupBackToTop();
  setupActiveSection();
  setupFAQ();
  setupBlogNavigation();

  // Log initialization
  console.log('✨ Energia do Cigano - Website initialized');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// UTILITY: Get URL parameters
// ============================================

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ============================================
// BLOG POST PAGE - Load content based on slug
// ============================================

function loadBlogPost() {
  const slug = getUrlParameter('slug');
  
  if (!slug) {
    window.location.href = 'blog.html';
    return;
  }

  // Blog posts data
  const blogPosts = {
    'guia-baralho-cigano': {
      title: 'Os Mistérios do Baralho Cigano: Guia Completo para Iniciantes',
      category: 'Espiritualidade',
      date: '15 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>Introdução ao Baralho Cigano</h2>
        <p>O Baralho Cigano é uma ferramenta ancestral de adivinhação que combina sabedoria espiritual com interpretação simbólica. Com 36 cartas, cada uma representando diferentes aspectos da vida, este baralho oferece insights profundos sobre o passado, presente e futuro.</p>
        
        <h3>A História do Baralho Cigano</h3>
        <p>Originário da tradição dos povos ciganos, o Baralho Cigano tem raízes que remontam a séculos. Diferente do Tarot, que possui 78 cartas, o Baralho Cigano é mais direto e objetivo, oferecendo respostas claras e precisas às perguntas formuladas.</p>
        
        <h3>As 36 Cartas e Seus Significados</h3>
        <p>Cada carta do Baralho Cigano possui um significado único e poderoso. Desde o Cavaleiro até a Casa, cada símbolo carrega mensagens importantes que ajudam a iluminar o caminho espiritual.</p>
        
        <h3>Como Começar a Usar o Baralho Cigano</h3>
        <p>Para iniciantes, é importante começar com perguntas simples e diretas. Formule sua pergunta com clareza, concentre-se na intenção e deixe que as cartas revelem suas mensagens. Com a prática, você desenvolverá uma conexão mais profunda com o baralho.</p>
        
        <h3>Dicas para Leituras Precisas</h3>
        <ul>
          <li>Mantenha um ambiente tranquilo e focado</li>
          <li>Formule perguntas específicas e objetivas</li>
          <li>Confie em sua intuição ao interpretar as cartas</li>
          <li>Pratique regularmente para desenvolver sua sensibilidade</li>
          <li>Respeite o processo de aprendizado</li>
        </ul>
        
        <p>O Baralho Cigano é uma ferramenta poderosa para autoconhecimento e orientação espiritual. Comece sua jornada hoje mesmo!</p>
      `
    },
    'amor-baralho-cigano': {
      title: 'Amor e Relacionamentos: O Que o Baralho Cigano Revela',
      category: 'Amor',
      date: '12 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>Desvendando os Mistérios do Amor</h2>
        <p>O Baralho Cigano é especialmente poderoso quando se trata de questões de amor e relacionamentos. Suas cartas revelam não apenas o que está acontecendo, mas também o que precisa ser compreendido para evoluir emocionalmente.</p>
        
        <h3>Cartas Relacionadas ao Amor</h3>
        <p>Certas cartas do Baralho Cigano são particularmente significativas para questões amorosas. O Casal, o Coração, a Estrela e o Anel são apenas algumas das cartas que frequentemente aparecem em leituras sobre relacionamentos.</p>
        
        <h3>Interpretando Sinais de Compatibilidade</h3>
        <p>Quando consultamos o Baralho Cigano sobre compatibilidade, as cartas revelam não apenas a atração inicial, mas também a profundidade potencial do relacionamento e os desafios que podem surgir.</p>
        
        <h3>Renovando Relacionamentos</h3>
        <p>Se seu relacionamento está passando por dificuldades, o Baralho Cigano pode oferecer orientação sobre como renovar a conexão e encontrar caminhos para a reconciliação e o crescimento mútuo.</p>
        
        <h3>Encontrando Seu Amor Verdadeiro</h3>
        <p>Para quem busca amor, o Baralho Cigano pode revelar quando e como o amor chegará. As cartas frequentemente indicam não apenas a chegada de alguém especial, mas também o tipo de relacionamento que será mais significativo para você.</p>
        
        <p>Consulte o Baralho Cigano para desvendar os mistérios do seu coração e encontrar clareza em questões amorosas.</p>
      `
    },
    'prosperidade-baralho-cigano': {
      title: 'Prosperidade e Abundância: Lições do Baralho Cigano',
      category: 'Prosperidade',
      date: '10 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>Atraindo Abundância para Sua Vida</h2>
        <p>O Baralho Cigano oferece insights valiosos sobre como atrair prosperidade e abundância. Suas cartas revelam bloqueios financeiros e oportunidades que podem estar passando despercebidas.</p>
        
        <h3>Cartas de Prosperidade</h3>
        <p>Cartas como o Trevo, a Riqueza, o Trabalho e o Sucesso são indicadores poderosos de oportunidades financeiras. Quando estas cartas aparecem em uma leitura, elas sugerem que é hora de agir e aproveitar as oportunidades que surgem.</p>
        
        <h3>Superando Bloqueios Financeiros</h3>
        <p>Muitas vezes, nossos bloqueios financeiros são emocionais e mentais. O Baralho Cigano ajuda a identificar estes bloqueios e oferece orientação sobre como superá-los.</p>
        
        <h3>Investimentos e Negócios</h3>
        <p>Se você está considerando um novo negócio ou investimento, o Baralho Cigano pode oferecer orientação valiosa sobre o melhor caminho a seguir e os riscos potenciais a evitar.</p>
        
        <h3>Criando Fluxo de Abundância</h3>
        <p>A prosperidade não é apenas sobre ganhar dinheiro, mas sobre criar um fluxo contínuo de abundância. O Baralho Cigano revela como manter este fluxo e permitir que a riqueza flua naturalmente em sua vida.</p>
        
        <p>Consulte o Baralho Cigano para desvendar os segredos da prosperidade e criar a vida financeira que você deseja.</p>
      `
    },
    'saude-bem-estar': {
      title: 'Saúde e Bem-Estar: O Que as Cartas Revelam',
      category: 'Bem-Estar',
      date: '08 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>Bem-Estar Integral</h2>
        <p>O Baralho Cigano não apenas oferece orientação sobre questões materiais, mas também sobre nossa saúde e bem-estar geral. As cartas revelam o estado de nossa energia vital e sugerem caminhos para melhorar nossa qualidade de vida.</p>
        
        <h3>Saúde Física</h3>
        <p>Quando consultamos o Baralho Cigano sobre saúde, as cartas podem indicar se há desequilíbrios no corpo que precisam de atenção. Elas sugerem práticas e hábitos que podem melhorar nossa vitalidade.</p>
        
        <h3>Saúde Mental e Emocional</h3>
        <p>O bem-estar mental é fundamental para uma vida plena. O Baralho Cigano oferece insights sobre nosso estado emocional e sugere caminhos para encontrar paz e equilíbrio interior.</p>
        
        <h3>Espiritualidade e Conexão</h3>
        <p>A saúde espiritual é tão importante quanto a física. O Baralho Cigano ajuda a fortalecer nossa conexão com o universo e com nosso propósito de vida.</p>
        
        <h3>Práticas de Autocuidado</h3>
        <p>As cartas frequentemente sugerem práticas de autocuidado que podem transformar sua vida. Desde meditação até exercício físico, o Baralho Cigano oferece orientação personalizada.</p>
        
        <p>Invista em seu bem-estar consultando o Baralho Cigano e descobrindo os caminhos para uma vida mais saudável e equilibrada.</p>
      `
    },
    'transformacao-pessoal': {
      title: 'Transformação Pessoal: Jornada de Autoconhecimento',
      category: 'Desenvolvimento',
      date: '05 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>O Poder da Transformação</h2>
        <p>O Baralho Cigano é uma ferramenta poderosa para autoconhecimento e transformação pessoal. Através de suas cartas, podemos compreender melhor quem somos e quem queremos nos tornar.</p>
        
        <h3>Autoconhecimento Profundo</h3>
        <p>Quando consultamos o Baralho Cigano com a intenção de nos conhecer melhor, as cartas revelam aspectos de nossa personalidade que talvez não reconheçamos. Elas nos mostram nossas forças e áreas onde podemos crescer.</p>
        
        <h3>Identificando Padrões</h3>
        <p>Muitas vezes, repetimos os mesmos padrões sem perceber. O Baralho Cigano ajuda a identificar estes padrões e oferece orientação sobre como quebrá-los e criar novas realidades.</p>
        
        <h3>Definindo Metas e Propósito</h3>
        <p>Quando sabemos quem somos, podemos definir metas que realmente nos importam. O Baralho Cigano ajuda a clarificar nosso propósito de vida e os passos necessários para alcançá-lo.</p>
        
        <h3>Jornada de Cura</h3>
        <p>A transformação pessoal frequentemente envolve cura de feridas emocionais. O Baralho Cigano oferece orientação compassiva sobre este processo de cura e renovação.</p>
        
        <p>Comece sua jornada de transformação pessoal hoje mesmo. Consulte o Baralho Cigano e descubra o potencial infinito que existe dentro de você.</p>
      `
    },
    'sincronicidades-destino': {
      title: 'Sincronicidades e Destino: Compreendendo os Sinais do Universo',
      category: 'Espiritualidade',
      date: '02 de Janeiro de 2026',
      author: 'Energia do Cigano',
      content: `
        <h2>Os Sinais do Universo</h2>
        <p>O universo está constantemente nos enviando sinais através de sincronicidades. O Baralho Cigano é uma ferramenta para decodificar estes sinais e compreender o caminho que o destino está traçando para nós.</p>
        
        <h3>O Que São Sincronicidades</h3>
        <p>Sincronicidades são coincidências significativas que parecem estar conectadas de forma não-causal. Elas são mensagens do universo nos guiando em direção ao nosso destino.</p>
        
        <h3>Reconhecendo os Sinais</h3>
        <p>Nem sempre reconhecemos os sinais que o universo nos envia. O Baralho Cigano ajuda a desenvolver esta sensibilidade e a notar as sincronicidades que aparecem em nossas vidas.</p>
        
        <h3>Interpretando Mensagens Divinas</h3>
        <p>Quando consultamos o Baralho Cigano com a intenção de compreender os sinais do universo, as cartas revelam mensagens profundas que nos guiam para nosso maior bem.</p>
        
        <h3>Alinhamento com o Destino</h3>
        <p>Quando compreendemos os sinais do universo e nos alinhamos com eles, nossa vida flui com mais facilidade. O Baralho Cigano nos ajuda a encontrar este alinhamento perfeito.</p>
        
        <p>Abra-se para os sinais do universo. Consulte o Baralho Cigano e descubra o destino extraordinário que o aguarda.</p>
      `
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    window.location.href = 'blog.html';
    return;
  }

  // Update page content
  const titleEl = document.querySelector('.blog-post-header h1');
  const badgeEl = document.querySelector('.blog-post-header .badge');
  const metaEl = document.querySelector('.blog-post-meta');
  const contentEl = document.querySelector('.blog-post-container .blog-post-content');

  if (titleEl) titleEl.textContent = post.title;
  if (badgeEl) badgeEl.textContent = post.category;
  
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="author">${post.author}</span>
      <span>•</span>
      <span>${post.date}</span>
    `;
  }

  if (contentEl) {
    contentEl.innerHTML = post.content;
  }

  // Update page title
  document.title = `${post.title} | Energia do Cigano`;
}

// Load blog post if on blog-post page
if (window.location.pathname.includes('blog-post')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPost);
  } else {
    loadBlogPost();
  }
}
