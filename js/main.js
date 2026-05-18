   (function() {
            // PRELOADER
            var preloader = document.getElementById('preloader');
            var done = false;
            function hide() { if(done) return; done = true; preloader.classList.add('fade-out'); setTimeout(function(){ if(preloader) preloader.remove(); }, 800); }
            var beans = document.getElementById('coffeeBeans');
            if (beans) {
                var icons = ['☕','✦','✧','◆','▪'];
                for(var i=0;i<15;i++){ var b=document.createElement('div'); b.className='bean'; b.textContent=icons[Math.floor(Math.random()*icons.length)]; b.style.left=Math.random()*100+'%'; b.style.animationDuration=(6+Math.random()*8)+'s'; b.style.animationDelay=(Math.random()*5)+'s'; b.style.fontSize=(10+Math.random()*14)+'px'; beans.appendChild(b); }
            }
            var fb = setTimeout(hide, 3000);
            window.addEventListener('load', function(){ clearTimeout(fb); setTimeout(hide, 1000); });

            // AOS
            AOS.init({ duration: 800, once: true, offset: 50 });

            // Navbar scroll + scroll top
            var navbar = document.getElementById('navbar');
            var scrollTopBtn = document.getElementById('scrollTop');
            window.addEventListener('scroll', function(){
                var y = window.scrollY;
                if (navbar) navbar.classList.toggle('scrolled', y > 50);
                if (scrollTopBtn) scrollTopBtn.classList.toggle('vis', y > 500);
            });
            if (scrollTopBtn) {
                scrollTopBtn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });
            }

            // MOBILE MENU
            var navToggle = document.getElementById('navToggle');
            var navMenu = document.getElementById('navMenu');
            
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', function(e){
                    e.stopPropagation();
                    navToggle.classList.toggle('act');
                    navMenu.classList.toggle('act');
                    if (navMenu.classList.contains('act')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                });
            }

            // SMOOTH SCROLL FUNCIONAL
            function getElementOffsetY(element) {
                var rect = element.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return rect.top + scrollTop - 85;
            }

            var allLinks = document.querySelectorAll('a[href^="#"]');
            allLinks.forEach(function(link){
                link.addEventListener('click', function(e){
                    var targetId = this.getAttribute('href');
                    if (targetId === '#') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (navMenu && navMenu.classList.contains('act') && navToggle) {
                            navToggle.click();
                            document.body.style.overflow = '';
                        }
                        return;
                    }
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        if (navMenu && navMenu.classList.contains('act') && navToggle) {
                            navToggle.click();
                            document.body.style.overflow = '';
                            setTimeout(function() {
                                var offsetY = getElementOffsetY(targetElement);
                                window.scrollTo({ top: offsetY, behavior: 'smooth' });
                            }, 100);
                        } else {
                            var offsetY = getElementOffsetY(targetElement);
                            window.scrollTo({ top: offsetY, behavior: 'smooth' });
                        }
                    }
                });
            });

            // HERO CAROUSEL
            (function(){
                var slides = document.querySelectorAll('.c-slide');
                var indicators = document.querySelectorAll('.c-ind span');
                if (slides.length && indicators.length) {
                    var current = 0;
                    var timer;
                    function goTo(i){
                        slides[current].classList.remove('act');
                        indicators[current].classList.remove('act');
                        current = ((i % slides.length) + slides.length) % slides.length;
                        slides[current].classList.add('act');
                        indicators[current].classList.add('act');
                    }
                    var prevBtn = document.getElementById('cPrev');
                    var nextBtn = document.getElementById('cNext');
                    if (prevBtn) prevBtn.addEventListener('click', function(){ goTo(current-1); resetTimer(); });
                    if (nextBtn) nextBtn.addEventListener('click', function(){ goTo(current+1); resetTimer(); });
                    indicators.forEach(function(ind){ ind.addEventListener('click', function(){ goTo(+this.dataset.i); resetTimer(); }); });
                    function startTimer(){ timer = setInterval(function(){ goTo(current+1); }, 6000); }
                    function resetTimer(){ clearInterval(timer); startTimer(); }
                    startTimer();
                }
            })();

            // TESTIMONIALS
            (function(){
                var slides = document.querySelectorAll('.test-slide');
                var dots = document.querySelectorAll('.test-dot');
                if (slides.length && dots.length) {
                    var current = 0;
                    var timer;
                    function goTo(i){
                        slides[current].classList.remove('act');
                        dots[current].classList.remove('act');
                        current = ((i % slides.length) + slides.length) % slides.length;
                        slides[current].classList.add('act');
                        dots[current].classList.add('act');
                    }
                    var tPrev = document.getElementById('tPrev');
                    var tNext = document.getElementById('tNext');
                    if (tPrev) tPrev.addEventListener('click', function(){ goTo(current-1); resetTimer(); });
                    if (tNext) tNext.addEventListener('click', function(){ goTo(current+1); resetTimer(); });
                    dots.forEach(function(dot){ dot.addEventListener('click', function(){ goTo(+this.dataset.i); resetTimer(); }); });
                    function startTimer(){ timer = setInterval(function(){ goTo(current+1); }, 7000); }
                    function resetTimer(){ clearInterval(timer); startTimer(); }
                    startTimer();
                }
            })();

            // COUNTER ANIMATION
            (function(){
                var counters = document.querySelectorAll('.counter-num');
                if (counters.length) {
                    var done = false;
                    function startCount(){
                        counters.forEach(function(c){
                            var target = parseInt(c.getAttribute('data-target'));
                            var duration = 2000;
                            var startTime = performance.now();
                            function update(now){
                                var elapsed = now - startTime;
                                var progress = Math.min(elapsed / duration, 1);
                                var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                                c.textContent = Math.floor(ease * target).toLocaleString('pt-BR');
                                if(progress < 1) requestAnimationFrame(update);
                                else c.textContent = target.toLocaleString('pt-BR');
                            }
                            requestAnimationFrame(update);
                        });
                    }
                    var observer = new IntersectionObserver(function(entries){
                        if(entries[0].isIntersecting && !done){ done = true; startCount(); }
                    }, { threshold: 0.3 });
                    var bar = document.querySelector('.counter-bar');
                    if(bar) observer.observe(bar);
                }
            })();

            // CONTACT FORM
            var contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e){ e.preventDefault(); alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.\nObrigado por escolher o Prime Café! ☕'); this.reset(); });
            }
            
            // GARANTIR MENU NO DESKTOP APÓS REDIMENSIONAMENTO
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    if (navMenu && navMenu.classList.contains('act')) {
                        navMenu.classList.remove('act');
                        if (navToggle) navToggle.classList.remove('act');
                        document.body.style.overflow = '';
                    }
                }
            });
        })();