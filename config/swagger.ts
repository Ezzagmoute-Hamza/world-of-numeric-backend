
export default {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Analytics Store Tool API",
        "description": "Analytics Store Tool Backend to allow store administrator to analyse his store in a seamless way"
    },
    "host": process.env.BASE_URL?.replace("http://", "").replace("https://", ""),
    "basePath": "/",
    "schemes": [
        "http"
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
                "parameters":{
                    "in": "query",
                    "name": "period",
                    "required": false,
                    "schema":{
                        "type": "string",
                       "enum": ["7d", "30d", "12m"]
                    }  
                },
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        }
   }
}