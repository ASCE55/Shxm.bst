// Loading Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 1200); // Remove completely after slide up
        }
    }, 1800); // fixed duration instead of waiting for heavy assets
});

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Background Music Logic
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicText = musicBtn ? musicBtn.querySelector('.music-text') : null;
    let isPlaying = false;
    let noteInterval;

    if (bgMusic && musicBtn && musicText) {
        bgMusic.volume = 0.15; // Kept volume very low and subtle
        
        const createMusicNote = () => {
            const note = document.createElement('div');
            note.classList.add('music-note');
            const notes = ['🎵', '🎶', '✨', '💖', '🌸'];
            note.innerText = notes[Math.floor(Math.random() * notes.length)];
            document.body.appendChild(note);

            // GSAP Floating Animation for Notes
            gsap.fromTo(note, 
                { x: 0, y: 0, opacity: 1, scale: 0.5, rotation: (Math.random() - 0.5) * 45 },
                { 
                    x: (Math.random() - 0.5) * 100 - 50, // Drift left or right randomly
                    y: -150 - Math.random() * 100, // Float UPwards
                    opacity: 0, 
                    scale: 1.5, 
                    rotation: (Math.random() - 0.5) * 90, 
                    duration: 2 + Math.random(), 
                    ease: "power1.out",
                    onComplete: () => note.remove()
                }
            );
        };

        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicText.innerText = 'Play Music';
                musicBtn.classList.remove('playing');
                clearInterval(noteInterval);
                isPlaying = false;
            } else {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
                musicText.innerText = 'Vibing...';
                musicBtn.classList.add('playing');
                createMusicNote(); // Make one immediately
                noteInterval = setInterval(createMusicNote, 600);
                isPlaying = true;
            }
        });
    }

    // 0. Fill background with constant animated sparkles and stars
    const bujoBg = document.querySelector('.bujo-bg');
    const shapes = ['✨', '🌟', '💖', '🌸'];
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('bg-particle');
        particle.innerText = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Random placement
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.fontSize = `${Math.random() * 15 + 10}px`;
        particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        bujoBg.appendChild(particle);
    }

    // 0.5. Glowing Butterflies Animation (Flying + Scrolling)
    const butterflies = gsap.utils.toArray('.css-butterfly');
    
    // Continuous floating/flying animation
    butterflies.forEach((bf, index) => {
        // Random infinite floating
        gsap.to(bf, {
            y: "random(-100, 100)",
            x: "random(-100, 100)",
            rotation: "random(-20, 20)",
            duration: "random(4, 8)",
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    });

    // Scroll-triggered movement
    gsap.to('.fb-1', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
        y: "80vh", x: "40vw", rotation: 45, ease: 'none'
    });
    gsap.to('.fb-2', {
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 },
        y: "-50vh", x: "-60vw", rotation: -30, ease: 'none'
    });

    // 1. Reveal Animations for main elements
    const revealElements = document.querySelectorAll('.gs-reveal');

    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            rotation: () => (Math.random() - 0.5) * 8, // slight random tilt
            scale: 0.9,
            duration: 1.5,
            ease: 'elastic.out(1, 0.75)' // bouncy premium feel
        });
    });

    // 1.2 Custom Animation for 1st Card Section
    const firstCardSection = document.getElementById('first-card-section');
    const firstPhoto = document.getElementById('first-card-photo');
    const firstNote = document.getElementById('first-card-note');

    if (firstCardSection && firstPhoto && firstNote) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: firstCardSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Photo drops down and swings into place
        tl.from(firstPhoto, {
            y: -150,
            rotation: -15,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
        }, 0);

        // Note slaps in from the right
        tl.from(firstNote, {
            x: 200,
            y: 50,
            rotation: 20,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, 0.3);

        // Continuous floating effect after reveal
        tl.add(() => {
            gsap.to(firstPhoto, {
                y: -10,
                rotation: 1, // subtle float
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
            gsap.to(firstNote, {
                y: 15,
                rotation: -1,
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 0.5
            });
        });
    }

    // 1.5. Clothesline Drop In
    gsap.from('.clothesline', {
        y: -150,
        opacity: 0,
        duration: 1.5,
        ease: 'bounce.out',
        delay: 0.5
    });

    // 2. Animate Pushpins popping in
    gsap.utils.toArray('.pushpin').forEach((pin) => {
        gsap.from(pin, {
            scrollTrigger: {
                trigger: pin,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            rotation: 180,
            duration: 0.6,
            ease: 'back.out(2)',
            delay: 0.5 // pop in after the paper reveals
        });
    });

    // 3. Animate Washi Tapes and Paperclips slapping on
    gsap.utils.toArray(['.washi', '.paperclip']).forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.8
        });
    });

    // 4. Animate SVG Doodles drawing themselves
    gsap.utils.toArray('.doodle').forEach((doodle) => {
        const path = doodle.querySelector('path');
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            
            gsap.to(path, {
                scrollTrigger: {
                    trigger: doodle,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.5
            });
        }
    });

    // 5. Parallax Floating for Meme Stickers
    gsap.utils.toArray('.meme-sticker').forEach((sticker) => {
        gsap.to(sticker, {
            scrollTrigger: {
                trigger: sticker,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            },
            y: -80,
            rotation: "+=15",
            ease: 'none'
        });
    });

    // 6. Secret Button Logic
    const secretBtn = document.getElementById('secret-btn');
    const secretMsg = document.getElementById('secret-message');

    if (secretBtn && secretMsg) {
        secretBtn.addEventListener('click', () => {
            secretBtn.style.display = 'none';
            secretMsg.classList.remove('hidden');
            
            // Pop animation for the secret message
            gsap.from(secretMsg, {
                scale: 0.5,
                opacity: 0,
                rotation: -5,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });

            createConfetti();
        });
    }

    // Confetti logic for Secret Button
    function createConfetti() {
        const popTexts = ['HAPPY!', '💖', 'YAY!', 'BESTIE!', '🎂', '🎉', 'SHARMILA!'];
        
        for (let i = 0; i < 60; i++) {
            const el = document.createElement('div');
            el.innerText = popTexts[Math.floor(Math.random() * popTexts.length)];
            el.style.position = 'fixed';
            el.style.left = '50%';
            el.style.bottom = '10%'; // Start from bottom center (pop up)
            el.style.transform = 'translateX(-50%)';
            el.style.fontSize = el.innerText.length > 2 ? `${Math.random() * 15 + 20}px` : `${Math.random() * 20 + 20}px`;
            el.style.fontFamily = "'Caveat', cursive";
            el.style.fontWeight = "bold";
            el.style.color = Math.random() > 0.5 ? '#ff6b81' : '#ffb7b2';
            if(el.innerText.length > 2) {
                el.style.background = '#fff';
                el.style.padding = '5px 10px';
                el.style.borderRadius = '10px';
                el.style.border = '2px solid #ffb7b2';
            }
            el.style.pointerEvents = 'none';
            el.style.zIndex = '9999';
            document.body.appendChild(el);

            // Pop UP then FALL DOWN physics using GSAP
            gsap.fromTo(el, 
                { 
                    x: 0, 
                    y: 0, 
                    scale: 0, 
                    rotation: 0 
                },
                {
                    x: (Math.random() - 0.5) * window.innerWidth * 1.2, // spread wide
                    y: -(Math.random() * window.innerHeight * 0.8 + 200), // shoot UP
                    scale: 1,
                    rotation: (Math.random() - 0.5) * 720,
                    duration: 1.5,
                    ease: 'power3.out',
                    onComplete: () => {
                        // After shooting UP, fall DOWN
                        gsap.to(el, {
                            y: window.innerHeight + 100, // fall past bottom
                            rotation: "+=360",
                            duration: Math.random() * 2 + 1.5,
                            ease: 'power1.in',
                            onComplete: () => el.remove()
                        });
                    }
                }
            );
        }
    }

    // 7. Magical Mouse Trail (Girly aesthetic)
    document.addEventListener('mousemove', (e) => {
        // Only create a sparkle very rarely to avoid cluttering the screen
        if (Math.random() > 0.05) return;

        const trail = document.createElement('div');
        trail.classList.add('mouse-trail');
        const icons = ['✨', '💖', '🌸', '🎀'];
        trail.innerText = icons[Math.floor(Math.random() * icons.length)];
        
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        
        document.body.appendChild(trail);

        // Animate the trail floating down and fading out
        gsap.to(trail, {
            y: 50,
            x: (Math.random() - 0.5) * 50,
            rotation: (Math.random() - 0.5) * 90,
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            ease: 'power1.out',
            onComplete: () => trail.remove()
        });
    });


    // 9. Scratch to Reveal Logic
    const canvas = document.getElementById('scratch-pad');
    const secretContent = document.getElementById('secret-content');

    if (canvas && secretContent) {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;

        function initScratch() {
            canvas.width = secretContent.clientWidth || 300;
            canvas.height = secretContent.clientHeight || 300;

            // Fill canvas with aesthetic scratch-off material
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#b5c0d0'; // cool gray-blue
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add some text instruction on the canvas
            ctx.font = '28px Caveat';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('Scratch here!', canvas.width/2, canvas.height/2);

            // Set blend mode to erase
            ctx.globalCompositeOperation = 'destination-out';
        }

        // Initialize immediately since it's just a div container now
        initScratch();
        // Fallback timeout in case fonts or layouts shift
        setTimeout(initScratch, 500);

        // Re-init on window resize to fix stretching
        window.addEventListener('resize', () => {
            setTimeout(initScratch, 200); 
        });

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            // Handle both touch and mouse
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        let isRevealed = false;
        let scratchCount = 0;

        function checkReveal() {
            if (isRevealed) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentCount = 0;
            // Check every 4th pixel (alpha channel). We step by 16 to check fewer pixels for performance
            for (let i = 3; i < pixels.length; i += 16) {
                if (pixels[i] === 0) {
                    transparentCount++;
                }
            }
            const transparentPercentage = (transparentCount / (pixels.length / 16)) * 100;
            if (transparentPercentage > 40) {
                isRevealed = true;
                gsap.to(canvas, { opacity: 0, duration: 0.8, onComplete: () => {
                    canvas.style.display = 'none';
                    // Optional pop animation for the image
                    gsap.fromTo('#secret-content img', { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
                } });
            }
        }

        function scratch(e) {
            if (!isDrawing || isRevealed) return;
            
            // Only prevent default on touch to stop scrolling while scratching
            if(e.type.includes('touch')) e.preventDefault(); 
            
            const pos = getMousePos(e);
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2); // 30px brush size
            ctx.fill();

            scratchCount++;
            if (scratchCount % 5 === 0) {
                checkReveal();
            }
        }

        // Mouse events
        canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => { isDrawing = false; });

        // Touch events
        canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
        canvas.addEventListener('touchmove', scratch, { passive: false });
        window.addEventListener('touchend', () => { isDrawing = false; });
    }

    // 10. Wish Modal & Email Sending Logic
    const wishBtn = document.getElementById('open-wish-modal');
    const wishModal = document.getElementById('wish-modal');
    const closeWishBtn = document.getElementById('close-wish-modal');
    const sendWishBtn = document.getElementById('send-wish-btn');
    const wishMessage = document.getElementById('wish-message');
    const wishStatus = document.getElementById('wish-status');

    if (wishBtn && wishModal) {
        wishBtn.addEventListener('click', () => {
            wishModal.classList.add('active');
            wishStatus.style.display = 'none';
            wishMessage.value = '';
            sendWishBtn.innerText = 'Send Wish 💌';
        });

        closeWishBtn.addEventListener('click', () => {
            wishModal.classList.remove('active');
        });

        // Close on clicking outside
        wishModal.addEventListener('click', (e) => {
            if(e.target === wishModal) wishModal.classList.remove('active');
        });

        const wishForm = document.getElementById('wish-form');
        
        if (wishForm) {
            wishForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Stop page reload
                
                const msg = wishMessage.value.trim();
                if(!msg) return;

                sendWishBtn.innerText = 'Sending... ⏳';
                
                // Discord Webhook Logic (Direct)
                const webhookUrl = "https://discord.com/api/webhooks/1502880562480808078/s5H4pjSyf5FpAQvsLTOnm6M-pbjuRGT21lzqZpgL8E1wxhYgGEhUXdd-yObdfp7yC_Si";
                
                fetch(webhookUrl, {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: `✨ **New Birthday Wish from Sharmila!** ✨\n\n💌 **Message:**\n>>> ${msg}`
                    })
                })
                .then(response => {
                    if (response.ok) {
                        sendWishBtn.innerText = 'Sent! 💖';
                        wishStatus.innerText = "Wish sent successfully! 🌟";
                        wishStatus.style.color = "var(--hot-pink)";
                        wishStatus.style.display = "block";
                        
                        createConfetti(); // Pop confetti for celebration
                        
                        setTimeout(() => {
                            wishModal.classList.remove('active');
                            wishMessage.value = ''; // clear input
                        }, 3000);
                    } else {
                        throw new Error('Failed to send');
                    }
                })
                .catch(error => {
                    sendWishBtn.innerText = 'Send Wish 💌';
                    wishStatus.innerText = "Oops! Error sending.";
                    wishStatus.style.color = "red";
                    wishStatus.style.display = "block";
                    alert("Webhook Error: " + error.message);
                    console.log(error);
                });
            });
        }
    }
});
