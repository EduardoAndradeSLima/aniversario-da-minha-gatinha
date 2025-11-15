(function () {
    const startBtn = document.getElementById('startBtn');
    const hero = document.getElementById('hero');
    const cartaSection = document.getElementById('cartaSection');
    const gallerySection = document.getElementById('gallerySection');
    const finalSection = document.getElementById('finalSection');
    const typeEl = document.getElementById('typewriter');
    const shyBtn = document.getElementById('shyBtn');
    const finalText = document.getElementById('finalText');

    // PARÁGRAFOS da carta (edite aqui)
    const paragrafos = [
        `Eu nunca conheci alguém que verdadeiramente me fazia rir e me fazia feliz, até conhecer você. NÃO É EXAGERO, você consegue me fazer rir com qualquer coisa. Nos dias ruins, só de olhar pra você já aparece aquele sorriso idiota no meu rosto, como se meu cérebro entendesse que “agora tá tudo bem”.`,
        `Eu sempre falo que comecei a gostar de você em 2024, mas no fundo você sabe. Eu gostei de você bem antes disso. Lá no finalzinho de 2023 já tinha alguma coisa diferente. Um brilho, um “tchan”, tipo aquele negócio do Hotel Transilvânia KKKKASKSKW. E quando chegou 2024, pronto. Eu comecei a sentar do seu lado, a gente conversava a aula inteira e todo mundo percebeu que tinha alguma coisa menos a gente.`,
        `Em outubro veio o combo mais verdadeiro da minha vida: dia 22 eu disse que gostava de você, e dia 24 eu já estava emocionado demais e soltei um “eu te amo” muito rápido mas exatamente assim que eu me sentia, eu tinha certeza que eu te amava e eu sempre vou te amar. Aí em novembro veio nosso primeiro beijo. Em fevereiro eu te pedi em namoro. Mas a real é que eu já estava seu muito antes de você saber.`,
        `Eu nunca vou esquecer da gente indo ao cinema sem nem lembrar do filme, porque o melhor foi ir e voltar rindo no ônibus. Nem do Hopi Hari, onde eu me apaixonei mais uma vez vendo suas reações em cada uma das atrações, você soltando todos os palavrôes que você conhecia na montanha-russa ou você com medo dos atores fantasiados KAKSKASKWK, você rindo depois de tudo… juro, era impossível não me apaixonar mais.`,
        'Eu te amo, isso é 100% singelo e sincero. Você é a pessoa mais incrível, maravilhosa e estonteante que entrou na minha vida (E nunca vai sair). Eu torço pra que o mundo te dê tudo de bom, porque você merece cada pedacinho de felicidade. Obrigado por existir. Eu preciso de você. Feliz aniversário, minha gatinha.'
    ];

    // tipo máquina de escrever por parágrafo
    function typeParagraphs(pars, onDone) {
        let pIndex = 0;
        function writeNext() {
            if (pIndex >= pars.length) {
                onDone && onDone();
                return;
            }
            const text = pars[pIndex] + (pIndex < pars.length - 1 ? "\n\n" : "");
            typeText(text, () => { pIndex++; writeNext(); });
        }
        writeNext();
    }

    function typeText(text, cb) {
        let i = 0;
        const speed = 30; // ms por caractere
        function step() {
            if (i <= text.length) {
                typeEl.textContent = text.slice(0, i);
                i++;
                setTimeout(step, speed + (Math.random() * 20));
            } else {
                cb && setTimeout(cb, 300);
            }
        }
        step();
    }

    // animação simples de esconder/mostrar seções
    function showSection(el) {
        el.classList.add('show');
    }

    // ao clicar no botão inicial: esconde hero e mostra carta
    startBtn.addEventListener('click', () => {
        hero.style.transition = 'opacity .45s ease, transform .45s ease';
        hero.style.opacity = 0;
        hero.style.transform = 'translateY(-8px)';
        setTimeout(() => {
            hero.style.display = 'none';
            showSection(cartaSection);
            // start typing
            typeParagraphs(paragrafos, () => {
                // quando terminar de escrever tudo, mostrar gallery
                showSection(gallerySection);
                // rolar pra galeria (suave)
                setTimeout(() => gallerySection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
            });
        }, 420);
    });

    // botão tímido: foge do mouse pequenas vezes, depois deixa ser clicado
    (function buttonChaos() {
        const maxEscapes = 8;
        const maxClones = 5;
        let escapes = 0;
        let clones = 0;
        let tired = false;

        function randomPosition(btn) {
            const w = window.innerWidth - btn.offsetWidth;
            const h = window.innerHeight - btn.offsetHeight;
            const x = Math.random() * w;
            const y = Math.random() * h;

            btn.style.position = "fixed";
            btn.style.transition = "transform .6s cubic-bezier(.25,1,.25,1)";
            btn.style.transform = `translate(${x}px, ${y}px)`;
        }

        function createClone(original) {
            if (clones >= maxClones) return;

            clones++;

            const clone = original.cloneNode(true);
            clone.textContent = "Eu não sou o verdadeiro!";
            clone.classList.add("clone-btn");

            document.body.appendChild(clone);
            randomPosition(clone);

            clone.addEventListener("mousemove", () => randomPosition(clone));
            clone.addEventListener("click", () => {
                clone.remove();
                clones--;
            });
        }

        // Ação final preparada ANTES do clique
        function startGrandFinale() {
            const overlay = document.getElementById("grand-finale-overlay");
            const nameEl = document.getElementById("final-name");
            const msgEl = document.getElementById("final-msg");
            const photo = document.getElementById("final-photo");

            overlay.classList.add("active");

            nameEl.textContent = "Feliz aniversário, minha gatinha";

            const finalMessage =
                "Obrigado por cada riso que você colocou na minha vida.<br>" +
                "Obrigado por ser a luz nos meus dias ruins.<br>" +
                "Eu te amo por tudo o que você é.<br>" +
                "E sou muito feliz por te chamar de minha.";

            setTimeout(() => nameEl.style.opacity = "1", 900);
            setTimeout(() => msgEl.innerHTML = finalMessage, 1800);
            setTimeout(() => msgEl.style.opacity = "1", 2000);

            // foto entra depois — agora é slideshow
            setTimeout(() => {
                const photos = document.querySelectorAll(".final-photo");
                let index = 0;

                function showPhoto(i) {
                    photos.forEach((p, idx) => {
                        if (idx === i) {
                            p.style.opacity = "1";
                            p.style.filter = "blur(5px) brightness(1)";
                        } else {
                            p.style.opacity = "0";
                            p.style.filter = "blur(25px) brightness(0.8)";
                        }
                    });
                }

                showPhoto(0);

                setInterval(() => {
                    index = (index + 1) % photos.length;
                    showPhoto(index);
                }, 4000);

            }, 3200);


            setInterval(() => {
                const h = document.createElement("div");
                h.className = "heart";
                h.textContent = "❤";
                h.style.left = Math.random() * window.innerWidth + "px";
                h.style.bottom = "0px";
                document.body.appendChild(h);

                setTimeout(() => h.remove(), 4000);
            }, 800);
        }

        // Comportamento do botão
        shyBtn.addEventListener("mousemove", () => {
            if (tired) return;

            escapes++;
            randomPosition(shyBtn);

            if (escapes >= maxEscapes) {
                tired = true;

                setTimeout(() => {
                    shyBtn.style.position = "static";
                    shyBtn.style.transform = "none";
                    shyBtn.textContent = "Tá bom… clica logo";
                }, 900);
            }
        });

        shyBtn.addEventListener("click", (e) => {
            if (!tired) {
                e.preventDefault();
                createClone(shyBtn);
                return;
            }

            // Agora SIM ele chama a surpresa final
            startGrandFinale();
        });
    })();


    // confete simples (emojis)
    function launchConfetti() {
        const n = 18;
        for (let i = 0; i < n; i++) {
            const el = document.createElement('div');
            el.textContent = ['🎉', '💜', '🎂', '✨'][Math.floor(Math.random() * 4)];
            el.style.position = 'fixed';
            el.style.left = (30 + Math.random() * 60) + '%';
            el.style.bottom = '-40px';
            el.style.fontSize = (12 + Math.random() * 18) + 'px';
            el.style.pointerEvents = 'none';
            el.style.opacity = 0.95;
            el.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
            el.style.transition = `transform 1.6s cubic-bezier(.2,.9,.2,1), opacity 1.6s`;
            document.body.appendChild(el);
            setTimeout(() => {
                el.style.transform = `translateY(-420px) rotate(${Math.random() * 720}deg)`;
                el.style.opacity = 0.98;
            }, 40 + Math.random() * 200);
            setTimeout(() => el.remove(), 2000 + Math.random() * 400);
        }
    }

    // acessibilidade/teclado: Enter no botão inicial
    startBtn.addEventListener('keyup', (e) => { if (e.key === 'Enter') startBtn.click(); });

})();