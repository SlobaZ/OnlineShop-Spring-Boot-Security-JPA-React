CREATE USER IF NOT EXISTS jwduser IDENTIFIED BY 'pass';

DROP DATABASE IF EXISTS OnlineShopSpringBootSecurityJPAReact;
CREATE DATABASE OnlineShopSpringBootSecurityJPAReact DEFAULT CHARACTER SET utf8;

USE OnlineShopSpringBootSecurityJPAReact;

GRANT ALL ON OnlineShopSpringBootSecurityJPAReact.* TO 'jwduser'@'%';

FLUSH PRIVILEGES;
