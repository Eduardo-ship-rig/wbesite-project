markdown
# 📘 Deploy en Netlify — Comandos, selecciones y explicación

## 🔧 Comandos

```powershell
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Iniciar sesión
netlify login

# 3. Inicializar el proyecto
netlify init
Selecciones durante netlify init (en orden exacto)
Cuando ejecutes netlify init, la terminal te irá preguntando lo siguiente. Debes elegir con las flechas del teclado y presionar Enter:

#	Pregunta que aparece	Qué seleccionar
1	Do you want to create a Netlify project without a git repository?	No, I will connect this directory with GitHub first
2	What would you like to do?	Create & configure a new project
3	Team:	Cesar
4	Project name (leave blank for a random name; you can change it later):	farmacianew34
powershell
# 4. Publicar en producción
netlify deploy --prod
