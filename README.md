
# Analytics Store Tool (API)

## Description

Une API d'analyse qui permet à un administrateur de site e-commerce d’obtenir des informations simples sur les produits les plus vendus, la répartition des ventes par catégorie, et les tendances de ventes.


## Features 

  - Retourne le montant total des ventes pour la période sélectionnée.
  - Retourne une liste des 3 produits les plus vendus, avec leur nom, quantité vendue et montant total des ventes pour chacun.
  - Retourne la répartition des ventes par catégorie, en indiquant le nombre de ventes, et le pourcentage.
  - Retourne un tableau des produits avec le nombre de ventes pour chaque produit.


### Prerequisites
- Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé (version LTS recommandée).  
- Installez [npm](https://www.npmjs.com/) en tant que gestionnaire de packages.
- Installez [Mongodb community edition](https://www.mongodb.com/docs/manual/administration/install-community/) en tant que base de données.

### Steps

1. Clonez le dépôt :
   ```bash
   git clone git@github.com:Ezzagmoute-Hamza/world-of-numeric-backend.git
   cd your-repo-name 
   ```
2. Installez les dépendances :
   ```bash
    npm install
   ```
3. Démarrez le serveur de développement :
   ```bash
   npm start
   ```
3. Cette commande permet d'initialiser la base de données avec les données nécessaires, telles que les produits et les ventes :
    ```bash
     npm run init-db 
    ```
4. Ouvrez votre navigateur et accédez à l'URL du serveur pour vérifier si l'API fonctionne correctement :
   ```bash
   http://localhost:8080/
   ```

## Enpoints

- Consultez la documentation Swagger de l'API pour plus de détails.
  - <strong>Dans l'environnement de production:</strong> [Swagger](https://world-of-numeric-backend.vercel.app/api_documentation).
  - <strong>Dans l'environnement de développement:</strong> [Swagger](http://localhost:8080/api_documentation)

