document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('active'); // Changed show to active
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('active');
        }
    });

    // Scroll to Top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // TOC Generator for Blog Details
    const tocContainer = document.querySelector('.toc-content');
    if (tocContainer) {
        const article = document.querySelector('.blog-detail-content');
        if (article) {
            const headings = article.querySelectorAll('h2, h3');
            if (headings.length > 0) {
                const tocList = document.createElement('ul');

                headings.forEach((heading, index) => {
                    const id = `heading-${index}`;
                    heading.id = id;

                    const li = document.createElement('li');
                    li.style.paddingLeft = heading.tagName === 'H3' ? '20px' : '0';

                    const a = document.createElement('a');
                    a.href = `#${id}`;
                    a.textContent = heading.textContent;

                    li.appendChild(a);
                    tocList.appendChild(li);
                });

                tocContainer.appendChild(tocList);
            } else {
                const tocBox = document.querySelector('.toc-box');
                if (tocBox) tocBox.style.display = 'none';
            }
        }

        // TOC Toggle
        const tocHeader = document.querySelector('.toc-header');
        if (tocHeader) {
            tocHeader.addEventListener('click', () => {
                tocContainer.classList.toggle('collapsed');
                const icon = tocHeader.querySelector('.toc-icon');
                if (icon) icon.textContent = tocContainer.classList.contains('collapsed') ? 'expand_more' : 'expand_less';
            });
        }
    }

    // Share Buttons Logic
    window.shareTo = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };
});
