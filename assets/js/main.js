document.addEventListener('DOMContentLoaded', () => {
    // Scroll Up Button Visibility
    const btnScrollUp = document.getElementById('btnScrollUp');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        });
    }
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnScrollUp.style.display = 'flex';
        } else {
            btnScrollUp.style.display = 'none';
        }
    });

    // Scroll to Top
    btnScrollUp.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Auto TOC for Blog Detail
    const tocContainer = document.getElementById('tocContent');
    const blogContent = document.querySelector('.blog-content');

    if (tocContainer && blogContent) {
        const headings = blogContent.querySelectorAll('h2, h3');
        const tocList = document.createElement('ul');

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';

            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;

            li.appendChild(a);
            tocList.appendChild(li);
        });

        tocContainer.appendChild(tocList);

        // TOC Toggle
        const tocHeader = document.querySelector('.toc-header');
        tocHeader.addEventListener('click', () => {
            tocContainer.classList.toggle('hidden');
            const icon = tocHeader.querySelector('.material-icons');
            icon.textContent = tocContainer.classList.contains('hidden') ? 'expand_more' : 'expand_less';
        });
    }

    // Share Functionality (Simple)
    window.sharePost = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let shareUrl = '';

        if (platform === 'wa') shareUrl = `https://wa.me/?text=${title}%20${url}`;
        if (platform === 'fb') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        if (platform === 'tw') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

        if (shareUrl) window.open(shareUrl, '_blank');
    };
});
