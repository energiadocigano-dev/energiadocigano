from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app) # Permite que o seu site HTML acesse esta API

DB_PATH = 'usuarios.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            bloqueado INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', (nome, email, senha))
        conn.commit()
        return jsonify({"success": True, "message": "Usuário cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "E-mail já cadastrado!"}), 400
    finally:
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT nome, email, bloqueado FROM usuarios WHERE email = ? AND senha = ?', (email, senha))
    user = cursor.fetchone()
    conn.close()

    if user:
        if user[2] == 1:
            return jsonify({"success": False, "message": "Usuário bloqueado!"}), 403
        return jsonify({
            "success": True, 
            "user": {"nome": user[0], "email": user[1]}
        })
    else:
        return jsonify({"success": False, "message": "E-mail ou senha incorretos!"}), 401

@app.route('/admin/usuarios', methods=['GET'])
def listar_usuarios():
    # Em produção, adicione uma verificação de token/senha aqui
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT nome, email, senha, bloqueado FROM usuarios')
    users = cursor.fetchall()
    conn.close()

    lista = []
    for u in users:
        lista.append({"nome": u[0], "email": u[1], "senha": u[2], "bloqueado": bool(u[3])})
    
    return jsonify(lista)

@app.route('/admin/bloquear', methods=['POST'])
def alternar_bloqueio():
    data = request.json
    email = data.get('email')
    bloquear = data.get('bloquear') # booleano

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('UPDATE usuarios SET bloqueado = ? WHERE email = ?', (1 if bloquear else 0, email))
    conn.commit()
    conn.close()
    
    return jsonify({"success": True})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
