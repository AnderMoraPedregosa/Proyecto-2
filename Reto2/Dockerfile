FROM php:8.0.0-apache

# Configuración para evitar interacción durante la instalación de paquetes
ARG DEBIAN_FRONTEND=noninteractive

# Instalar extensiones necesarias
RUN docker-php-ext-install pdo_mysql
RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip

# Habilitar el módulo de Apache
RUN a2enmod rewrite

# Crear el directorio para imágenes y asignar permisos
RUN mkdir /var/www/html/imagenes
RUN chmod 777 /var/www/html/imagenes

# Reiniciar Apache
RUN service apache2 restart