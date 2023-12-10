# generate an ssl cert a .cnf cert definition found in the 
openssl req -x509 -new -key ./server.key -days 365 -config ./certdef.cnf -out ./server.crt 