from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Permite solicitudes de cualquier origen

# Conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="corte&confeccion"
)

cursor = db.cursor(dictionary=True)

# Endpoint para obtener usuarios (ejemplo básico)
@app.route('/users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    return jsonify(users), 200

# Endpoint de inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json  # Recibir datos del frontend
    username = data.get('username')
    password = data.get('password')
    
    # Validar que se envíen ambos campos
    if not username or not password:
        return jsonify({"error": "Usuario y contraseña son requeridos"}), 400
    
    # Buscar el usuario en la base de datos
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    
    if user:
        # Validar la contraseña (asumiendo que está almacenada como hash)
        if check_password_hash(user['password_hash'], password):
            return jsonify({
                "message": f"Bienvenido {user['username']}!",
                "user_id": user['id'],
                "username": user['username']
            }), 200
        else:
            return jsonify({"error": "Contraseña incorrecta"}), 401
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

# Ejecutar la API
if __name__ == '__main__':
    app.run(debug=True)
