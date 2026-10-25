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
});