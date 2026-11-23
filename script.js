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
    // --- 7. 作成物セクション：円柱無限リール＆詳細説明連動 ---
    const reel = document.getElementById('works-reel');
    const prevBtn = document.getElementById('reel-prev');
    const nextBtn = document.getElementById('reel-next');
    const dotsContainer = document.getElementById('reel-dots');

    // 下部の詳細説明欄の要素
    const detailBox = document.getElementById('reel-detail');
    const detailTitle = document.getElementById('reel-detail-title');
    const detailTech = document.getElementById('reel-detail-tech');
    const detailDesc = document.getElementById('reel-detail-desc');
    const detailSite = document.getElementById('reel-detail-site');
    const detailGithub = document.getElementById('reel-detail-github');

    if (reel) {
        const originalCards = Array.from(reel.querySelectorAll('.work-card'));
        const total = originalCards.length;

        // 円柱ループ用に前後に全カードのクローン（複製）を追加
        const prependClones = originalCards.map(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('is-clone');
            return clone;
        });
        const appendClones = originalCards.map(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('is-clone');
            return clone;
        });

        prependClones.forEach(clone => reel.insertBefore(clone, originalCards[0]));
        appendClones.forEach(clone => reel.appendChild(clone));

        const allCards = Array.from(reel.querySelectorAll('.work-card'));

        // クローンも含めた全カードにモーダルクリックイベントを再付与
        allCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title') || '';
                const desc = card.getAttribute('data-desc') || '';
                const tech = card.getAttribute('data-tech') || '';
                const imgSrc = card.getAttribute('data-img') || '';
                const siteUrl = card.getAttribute('data-site-url') || '';
                const githubUrl = card.getAttribute('data-github-url') || '';

                modalTitle.textContent = title;
                modalTech.textContent = tech;
                modalDesc.textContent = desc;

                if (imgSrc) {
                    modalImageContainer.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
                    modalImageContainer.style.display = 'flex';
                } else {
                    modalImageContainer.innerHTML = '';
                    modalImageContainer.style.display = 'none';
                }

                if (siteUrl && siteUrl !== '#') {
                    modalSiteBtn.href = siteUrl;
                    modalSiteBtn.style.display = 'inline-flex';
                } else {
                    modalSiteBtn.style.display = 'none';
                }

                if (githubUrl && githubUrl !== '#') {
                    modalGithubBtn.href = githubUrl;
                    modalGithubBtn.style.display = 'inline-flex';
                } else {
                    modalGithubBtn.style.display = 'none';
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // インジケーター（ドット）の生成
        originalCards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'reel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `作品 ${i + 1} を表示`);
            dot.addEventListener('click', () => scrollToAllIndex(total + i, true));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.querySelectorAll('.reel-dot'));

        let currentAllIndex = total; // 中央セットの先頭（本物の1枚目）から開始
        let lastRealIndex = -1;
        let scrollEndTimer = null;

        // 指定インデックスのカードを中央へ移動
        const scrollToAllIndex = (allIdx, smooth = true) => {
            const targetCard = allCards[allIdx];
            if (!targetCard) return;
            const reelCenter = reel.offsetWidth / 2;
            const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;

            if (!smooth) {
                reel.classList.add('no-smooth');
                reel.scrollLeft = cardCenter - reelCenter;
                // 強制リフロー後にsmoothを戻す
                void reel.offsetWidth;
                reel.classList.remove('no-smooth');
            } else {
                reel.scrollTo({
                    left: cardCenter - reelCenter,
                    behavior: 'smooth'
                });
            }
        };

        // 下部の詳細説明欄を更新
        const updateDetailPanel = (realIndex) => {
            if (realIndex === lastRealIndex) return;
            lastRealIndex = realIndex;

            const card = originalCards[realIndex];
            if (!card || !detailBox) return;

            detailBox.classList.add('updating');
            setTimeout(() => {
                detailTitle.textContent = card.getAttribute('data-title') || '';
                detailTech.textContent = card.getAttribute('data-tech') || '';
                detailDesc.textContent = card.getAttribute('data-detail-desc') || card.getAttribute('data-desc') || '';

                const siteUrl = card.getAttribute('data-site-url') || '';
                const githubUrl = card.getAttribute('data-github-url') || '';

                if (siteUrl && siteUrl !== '#') {
                    detailSite.href = siteUrl;
                    detailSite.style.display = 'inline-flex';
                } else {
                    detailSite.style.display = 'none';
                }

                if (githubUrl && githubUrl !== '#') {
                    detailGithub.href = githubUrl;
                    detailGithub.style.display = 'inline-flex';
                } else {
                    detailGithub.style.display = 'none';
                }

                detailBox.classList.remove('updating');
            }, 140);
        };

        // スクロール位置から中央カード判定＆円柱ループのシームレスワープ
        const handleReelUpdate = () => {
            const reelCenter = reel.scrollLeft + reel.offsetWidth / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            allCards.forEach((card, i) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(reelCenter - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = i;
                }
            });

            currentAllIndex = closestIndex;
            const realIndex = ((closestIndex % total) + total) % total;

            // 見た目（中央・左傾き・右傾き）とドットの更新
            allCards.forEach((card, i) => {
                card.classList.toggle('is-center', i === closestIndex);
                card.classList.toggle('is-right', i > closestIndex);
            });
            dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));

            // 下の説明欄を更新
            updateDetailPanel(realIndex);

            // スクロール停止後にクローン領域にいたら本物の位置へ瞬時ワープ
            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                if (currentAllIndex < total) {
                    scrollToAllIndex(currentAllIndex + total, false);
                } else if (currentAllIndex >= total * 2) {
                    scrollToAllIndex(currentAllIndex - total, false);
                }
            }, 120);
        };

        reel.addEventListener('scroll', handleReelUpdate, { passive: true });
        window.addEventListener('resize', () => scrollToAllIndex(currentAllIndex, false));

        // 左右ボタン（無限に同じ方向へ回り続ける）
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                scrollToAllIndex(currentAllIndex - 1, true);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                scrollToAllIndex(currentAllIndex + 1, true);
            });
        }

        // マウスドラッグ操作
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
            scrollToAllIndex(currentAllIndex, true);
        });

        reel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reel.offsetLeft;
            const walk = (x - startX) * 1.4;
            if (Math.abs(walk) > 6) hasDragged = true;
            reel.scrollLeft = scrollStart - walk;
        });

        reel.addEventListener('click', (e) => {
            if (hasDragged) {
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);

        // 初期位置を中央セットの1枚目にセット
        requestAnimationFrame(() => {
            scrollToAllIndex(total, false);
            handleReelUpdate();
        });
    }
    // --- 8. 連絡先：メールアドレスのワンクリックコピー ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const contactEmail = document.getElementById('contact-email');

    if (copyEmailBtn && contactEmail) {
        copyEmailBtn.addEventListener('click', async () => {
            const emailText = contactEmail.textContent.trim();
            try {
                await navigator.clipboard.writeText(emailText);
                copyEmailBtn.textContent = 'コピー完了！';
                copyEmailBtn.classList.add('copied');
                setTimeout(() => {
                    copyEmailBtn.textContent = 'コピー';
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('コピーに失敗しました:', err);
            }
        });
    } 
// --- 自己紹介カードの表裏フリップ ---
    const aboutFlipCard = document.getElementById('about-flip-card');
    if (aboutFlipCard) {
        aboutFlipCard.addEventListener('click', () => {
            aboutFlipCard.classList.toggle('is-flipped');
        });
    }
});