document.addEventListener('DOMContentLoaded', () => {

    // --- 1. スクロールアニメーション（Intersection Observer） ---
    const targets = document.querySelectorAll('.fade-in-item');
    const fadeOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    targets.forEach(target => {
        fadeObserver.observe(target);
    });

    /* =========================================================
   モーダルウィンドウの制御
   ========================================================= */
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalImageContainer = document.getElementById('modal-image-container');
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');
    const modalSiteBtn = document.getElementById('modal-site-url');
    const modalGithubBtn = document.getElementById('modal-github-url');

    const modalTriggers = document.querySelectorAll('.modal-trigger');

    modalTriggers.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || '';
            const desc = card.getAttribute('data-desc') || '';
            const tech = card.getAttribute('data-tech') || '';
            const imgSrc = card.getAttribute('data-img') || '';
            const siteUrl = card.getAttribute('data-site-url') || '';
            const githubUrl = card.getAttribute('data-github-url') || '';

            // テキスト情報の反映
            modalTitle.textContent = title;
            modalTech.textContent = tech;
            modalDesc.textContent = desc;

            // 画像の反映
            if (imgSrc) {
                modalImageContainer.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
                modalImageContainer.style.display = 'flex';
            } else {
                modalImageContainer.innerHTML = '';
                modalImageContainer.style.display = 'none';
            }

            // 1. 「Webサイトを開く」ボタンの判定と設定
            if (siteUrl && siteUrl !== '#') {
                modalSiteBtn.href = siteUrl;
                modalSiteBtn.style.display = 'inline-flex';
            } else {
                modalSiteBtn.style.display = 'none';
            }

            // 2. 「GitHubコードを見る」ボタンの判定と設定
            if (githubUrl && githubUrl !== '#') {
                modalGithubBtn.href = githubUrl;
                modalGithubBtn.style.display = 'inline-flex';
            } else {
                modalGithubBtn.style.display = 'none';
            }

            // モーダルを表示
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // モーダルを閉じる処理
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 3. ヘッダーの現在地ハイライト機能 ---
    const navSections = document.querySelectorAll('.nav-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navOptions);

    navSections.forEach(section => {
        navObserver.observe(section);
    });

    // --- 4. トップへ戻るボタン（Back to Top） ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. ダーク/ライトモード切り替え機能 ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 6. タイピング風テキストアニメーション ---
    const typingTextTarget = document.getElementById('typing-text');
    const textToType = "Riko's Portfolio";
    let index = 0;

    if (typingTextTarget) {
        typingTextTarget.textContent = ''; // 初期化

        const typeWriter = () => {
            if (index < textToType.length) {
                typingTextTarget.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 120); // 打鍵スピード
            }
        };

        // タメを作って開始
        setTimeout(typeWriter, 400);
    }
    // --- 7. 作成物セクション：横回転リール制御 ---
    const reel = document.getElementById('works-reel');
    const prevBtn = document.getElementById('reel-prev');
    const nextBtn = document.getElementById('reel-next');
    const dotsContainer = document.getElementById('reel-dots');

    if (reel) {
        const cards = Array.from(reel.querySelectorAll('.work-card'));
        let activeIndex = 0;

        // インジケーター（ドット）の自動生成
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'reel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `作品 ${i + 1} を表示`);
            dot.addEventListener('click', () => scrollToCard(i));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.querySelectorAll('.reel-dot'));

        // 指定した番号のカードを中央へ移動
        const scrollToCard = (index) => {
            const targetCard = cards[index];
            if (!targetCard) return;
            const reelCenter = reel.offsetWidth / 2;
            const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
            reel.scrollTo({
                left: cardCenter - reelCenter,
                behavior: 'smooth'
            });
        };

        // 中央にあるカードを判定してアクティブ化
        const updateActiveCard = () => {
            const reelCenter = reel.scrollLeft + reel.offsetWidth / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            cards.forEach((card, i) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(reelCenter - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = i;
                }
            });

            activeIndex = closestIndex;
            cards.forEach((card, i) => card.classList.toggle('is-center', i === activeIndex));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
        };

        reel.addEventListener('scroll', updateActiveCard, { passive: true });
        window.addEventListener('resize', updateActiveCard);

        // 左右ボタン（端まで行ったらループ回転）
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const nextIdx = (activeIndex - 1 + cards.length) % cards.length;
                scrollToCard(nextIdx);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const nextIdx = (activeIndex + 1) % cards.length;
                scrollToCard(nextIdx);
            });
        }

        // マウスドラッグでの横スクロール対応
        let isDown = false;
        let startX = 0;
        let scrollStart = 0;
        let hasDragged = false;

        reel.addEventListener('mousedown', (e) => {
            isDown = true;
            hasDragged = false;
            reel.classList.add('dragging');
            startX = e.pageX - reel.offsetLeft;
            scrollStart = reel.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            reel.classList.remove('dragging');
            scrollToCard(activeIndex); // 離したら一番近いカードを中央にピタッと合わせる
        });

        reel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reel.offsetLeft;
            const walk = (x - startX) * 1.4;
            if (Math.abs(walk) > 6) hasDragged = true;
            reel.scrollLeft = scrollStart - walk;
        });

        // ドラッグ操作直後の誤クリック（モーダル誤爆）を防止
        reel.addEventListener('click', (e) => {
            if (hasDragged) {
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);

        // 初期状態の判定
        updateActiveCard();
    }
});