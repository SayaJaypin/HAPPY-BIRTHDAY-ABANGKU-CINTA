/**
 * 🎁 PREMIUM BIRTHDAY ENGINE - FINAL PATCH (50 UNIQUE QUOTES)
 * Architecture: Mobile-First, Vanilla JS, Procedural Animation, Three.js
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PROCEDURAL FLOWER OPENING ANIMATION ---
    const flowerCanvas = document.getElementById('flower-canvas');
    const fctx = flowerCanvas.getContext('2d');
    let fw = flowerCanvas.width = window.innerWidth;
    let fh = flowerCanvas.height = window.innerHeight;
    let petals = [];
    
    class Petal {
        constructor() {
            this.x = Math.random() * fw;
            this.y = Math.random() * -fh;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = Math.random() * 2 + 1;
            this.size = Math.random() * 6 + 4;
            this.angle = Math.random() * 360;
            this.spin = (Math.random() - 0.5) * 4;
            this.color = `hsla(${Math.random() * 30 + 330}, 70%, 75%, ${Math.random() * 0.5 + 0.3})`;
        }
        update() {
            this.x += this.vx; this.y += this.vy; this.angle += this.spin;
            if (this.y > fh) { this.y = -20; this.x = Math.random() * fw; }
        }
        draw() {
            fctx.save();
            fctx.translate(this.x, this.y);
            fctx.rotate(this.angle * Math.PI / 180);
            fctx.fillStyle = this.color;
            fctx.shadowBlur = 10; fctx.shadowColor = this.color;
            fctx.beginPath();
            fctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            fctx.fill();
            fctx.restore();
        }
    }

    for (let i = 0; i < 80; i++) petals.push(new Petal());

    let animationFrame;
    function animateFlowers() {
        fctx.clearRect(0, 0, fw, fh);
        petals.forEach(p => { p.update(); p.draw(); });
        animationFrame = requestAnimationFrame(animateFlowers);
    }
    animateFlowers();

    // --- 2. TRANSITION TO MAIN SITE ---
    const startBtn = document.getElementById('start-journey');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const bgm = document.getElementById('bgm');
    const discWrapper = document.querySelector('.disc-wrapper');

    startBtn.addEventListener('click', () => {
        gsap.to(openingScreen, {
            opacity: 0, duration: 1.5, onComplete: () => {
                openingScreen.style.display = 'none';
                cancelAnimationFrame(animationFrame);
                mainContent.classList.remove('hidden');
                bgm.volume = 0.5;
                bgm.play().catch(e => console.log("Auto-play prevented"));
                discWrapper.classList.add('playing');
                initThreeJS();
            }
        });
    });

    // --- 3. AUDIO CONTROLS ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); discWrapper.classList.add('playing'); playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; }
        else { bgm.pause(); discWrapper.classList.remove('playing'); playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; }
    });

    // --- 4. REALTIME CLOCK (WIB) ---
    function updateClock() {
        const now = new Date();
        const options = { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('current-time').textContent = now.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
    }
    setInterval(updateClock, 1000); updateClock();

    // --- 5. 50 UNIQUE QUOTES ENGINE ---
    const quotesList = [
        "Dede perhatiin, abang sedikit demi sedikit berubah jadi lebih baik dari awal dede kenal xixixixi — DEDE SUKAAA MWAHHH ❤❤❤",
        "Terima kasih abang sudah selalu baik sama dede ❤ dan selalu menyayangi dede yang berantakan ini.",
        "Setiap detik bersamamu adalah puisi yang tak pernah selesai kubaca.",
        "Kamu adalah hal terbaik yang pernah terjadi di hidupku yang kebetulan ini.",
        "Melihatmu tersenyum adalah caraku melihat surga kecil di dunia.",
        "Tidak ada tempat yang lebih nyaman selain di pelukanmu.",
        "Aku jatuh cinta padamu setiap hari, lagi dan lagi, dengan cara yang berbeda.",
        "Kamu adalah jawaban dari doa-doa yang bahkan tidak tahu cara kuucapkan.",
        "Duniaku lebih berwarna karena ada kamu di dalamnya.",
        "Menua bersamamu adalah satu-satunya cita-citaku saat ini.",
        "Caramu menatapku selalu berhasil membuat hatiku berdebar, sampai sekarang.",
        "Aku suka caramu mendengarkan semua ceritaku, bahkan yang paling tidak penting sekalipun.",
        "Kamu menyembuhkan bagian diriku yang tidak pernah kamu hancurkan.",
        "Suaramu adalah melodi favorit yang selalu ingin kudengar setiap pagi.",
        "Bersamamu, aku selalu merasa cukup.",
        "Tawamu itu nular, dan itu hal yang paling dede suka dari abang.",
        "Kamu selalu tahu cara membuatku tertawa saat aku sedang menangis.",
        "Aku suka bagaimana kita bisa diam bersama tanpa pernah merasa canggung.",
        "Kamu membuat hari Senin yang berat terasa seperti hari Sabtu yang santai.",
        "Bahkan hal paling membosankan jadi sangat seru kalau dilakuin bareng abang.",
        "Aku mengagumi caramu berpikir dan caramu melihat dunia.",
        "Semangat abang dalam mengejar sesuatu selalu bikin dede bangga.",
        "Cara abang memperlakukan orang lain bikin dede makin kagum.",
        "Aku suka wangi parfum kamu yang selalu nempel di ingatan.",
        "Pelukan abang adalah tempat persembunyian terbaik dari dunia yang berisik.",
        "Kamu selalu mendukung mimpiku, sekecil atau sekonyol apa pun itu.",
        "Ketulusan kamu bikin dede belajar banyak tentang arti cinta sebenarnya.",
        "Aku selalu suka caramu memanggil namaku.",
        "Setiap notif pesan dari abang selalu sukses bikin senyum-senyum sendiri.",
        "Kamu bikin dede merasa cantik apa adanya, tanpa harus berusaha keras.",
        "Aku suka caramu tiba-tiba menggenggam tanganku saat kita lagi jalan.",
        "Kamu adalah orang pertama yang ingin aku kasih tahu saat ada hal bagus terjadi.",
        "Dan kamu juga orang pertama yang aku cari pas dunia lagi nggak ramah.",
        "Aku suka caramu menenangkan dede pas lagi panik atau overthinking.",
        "Terima kasih udah sabar banget ngadepin sifat dede yang kadang keras kepala ini.",
        "Kamu mengajariku bahwa cinta yang sehat dan aman itu benar-benar ada.",
        "Dede ngerasa aman banget pokoknya kalau ada abang di deket dede.",
        "Mata abang kalau lagi ketawa itu lucu banget, tahu nggak?",
        "Aku suka kita bisa bahas topik paling dalem sampai hal paling random semalaman.",
        "Kamu bikin dede selalu ingin jadi versi terbaik dari diri dede sendiri.",
        "Setiap janji yang abang buat selalu berusaha abang tepatin.",
        "Kamu selalu menghargai hal-hal kecil yang dede kasih.",
        "Aku suka caramu selalu berusaha meluangkan waktu di tengah kesibukanmu.",
        "Kamu nggak pernah gengsi buat minta maaf kalau kamu memang salah.",
        "Dan abang selalu mudah memaafkan pas dede yang bikin salah.",
        "Dede selalu bangga bisa panggil abang sebagai pacar dede.",
        "Kamu bukan cuma pacar, tapi juga sahabat terbaik dede.",
        "Setiap memori yang kita buat bareng-bareng selalu jadi harta karun buat aku.",
        "Aku suka fakta bahwa kita bisa merencanakan masa depan kita bersama.",
        "Lebih dari segalanya, aku cuma butuh abang. Kemarin, hari ini, dan besok."
    ];

    const slider = document.getElementById('quotes-slider');
    quotesList.forEach((q, index) => {
        let div = document.createElement('div');
        div.className = `quote-card ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `<p class="quote-text">"${q}"</p><p class="quote-number">${index + 1} / 50</p>`;
        slider.appendChild(div);
    });

    let currentQuote = 0;
    const cards = document.querySelectorAll('.quote-card');
    document.getElementById('next-quote').addEventListener('click', () => {
        cards[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % cards.length;
        cards[currentQuote].classList.add('active');
    });
    document.getElementById('prev-quote').addEventListener('click', () => {
        cards[currentQuote].classList.remove('active');
        currentQuote = (currentQuote - 1 + cards.length) % cards.length;
        cards[currentQuote].classList.add('active');
    });

    // --- 6. MAKE A WISH (MIC DETECTION) ---
    const blowBtn = document.getElementById('blow-btn');
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');
    
    function extinguishCandle() {
        flame.style.opacity = '0';
        setTimeout(() => flame.classList.add('hidden'), 500);
        smoke.classList.remove('hidden');
        blowBtn.style.display = 'none';
        const wishMsg = document.getElementById('wish-message');
        wishMsg.classList.remove('hidden');
        gsap.from(wishMsg, {y: 20, opacity: 0, duration: 1});
    }
    blowBtn.addEventListener('click', extinguishCandle);

    // --- 7. MINI GAMES HUB ---
    window.playGame = function(type) {
        const overlay = document.getElementById('game-overlay');
        const area = document.getElementById('game-area');
        overlay.classList.remove('hidden');
        area.innerHTML = ''; 
        
        if(type === 'catch') {
            area.innerHTML = '<h3 class="text-white mb-4 text-center">Tangkap Hatinya 5 Kali!</h3>';
            let heart = document.createElement('i');
            heart.className = 'fa-solid fa-heart catch-heart';
            area.appendChild(heart);
            
            let score = 0;
            const moveHeart = () => {
                heart.style.top = Math.floor(Math.random() * 70 + 10) + '%';
                heart.style.left = Math.floor(Math.random() * 70 + 10) + '%';
            };
            moveHeart();
            
            heart.onclick = () => {
                score++;
                if(score >= 5) {
                    area.innerHTML = '<h3 class="romantic-text text-center">Yeay! Hati aku berhasil abang tangkap! ❤️</h3><p class="text-white mt-4 text-center">Pesan: Aku selalu kangen kamu.</p>';
                } else {
                    moveHeart();
                }
            };
        } 
        else if (type === 'memory') {
            area.innerHTML = '<h3 class="text-white mb-4 text-center">Cocokkan Hatinya!</h3>';
            let grid = document.createElement('div');
            grid.className = 'memory-grid';
            
            const emojis = ['💖', '💖', '🌹', '🌹', '✨', '✨', '🎁', '🎁'];
            emojis.sort(() => 0.5 - Math.random());
            
            let hasFlippedCard = false;
            let lockBoard = false;
            let firstCard, secondCard;
            let matchCount = 0;

            emojis.forEach(emoji => {
                let card = document.createElement('div');
                card.className = 'memory-card';
                card.innerHTML = `<span class="cover"><i class="fa-solid fa-question"></i></span><span class="content">${emoji}</span>`;
                
                card.addEventListener('click', function() {
                    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
                    this.classList.add('flipped');
                    
                    if (!hasFlippedCard) {
                        hasFlippedCard = true;
                        firstCard = this;
                        return;
                    }
                    
                    secondCard = this;
                    lockBoard = true;
                    
                    let isMatch = firstCard.querySelector('.content').innerHTML === secondCard.querySelector('.content').innerHTML;
                    
                    if (isMatch) {
                        matchCount++;
                        firstCard = null; secondCard = null; lockBoard = false; hasFlippedCard = false;
                        if(matchCount === 4) {
                            setTimeout(() => {
                                area.innerHTML = '<h3 class="romantic-text text-center">Yeay Abang Menang! 🎉</h3><p class="text-white mt-4 text-center">Pesan: Ingatanmu tentang kita selalu membuatku tersenyum.</p>';
                            }, 500);
                        }
                    } else {
                        setTimeout(() => {
                            firstCard.classList.remove('flipped');
                            secondCard.classList.remove('flipped');
                            firstCard = null; secondCard = null; lockBoard = false; hasFlippedCard = false;
                        }, 1000);
                    }
                });
                grid.appendChild(card);
            });
            area.appendChild(grid);
        }
        else {
            area.innerHTML = `<div class="text-center"><i class="fa-solid fa-lock text-rose" style="font-size: 3rem; margin-bottom: 1rem;"></i><h3 class="text-white">Segera Hadir</h3><p class="text-soft mt-2">Gamenya kuncinya ada di hati dede! 💖</p></div>`;
        }
    };

    window.closeGame = function() {
        document.getElementById('game-overlay').classList.add('hidden');
    };

    // --- 8. THREE.JS 3D LOVE EXPERIENCE ---
    function createCircleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }

    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        if(!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10; 

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i+=3) {
            const t = Math.random() * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            const scatter = (Math.random() - 0.5) * 0.4;
            posArray[i] = (x * 0.18) + scatter;
            posArray[i+1] = (y * 0.18) + scatter;
            posArray[i+2] = (Math.random() - 0.5) * 4;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.18,
            color: 0xffcba4,
            transparent: true,
            opacity: 0.9,
            map: createCircleTexture(),
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        let mouseX = 0; let mouseY = 0;
        container.addEventListener('touchmove', (e) => {
            let rect = container.getBoundingClientRect();
            mouseX = (e.touches[0].clientX - rect.left) / container.clientWidth - 0.5;
            mouseY = (e.touches[0].clientY - rect.top) / container.clientHeight - 0.5;
        }, {passive: true});

        const clock = new THREE.Clock();
        function animateThree() {
            requestAnimationFrame(animateThree);
            const elapsedTime = clock.getElapsedTime();
            
            particlesMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.5 + (mouseX * 1.5);
            particlesMesh.rotation.x = (mouseY * 1.5);
            
            const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
            particlesMesh.scale.set(scale, scale, scale);
            
            renderer.render(scene, camera);
        }
        animateThree();

        const observerThree = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setTimeout(() => { document.getElementById('three-message').style.opacity = '1'; }, 2000);
            }
        });
        observerThree.observe(container);
        
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // --- 9. SCROLL REVEAL ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});
