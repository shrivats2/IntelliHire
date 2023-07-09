from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token,  get_jwt
import bcrypt
import os
from waitress import serve
from bson import ObjectId
from dotenv import load_dotenv
load_dotenv()


MONGODB_URL = os.getenv('MONGODB_URL')
APP_SECRET_KEY = os.getenv('APP_SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
app = Flask(__name__)
app.secret_key = APP_SECRET_KEY


# Connect to your MongoDB database
def MongoDB():
    client = MongoClient(MONGODB_URL)
    db_records = client.get_database('records')
    employer_records = db_records.employer
    applicant_records = db_records.applicant
    jd_records = db_records.jd
    result_records = db_records.result
    return employer_records, applicant_records, jd_records, result_records

employer_records, applicant_records, jd_records, result_records = MongoDB()

# Configure Flask JWT Extended
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

# Routes

@app.route("/", methods=['post', 'get'])
def index():
    message = ''
    if "email" in session:
        return redirect(url_for("logged_in"))

    if request.method == "POST":
        user = request.form.get("fullname")
        email = request.form.get("email")
        employer = request.form.get("employer")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

        user_found = employer_records.find_one({"name": user})
        email_found = employer_records.find_one({"email": email})

        if user_found:
            message = 'There already is a user by that name'
            return render_template('index.html', message=message)
        if email_found:
            message = 'This email already exists in the database'
            return render_template('index.html', message=message)
        if password1 != password2:
            message = 'Passwords should match!'
            return render_template('index.html', message=message)
        else:
            hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            user_input = {'name': user, 'employer': employer, 'email': email, 'password': hashed}
            employer_records.insert_one(user_input)

            user_data = employer_records.find_one({"email": email})
            new_email = user_data['email']

            # Create access token and refresh token
            access_token = create_access_token(identity=email, fresh=True)
            refresh_token = create_refresh_token(identity=email)

            return render_template('logged_in.html', email=new_email, access_token=access_token, refresh_token=refresh_token)

    return render_template('index.html')

@app.route("/login", methods=["POST", "GET"])
def login():
    message = 'Please login to your account'
    if "email" in session:
        return redirect(url_for("logged_in"))

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        email_found = employer_records.find_one({"email": email})
        if email_found:
            email_val = email_found['email']
            passwordcheck = email_found['password']

            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["email"] = email_val
                access_token = create_access_token(identity=email)
                refresh_token = create_refresh_token(identity=email)
                return render_template('logged_in.html', email=email_val, access_token=access_token, refresh_token=refresh_token)
            else:
                if "email" in session:
                    return redirect(url_for("logged_in"))
                message = 'Wrong password'
                return render_template('login.html', message=message)
        else:
            message = 'Email not found'
            return render_template('login.html', message=message)
    return render_template('login.html', message=message)

@app.route('/logged_in')
@jwt_required(fresh=True)  # Requires authentication using JWT
def logged_in():
    email = get_jwt_identity()
    return render_template('logged_in.html', email=email)

@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)  # Requires a valid refresh token
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user, fresh=False)
    return {"access_token": new_access_token}

@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "email" in session:
        session.pop("email", None)
        return render_template("signout.html")
    else:
        return redirect(url_for("login"))

@app.route('/login/<r_id>/dashboard', methods=["POST", "GET"])
def dashboard(r_id):
    if request.method == "POST":
        data = request.get_json()
        j_id = jd_records.insert_one(data).inserted_id
        return str(j_id)
    if request.method == 'GET':
        jds = []
        for x in jd_records.find({},{"_id":1, "jd":1, "weights":1, "r_id": r_id }):
            jds.append(x)
        return jsonify(jds)

# @app.route('/<j_id>', methods=["GET"])
# def job(j_id):
#     if request.method == 'GET':
#         return jsonify(jd_records.find_one({"_id":j_id }))

            


if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
    # app.run(debug=True, host='0.0.0.0', port=5000)
