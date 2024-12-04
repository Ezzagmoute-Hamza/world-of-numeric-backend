import dotenv from "dotenv";
dotenv.config();

export default {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Analytics Store Tool API Documentation",
        "description": "Analytics Store Tool That allows the store administrator to analyse his store in a seamless way"
    },
    "host": process.env.BASE_URL?.replace("http://", "").replace("https://", ""),
    "basePath": "/",
    "schemes": [
        "http","https"
    ],
   "paths":{
        "/products": {
            "get": {
                "description": "",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/analytics/category_sales": {
            "get": {
                "description": "Retourne la répartition des ventes par catégorie en indiquant le nombre de ventes, et le pourcentage.",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/analytics/trending_products": {
            "get": {
                "description": "Retourne une liste des 3 produits les plus vendus, avec leur nom, quantité vendue et montant total des ventes pour chacun.",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/analytics/total_sales": {
        "get": {
            "description": "Retourne le montant total des ventes pour la période sélectionnée.",
            "parameters": [
            {
                "name": "period",
                "in": "query",
                "required": false,
                "schema": {
                "type": "string",
                "enum": ["7d", "30d", "12m"]
                },
                "description": "Spécifiez la période pour le montant total des ventes. Exemple : '7d' pour les 7 derniers jours, '30d' pour les 30 derniers jours, '12m' pour les 12 derniers mois."
            }
            ],
            "responses": {
            "200": {
                "description": "Retourne le montant total des ventes pour la période sélectionnée."
            }
            }
        }
        }
   }
}