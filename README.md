<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


# FinanceFlow

FinanceFlow est une application web permettant de gérer vos relations amicales et vos transactions financières de manière simple et intuitive. Cette application offre des fonctionnalités telles que l'ajout et la suppression d'amis, la recherche dans l'historique des transactions, et la personnalisation du profil utilisateur.

## Fonctionnalités principales

1. **Gestion des amis**
   - Ajouter un ami.
   - Supprimer un ami.
   - Rechercher des amis dans votre liste.

2. **Gestion des transactions**
   - Rechercher et filtrer une transaction spécifique dans l'historique.
   - Envoyer/Recevoir de l'argent

3. **Gestion de profil**
   - Modifier votre nom, prénom ou email.
   - Changer votre photo de profil.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (v16 ou plus récent)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PHP](https://www.php.net/) (v8.1 ou plus récent)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) (v8.0 ou plus récent)
- [Docker](https://www.docker.com/) (optionnel, pour exécuter les services dans des conteneurs)

## Installation

### 1. Configuration de l'environnement backend (Laravel + Jetstream Inertia)

1. Clonez le dépôt du projet :
   ```bash
   git clone https://github.com/votre-utilisateur/financeflow.git
   cd financeflow
   ```

2. Installez les dépendances PHP :
   ```bash
   composer install
   ```

3. Créez le fichier `.env` à partir de l'exemple :
   ```bash
   cp .env.example .env
   ```

4. Configurez les variables d'environnement dans le fichier `.env` (base de données, mail, etc.) :
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=financeflow
   DB_USERNAME=root
   DB_PASSWORD=secret
   ```

5. Générez une clé d'application :
   ```bash
   php artisan key:generate
   ```

6. Exécutez les migrations et seeders :
   ```bash
   php artisan migrate --seed
   ```

7. Lancez le serveur Laravel :
   ```bash
   php artisan serve
   ```

### 2. Configuration de l'environnement frontend (React + TypeScript + Vite)

1. Rendez-vous dans le répertoire du frontend :
   ```bash
   cd frontend
   ```

2. Installez les dépendances Node.js :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez les variables d'environnement dans un fichier `.env` (si nécessaire) :
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Lancez le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

### 3. Configuration avec Docker (Optionnel)

Si vous utilisez Docker, une configuration de base avec `docker-compose.yml` est incluse :

1. Construisez et démarrez les conteneurs :
   ```bash
   docker-compose up -d
   ```

2. Exécutez les migrations dans le conteneur Laravel :
   ```bash
   docker exec -it financeflow-backend php artisan migrate --seed
   ```

## Utilisation

- Accédez à l'application via votre navigateur à l'adresse suivante :
  - Backend : `http://localhost:8000`
  - Frontend : `http://localhost:5173`

## Technologies utilisées

- **Backend :** Laravel 10, Jetstream, Sanctum
- **Frontend :** React, TypeScript, Vite
- **Base de données :** MySQL
- **Autres :** Docker, Composer, Tailwind CSS

## Contribution

1. Forkez ce dépôt.
2. Créez une branche pour votre fonctionnalité ou correction de bug :
   ```bash
   git checkout -b ma-fonctionnalite
   ```
3. Commitez vos modifications :
   ```bash
   git commit -m "Ajout de ma fonctionnalité"
   ```
4. Poussez vos modifications sur votre fork :
   ```bash
   git push origin ma-fonctionnalite
   ```
5. Créez une Pull Request vers la branche principale de ce dépôt.

## Licence

Ce projet est sous licence MIT. Veuillez consulter le fichier `LICENSE` pour plus de détails.

