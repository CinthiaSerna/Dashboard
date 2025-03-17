--- PASOS PARA LA INSTALACIÓN: ---
1. Para clonar el repositorio abriras una terminal y ejecutarás | git clone + el link http del repositorio | así se te descargará el proyecto
* Después de clonar el repositorio y abrir el proyecto te encontrarás con 2 carpetas (frontend y backend)
2. Necesitarás 2 terminales, una dirigida al backend y otra dirigida al frontend:
   
   -> .../Dashboard/backend
   
   -> .../Dashboard/frontend

* En cada terminal (en la del backend y la del frontend) ejecutaras (npm install) para que así todas las dependencias y paquetes del proyecto se instalen
* Si no tienes descargado nodemon, en la terminal del backend despues del comando de instalar ejecutarás | npm install -g nodemon |  y así descargaras nodemon de forma global
y que así al inicializar el backend todo corra correctamente
3. Para ejecutarlo:
* En la terminal dirigida al backend pondras | -> npm run dev | y así se iniciará el backend
* En la terminal dirigida al frontend pondrás | -> npm start | y así se iniciará el frontend y se abrirá en el navegador

(Es necesario que en cada una de la terminales se haya ejecutado el npm install para que todo funcione correctamete)
  
4. Ya en la página las credenciales son:
  * Usuario: cinthia
  * Contraseña: cinthia123

 Y listop, podrás disfrutar del dashboard (☆▽☆)

--- EXPLICACIÓN DE LAS METRICAS ---

* Total de tareas -> Se contarán todas las tareas que vayas agregando a la lista y así tener en cuenta cuantas tareas tienes por hacer
* Tareas finalizadas -> Se contarán todas las tareas que se tachen como finalizadas y así tener un control de las tareas que ya realizaste
* Tareas por finalizar -> Se estarán contando las tareas que aún no has tachado y así tener control con las tareas aun no realizadas
* Porcentaje de tareas realizadas VS tareas por realizar -> Con este porcentaje tendrás el control de cuantas tareas has realizado y ver tu avance,
todo con la ayuda visual del número de porcentaje y la barra que se irá llenando a medida de que taches las tareas.
