FROM httpd:2.4
MAINTAINER waldeckmatheusbelo

ENV ENV_DEFAULT_USER www-data

#RUN groupadd -g 1001 $ENV_DEFAULT_USER
#RUN useradd -g $ENV_DEFAULT_USER -c "User $ENV_DEFAULT_USER" $ENV_DEFAULT_USER || echo 'User already created'
#RUN usermod -u 1001 $ENV_DEFAULT_USER && groupmod -g 1001 $ENV_DEFAULT_USER

#RUN usermod -aG www-data $ENV_DEFAULT_USER

RUN chown -hR www-data:www-data /usr/local/apache2/

#setcap to bind to privileged ports as non-root
#RUN setcap 'cap_net_bind_service=+ep' /usr/local/apache2/bin/httpd
#RUN getcap /usr/local/apache2/bin/httpd

#HEALTHCHECK --interval=60s --timeout=30s CMD nc -zv localhost 80 || exit 1

USER $ENV_DEFAULT_USER
EXPOSE 8777

#ENTRYPOINT ["/usr/local/apache2/bin/httpd", "-p8777", "-D", "FOREGROUND"]
