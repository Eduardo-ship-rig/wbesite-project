   /* ══════════════════════════════════════════════════════════
           SOMBRA ANIMADA — JS
           ══════════════════════════════════════════════════════════ */
        (() => {
            'use strict';

            const cont = document.getElementById('fondo-salud');
            const canvas = cont.querySelector('canvas');
            const ctx = canvas.getContext('2d');

            /* ── Configuración ── */
            const CFG = {
                azulCursor: [46, 134, 168],
                verdeCursor: [58, 178, 132],
                fadeEstela: 0.045,
                suavAzul: 6.0,
                suavVerde: 2.2
            };

            const reduceMov = matchMedia('(prefers-reduced-motion: reduce)').matches;
            const comp = reduceMov ? 1.8 : 1;
            const FADE = reduceMov ? 0.14 : CFG.fadeEstela;

            /* ── Estado ── */
            let w = 0, h = 0, baseR = 240, frame = 0;

            const puntero = { x: innerWidth / 2, y: innerHeight / 2 };
            const azul = { x: puntero.x, y: puntero.y };
            const verde = { x: puntero.x, y: puntero.y };
            const vel = { x: 0, y: 0 };
            let presion = 1, presionObj = 1;
            let tPrev = performance.now();

            /* ── Utilidades ── */
            const expo = (cur, obj, lambda, dt) =>
                cur + (obj - cur) * (1 - Math.exp(-lambda * dt));

            const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

            const mancha = (x, y, r, c, a) => {
                const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                g.addColorStop(0, rgba(c, a));
                g.addColorStop(0.55, rgba(c, a * 0.42));
                g.addColorStop(1, rgba(c, 0));
                ctx.fillStyle = g;
                ctx.fillRect(x - r, y - r, r * 2, r * 2);
            };

            function redimensionar() {
                w = innerWidth; h = innerHeight;
                const dpr = Math.min(devicePixelRatio || 1, 1.5);
                canvas.width = Math.round(w * dpr);
                canvas.height = Math.round(h * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                baseR = Math.max(170, Math.min(330, Math.min(w, h) * 0.30));
            }

            /* ── Eventos ── */
            addEventListener('resize', redimensionar);

            addEventListener('pointermove', e => {
                puntero.x = e.clientX; puntero.y = e.clientY;
            }, { passive: true });

            addEventListener('pointerdown', e => {
                puntero.x = e.clientX; puntero.y = e.clientY;
                presionObj = 1.55;
            });

            addEventListener('pointerup', () => { presionObj = 1; });
            addEventListener('pointercancel', () => { presionObj = 1; });

            addEventListener('pointerout', e => {
                if (!e.relatedTarget) { puntero.x = w / 2; puntero.y = h / 2; }
            });
            addEventListener('blur', () => { puntero.x = w / 2; puntero.y = h / 2; });

            /* ── Bucle principal ── */
            function cuadro(tNow) {
                const dt = Math.min((tNow - tPrev) / 1000, 0.05);
                tPrev = tNow;
                const tf = tNow * 0.001;
                frame++;

                /* 1 · Desvanecer estela */
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fillStyle = `rgba(0,0,0,${FADE})`;
                ctx.fillRect(0, 0, w, h);
                if (frame % 10 === 0) {
                    ctx.fillStyle = 'rgba(0,0,0,0.08)';
                    ctx.fillRect(0, 0, w, h);
                }
                ctx.globalCompositeOperation = 'source-over';

                /* 2 · Seguimiento suave */
                const ax0 = azul.x, ay0 = azul.y;
                azul.x = expo(azul.x, puntero.x, CFG.suavAzul, dt);
                azul.y = expo(azul.y, puntero.y, CFG.suavAzul, dt);
                verde.x = expo(verde.x, azul.x, CFG.suavVerde, dt);
                verde.y = expo(verde.y, azul.y, CFG.suavVerde, dt);

                vel.x = expo(vel.x, (azul.x - ax0) / Math.max(dt, 1e-4), 8, dt);
                vel.y = expo(vel.y, (azul.y - ay0) / Math.max(dt, 1e-4), 8, dt);
                vel.x = Math.max(-2500, Math.min(2500, vel.x));
                vel.y = Math.max(-2500, Math.min(2500, vel.y));
                const rapidez = Math.hypot(vel.x, vel.y);
                const sepX = Math.max(-46, Math.min(46, vel.x * 0.028));
                const sepY = Math.max(-46, Math.min(46, vel.y * 0.028));

                presion = expo(presion, presionObj, 8, dt);
                const brillo = 1 + Math.min(rapidez / 2600, 0.55);
                const respira = 1 + (reduceMov ? 0 : Math.sin(tf * 2.1) * 0.05);
                const R = baseR * presion * respira;

                /* 3 · Sombra azul */
                mancha(azul.x - sepX, azul.y - sepY, R,
                    CFG.azulCursor, 0.014 * comp * brillo * (1 + (presion - 1) * 0.55));

                /* 4 · Sombra verde */
                mancha(verde.x + sepX * 1.4, verde.y + sepY * 1.4, R * 0.94,
                    CFG.verdeCursor, 0.011 * comp * brillo * (1 + (presion - 1) * 0.55));

                requestAnimationFrame(cuadro);
            }

            /* ── Arranque ── */
            redimensionar();
            requestAnimationFrame(cuadro);
        })();