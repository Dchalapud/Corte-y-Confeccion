from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

#conexion a base de datos
db = mysql.connector.connect(
    host ="localhost",
    user = "root",
    password ="",
    database ="corte&confeccion"
)

cursor = db.cursor(dictionary=True)
@app.route('/users', methods=['GET'])
def get_customer():
    cursor.execute("SELECT * FROM users")
    customer = cursor.fetchall()
    return jsonify(customer), 200

#Ejecutar Api
if __name__ == '__main__':
    app.run(debug=True)