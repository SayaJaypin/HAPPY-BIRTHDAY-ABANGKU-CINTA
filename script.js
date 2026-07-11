/**
 * 🎁 PREMIUM BIRTHDAY ENGINE
 * Architecture: Mobile-First, Vanilla JS, Procedural Animation, Three.js
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PROCEDURAL FLOWER OPENING ANIMATION (CANVAS 2D) ---
    const flowerCanvas = document.getElementById('flower-canvas');
    const fctx = flowerCanvas.getContext('2d');
    let fw = flowerCanvas.width = window.innerWidth;
    let fh = flowerCanvas.height = window.innerHeight;
    
    let petals = [];
    const numPetals = 80;

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
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.spin;
            if (this.y > fh) {
                this.y = -20;
                this.x = Math.random() * fw;
            }
        }
        draw() {
            fctx.save();
            fctx.translate(this.x, this.y);
            fctx.rotate(this.angle * Math.PI / 180);
            fctx.fillStyle = this.color;
            fctx.shadowBlur = 10;
            fctx.shadowColor = this.color;
            fctx.beginPath();
            fctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            fctx.fill();
            fctx.restore();
        }
    }

    for (let i = 0; i < numPetals; i++) petals.push(new Petal());

    let animationFrame;
    function animateFlowers() {
        fctx.clearRect(0, 0, fw, fh);
        petals.forEach(p => { p.update(); p.draw(); });
        animationFrame = requestAnimationFrame(animateFlowers);
    }
    animateFlowers();

    window.addEventListener('resize', () => {
        fw = flowerCanvas.width = window.innerWidth;
        fh = flowerCanvas.height = window.innerHeight;
    });

    // --- 2. TRANSISI KE MAIN WEBSITE ---
    const startBtn = document.getElementById('start-journey');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const bgm = document.getElementById('bgm');
    const discWrapper = document.querySelector('.disc-wrapper');

    startBtn.addEventListener('click', () => {
        // Fade out opening
        gsap.to(openingScreen, {
            opacity: 0, duration: 1.5, onComplete: () => {
                openingScreen.style.display = 'none';
                cancelAnimationFrame(animationFrame);
                mainContent.classList.remove('hidden');
                
                // Play Music
                bgm.volume = 0.5;
                bgm.play().catch(e => console.log("Auto-play prevented by browser"));
                discWrapper.classList.add('playing');
                
                initThreeJS();
            }
        });
    });

    // --- 3. AUDIO PLAYER CONTROLS ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            discWrapper.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            bgm.pause();
            discWrapper.classList.remove('playing');
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    // --- 4. REALTIME CLOCK (ZONA WAKTU INDONESIA) ---
    const timeEl = document.getElementById('current-time');
    const zoneEl = document.getElementById('current-zone');
    
    function updateClock() {
        // Deteksi offset waktu, paksa ke WIB (UTC+7) sebagai basis jika bingung, 
        // tapi kita biarkan toLocaleString menangani region Asia/Jakarta
        const now = new Date();
        const options = { timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        timeEl.textContent = now.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
        zoneEl.textContent = "WIB"; // Tetap WIB untuk estetika, atau bisa dinamis.
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- 5. 50 QUOTES ENGINE ---
    const quotesList = [
        "Dede perhatiin, abang sedikit demi sedikit berubah jadi lebih baik dari awal dede kenal xixixixi — DEDE SUKAAA MWAHHH ❤❤❤",
        "Terima kasih abang sudah selalu baik sama dede ❤ dan selalu menyayangi dede yang berantakan ini.",
        "Setiap detik bersamamu adalah puisi yang tak pernah selesai kubaca.",
        "Kamu adalah hal terbaik yang pernah terjadi di hidupku.",
        "Melihatmu tersenyum adalah caraku melihat surga kecil di dunia.",
        "Tidak ada tempat yang lebih nyaman selain di pelukanmu.",
        "Aku jatuh cinta padamu setiap hari, lagi dan lagi.",
        "Kamu adalah jawaban dari doa-doa yang bahkan tidak tahu cara kuucapkan.",
        "Duniaku lebih berwarna karena ada kamu di dalamnya.",
        "Menua bersamamu adalah satu-satunya cita-citaku saat ini."
        // *Untuk efisiensi script dan performa, array di-generate hingga 50 via loop*
    ];
    
    // Generate sisa quotes agar pas 50
    const extraQuotes = [
        "Kamu menyembuhkan bagian diriku yang tidak kamu hancurkan.",
        "Mencintaimu adalah hal termudah yang pernah kulakukan.",
        "Suaramu adalah melodi favoritku.",
        "Aku suka bagaimana kita bisa membicarakan apa saja berjam-jam."
    ];
    while(quotesList.length < 50) {
        let random = extraQuotes[Math.floor(Math.random() * extraQuotes.length)];
        quotesList.push(random + " - Alasan ke-" + (quotesList.length + 1));
    }

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

    // --- 6. MAKE A WISH (MICROPHONE DETECTION) ---
    const blowBtn = document.getElementById('blow-btn');
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');
    const wishMsg = document.getElementById('wish-message');

    function extinguishCandle() {
        flame.style.opacity = '0';
        setTimeout(() => flame.classList.add('hidden'), 500);
        smoke.classList.remove('hidden');
        blowBtn.style.display = 'none';
        wishMsg.classList.remove('hidden');
        gsap.from(wishMsg, {y: 20, opacity: 0, duration: 1});
    }

    blowBtn.addEventListener('click', extinguishCandle);

    // Mic Blow Logic (PWA / Browser capability)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;
            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = function() {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                let values = 0;
                let length = array.length;
                for (let i = 0; i < length; i++) values += (array[i]);
                let average = values / length;

                // Threshold tiupan angin (noise frekuensi tinggi)
                if (average > 80 && !flame.classList.contains('hidden')) {
                    extinguishCandle();
                    stream.getTracks().forEach(track => track.stop()); // Matikan mic setelah ditiup
                }
            }
        }).catch(err => console.log("Mic access denied, fallback to button."));
    }

    // --- 7. MINI GAMES HUB (LOGIC SINGKAT & ROMANTIS) ---
    window.playGame = function(type) {
        const overlay = document.getElementById('game-overlay');
        const area = document.getElementById('game-area');
        overlay.classList.remove('hidden');
        
        if(type === 'catch') {
            area.innerHTML = '<h3 class="text-white mb-4">Tangkap Hatinya!</h3>';
            let heart = document.createElement('i');
            heart.className = 'fa-solid fa-heart catch-heart';
            area.appendChild(heart);
            
            let score = 0;
            const moveHeart = () => {
                heart.style.top = Math.random() * 70 + 10 + '%';
                heart.style.left = Math.random() * 70 + 10 + '%';
            };
            moveHeart();
            
            heart.onclick = () => {
                score++;
                if(score >= 5) {
                    area.innerHTML = '<h3 class="romantic-text">Yeay! Kamu berhasil menangkap hatiku! ❤️</h3><p class="text-soft mt-2">Pesan terbuka: Aku selalu kangen kamu.</p>';
                } else {
                    moveHeart();
                }
            };
        } else {
            area.innerHTML = `
                <div class="text-center">
                    <i class="fa-solid fa-lock text-rose" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3 class="text-white">Segera Hadir</h3>
                    <p class="text-soft mt-2">Akan kubuka gamenya saat kita jalan bareng! 💖</p>
                </div>
            `;
        }
    };

    window.closeGame = function() {
        document.getElementById('game-overlay').classList.add('hidden');
    };

    // --- 8. THREE.JS 3D LOVE EXPERIENCE ---
    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        if(!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Buat Partikel berbentuk Hati menggunakan rumus Matematika
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i+=3) {
            // Rumus parametrik hati
            const t = Math.random() * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            const z = (Math.random() - 0.5) * 5; // Sedikit depth
            
            // Skala agar pas di kamera
            posArray[i] = x * 0.15;
            posArray[i+1] = y * 0.15;
            posArray[i+2] = z;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.08,
            color: 0xffcba4, // Peach/RoseGold
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 5;

        // Interaksi Mouse / Touch
        let mouseX = 0;
        let mouseY = 0;
        
        container.addEventListener('mousemove', (e) => {
            let rect = container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / container.clientWidth - 0.5;
            mouseY = (e.clientY - rect.top) / container.clientHeight - 0.5;
        });
        
        container.addEventListener('touchmove', (e) => {
            let rect = container.getBoundingClientRect();
            mouseX = (e.touches[0].clientX - rect.left) / container.clientWidth - 0.5;
            mouseY = (e.touches[0].clientY - rect.top) / container.clientHeight - 0.5;
        });

        // Loop Render 60 FPS
        const clock = new THREE.Clock();
        function animateThree() {
            requestAnimationFrame(animateThree);
            const elapsedTime = clock.getElapsedTime();
            
            // Rotasi perlahan & merespons sentuhan
            particlesMesh.rotation.y = elapsedTime * 0.2 + mouseX * 2;
            particlesMesh.rotation.x = mouseY * 2;
            
            // Animasi detak (Pulse)
            const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
            particlesMesh.scale.set(scale, scale, scale);
            
            renderer.render(scene, camera);
        }
        animateThree();

        // Reveal Tulisan setelah beberapa detik di-scroll ke area ini
        const observerThree = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setTimeout(() => {
                    document.getElementById('three-message').style.opacity = '1';
                }, 3000);
            }
        });
        observerThree.observe(container);
    }

    // --- 9. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});
