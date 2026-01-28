/**
 * Shipping Manager - Energia do Cigano
 * Gerencia a exibição da tag de frete grátis e informações de entrega.
 */

document.addEventListener('DOMContentLoaded', function() {
    const MIN_FREE_SHIPPING_VALUE = 119.90;
    
    // 1. Lógica para Página de Produto Individual
    const priceElement = document.querySelector('.current-price');
    if (priceElement) {
        const priceText = priceElement.textContent;
        const priceValue = parseFloat(priceText.replace('R$', '').replace('.', '').replace(',', '.').trim());

        if (priceValue >= MIN_FREE_SHIPPING_VALUE) {
            const freeShippingTag = createFreeShippingBadge();
            const priceContainer = document.querySelector('.price-container');
            if (priceContainer) {
                priceContainer.appendChild(freeShippingTag);
            }
        }
        
        // Inicializar calculadora de frete se existir
        initShippingCalculator(priceValue);
    }

    // 2. Lógica para Listagem de Produtos (Cards)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const cardPriceElement = card.querySelector('.product-price');
        if (cardPriceElement) {
            const cardPriceText = cardPriceElement.textContent;
            const cardPriceValue = parseFloat(cardPriceText.replace('R$', '').replace('.', '').replace(',', '.').trim());
            
            if (cardPriceValue >= MIN_FREE_SHIPPING_VALUE) {
                const badge = createFreeShippingBadge(true); // true para versão compacta
                const imageContainer = card.querySelector('.product-image');
                if (imageContainer) {
                    imageContainer.appendChild(badge);
                }
            }
        }
    });

    // 3. Lógica para "Veja Também" - Produtos Relacionados
    initSeeAlsoSection();

    /**
     * Cria o elemento da tag de frete grátis
     */
    function createFreeShippingBadge(isCompact = false) {
        const badge = document.createElement('span');
        badge.className = isCompact ? 'free-shipping-badge compact' : 'free-shipping-badge';
        badge.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            Frete Grátis
        `;
        return badge;
    }

    /**
     * Inicializa a calculadora de frete na página de produto
     */
    function initShippingCalculator(priceValue) {
        const shippingCalculator = document.querySelector('.shipping-calculator');
        if (!shippingCalculator) return;

        const shippingResultContainer = document.createElement('div');
        shippingResultContainer.id = 'shipping-result';
        shippingResultContainer.style.marginTop = '1rem';
        shippingCalculator.appendChild(shippingResultContainer);

        const calcButton = shippingCalculator.querySelector('button');
        const cepInput = shippingCalculator.querySelector('input');

        if (calcButton && cepInput) {
            calcButton.addEventListener('click', function() {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length !== 8) {
                    alert('Por favor, digite um CEP válido.');
                    return;
                }
                updateShippingInfo(priceValue, cep, shippingResultContainer);
            });
        }
    }



    /**
     * Atualiza a interface com as opções de frete
     */
    function updateShippingInfo(price, cep, container) {
        container.innerHTML = '<p style="font-size: 0.875rem; color: var(--gray-600);">Calculando...</p>';
        
        // Simular delay de rede
        setTimeout(() => {
            let shippingOptions = '';
            
            // Lógica de exemplo para Frete Grátis
            const isFree = price >= MIN_FREE_SHIPPING_VALUE;
            const deliveryPrice = isFree ? 'Grátis' : 'R$ 19,99';
            
            shippingOptions = `
                <div class="shipping-option-item">
                    <div class="option-info">
                        <strong>Entrega Padrão</strong>
                        <span>Prazo: 3 a 6 dias úteis</span>
                    </div>
                    <div class="option-price ${isFree ? 'free' : ''}">${deliveryPrice}</div>
                </div>
                <div class="shipping-option-item">
                    <div class="option-info">
                        <strong>Retirada no Local</strong>
                        <span>Disponível em 24h</span>
                    </div>
                    <div class="option-price free">Grátis</div>
                </div>
            `;

            container.innerHTML = `
                <div class="shipping-options-list">
                    ${shippingOptions}
                </div>
                ${!isFree ? `<p class="shipping-notice">Faltam <strong>R$ ${(MIN_FREE_SHIPPING_VALUE - price).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong> para você ganhar <strong>Frete Grátis!</strong></p>` : ''}
            `;
        }, 600);
    }

    /**
     * Inicializa a seção "Veja Também" com produtos relacionados
     */
    function initSeeAlsoSection() {
        const seeAlsoSection = document.getElementById('see-also-section');
        if (!seeAlsoSection) return;

        // Obter código do produto atual da página
        const productMetaElement = document.querySelector('.product-meta span');
        if (!productMetaElement) return;

        const currentProductCode = productMetaElement.textContent.replace('Cód:', '').trim();

        // Configuração de produtos relacionados por código
        const relatedProducts = {
            'BANHO-COMBO-01': [
                {
                    code: 'BANHO-COMBO-01',
                    name: 'Combo Todos Banhos de Ervas de Refil',
                    price: 'R$ 120,00',
                    image: '../images/spiritual-energy.jpg',
                    url: './combo-banhos-refil.html'
                },
                {
                    code: 'BANHO-COMBO-02',
                    name: 'Combo Todos Banhos de Ervas de Refil - Premium',
                    price: 'R$ 129,90',
                    image: '../images/energia-do-cigano.png',
                    url: './combo-banhos-refil-2.html'
                }
            ],
            'BANHO-COMBO-02': [
                {
                    code: 'BANHO-COMBO-02',
                    name: 'Combo Todos Banhos de Ervas de Refil - Premium',
                    price: 'R$ 129,90',
                    image: '../images/energia-do-cigano.png',
                    url: './combo-banhos-refil-2.html'
                },
                {
                    code: 'BANHO-COMBO-01',
                    name: 'Combo Todos Banhos de Ervas de Refil',
                    price: 'R$ 120,00',
                    image: '../images/spiritual-energy.jpg',
                    url: './combo-banhos-refil.html'
                }
            ]
        };

        // Obter produtos relacionados para o código atual
        const productsToShow = relatedProducts[currentProductCode];
        if (!productsToShow || productsToShow.length === 0) {
            seeAlsoSection.style.display = 'none';
            return;
        }

        // Renderizar produtos relacionados
        const productsContainer = document.getElementById('see-also-products');
        productsContainer.innerHTML = productsToShow.map(product => `
            <div class="see-also-product-card" style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer;" onclick="window.location.href='${product.url}'">
                <div class="product-image" style="width: 100%; height: 200px; overflow: hidden; background: var(--gray-100);">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="product-info" style="padding: 1rem;">
                    <h3 style="font-size: 1rem; color: var(--gray-900); margin-bottom: 0.5rem; font-family: var(--font-body);">${product.name}</h3>
                    <p style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.75rem;">Cód: ${product.code}</p>
                    <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${product.price}</p>
                </div>
            </div>
        `).join('');

        // Adicionar efeito hover via CSS inline
        const style = document.createElement('style');
        style.textContent = `
            .see-also-product-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
});
