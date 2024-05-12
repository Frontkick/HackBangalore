from flask import Flask, jsonify, request
import pymysql
from joblib import load
import numpy as np
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/organization/name": {"origins": "http://localhost:3000"}})

# MySQL connection details
db_host = 'localhost'
db_user = 'root'
db_password = ''
db_name = 'social_impact'

def get_db_connection():
    conn = pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        db=db_name,
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

@app.route('/organizations', methods=['GET'])
def get_organizations():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Fetch all organizations
            query = """
                SELECT o.Title, o.Image_url, o.About, o.Impact_Goals, o.Team_Expertise, o.Stage, o.Enployees, o.CEO, o.Timeline,
                       fm.Rating, fm.ROI,
                       GROUP_CONCAT(DISTINCT l.Location) AS Locations,
                       GROUP_CONCAT(DISTINCT t.type) AS Types
                FROM Organization o
                LEFT JOIN Financial_Metrics fm ON o.Financial_Metrics = fm.id
                LEFT JOIN Location l ON o.Org_id = l.Org_id
                LEFT JOIN type_of_org t ON o.Org_id = t.org_id
                GROUP BY o.Org_id;
            """
            cursor.execute(query)
            organizations = cursor.fetchall()
    finally:
        conn.close()

    return jsonify(organizations)

@app.route('/organization/name', methods=['POST'])
def get_organization_by_name():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Fetch a specific organization by name
            org_name = request.json.get('name')
            query = """
                SELECT o.Title, o.Image_url, o.About, o.Impact_Goals, o.Team_Expertise, o.Stage, o.Enployees, o.CEO, o.Timeline,
                       fm.Rating, fm.ROI,
                       GROUP_CONCAT(DISTINCT l.Location) AS Locations,
                       GROUP_CONCAT(DISTINCT t.type) AS Types
                FROM Organization o
                LEFT JOIN Financial_Metrics fm ON o.Financial_Metrics = fm.id
                LEFT JOIN Location l ON o.Org_id = l.Org_id
                LEFT JOIN type_of_org t ON o.Org_id = t.org_id
                WHERE o.Title = %s
                GROUP BY o.Org_id;
            """
            cursor.execute(query, (org_name,))
            organization = cursor.fetchone()
    finally:
        conn.close()

    if organization:
        return jsonify(organization)
    else:
        return jsonify({'error': 'Organization not found'}), 404

@app.route('/organization/location', methods=['POST'])
def get_organization_by_location():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Fetch organizations by location
            location = request.json.get('location')
            query = """
                SELECT o.Title, o.Image_url, o.About, o.Impact_Goals, o.Team_Expertise, o.Stage, o.Enployees, o.CEO, o.Timeline,
                       fm.Rating, fm.ROI,
                       GROUP_CONCAT(DISTINCT l.Location) AS Locations,
                       GROUP_CONCAT(DISTINCT t.type) AS Types
                FROM Organization o
                LEFT JOIN Financial_Metrics fm ON o.Financial_Metrics = fm.id
                LEFT JOIN Location l ON o.Org_id = l.Org_id
                LEFT JOIN type_of_org t ON o.Org_id = t.org_id
                WHERE l.Location LIKE %s
                GROUP BY o.Org_id;
            """
            cursor.execute(query, (f'{location}%',))
            organizations = cursor.fetchall()
    finally:
        conn.close()

    if organizations:
        return jsonify(organizations)
    else:
        return jsonify({'error': 'No organizations found with the specified location'}), 404

@app.route('/organization/rating', methods=['POST'])
def get_organization_by_rating():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            # Fetch organizations by rating
            rating = request.json.get('rating')
            query = """
                SELECT o.Title, o.Image_url, o.About, o.Impact_Goals, o.Team_Expertise, o.Stage, o.Enployees, o.CEO, o.Timeline,
                       fm.Rating, fm.ROI,
                       GROUP_CONCAT(DISTINCT l.Location) AS Locations,
                       GROUP_CONCAT(DISTINCT t.type) AS Types
                FROM Organization o
                LEFT JOIN Financial_Metrics fm ON o.Financial_Metrics = fm.id
                LEFT JOIN Location l ON o.Org_id = l.Org_id
                LEFT JOIN type_of_org t ON o.Org_id = t.org_id
                WHERE fm.Rating > %s
                GROUP BY o.Org_id;
            """
            cursor.execute(query, (rating,))
            organizations = cursor.fetchall()
    finally:
        conn.close()

    if organizations:
        return jsonify(organizations)
    else:
        return jsonify({'error': 'No organizations found with the specified rating'}), 404
    
@app.route('/register/investor', methods=['POST'])
def register_investor():
    try:
        data = request.json
        name = data['name']
        contact_no = data.get('contact_no')
        mail_id = data.get('mail_id')
        projects_invested = data.get('projects_invested')
        type_of_investor = data.get('type_of_investor')
        address = data.get('address')
        registration_date = data.get('registration_date')

        # Inserting data into the Investor table
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO Investor (Name, contact_no, mail_id, Projects_invested, type_of_investor, Address, Registration_date) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (name, contact_no, mail_id, projects_invested, type_of_investor, address, registration_date))
            connection.commit()
        connection.close()

        return jsonify({'message': 'Investor registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint to register organizations
@app.route('/register/organization', methods=['POST'])
def register_organization():
    try:
        data = request.json
        title = data['title']
        image_url = data.get('image_url')
        about = data.get('about')
        impact_goals = data.get('impact_goals')
        team_expertise = data.get('team_expertise')
        stage = data.get('stage')
        enployees = data.get('enployees')
        ceo = data.get('ceo')
        timeline = data.get('timeline')
        financial_metrics = data.get('financial_metrics')
        rating = data.get('rating')
        roi = data.get('roi')
        type = data.get('type')
        location = data.get('location')

        # Inserting data into the Organization table
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO Organization (Title, Image_url, About, Impact_Goals, Team_Expertise, Stage, Enployees, CEO, Timeline, Financial_Metrics) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (title, image_url, about, impact_goals, team_expertise, stage, enployees, ceo, timeline, financial_metrics))
            org_id = cursor.lastrowid
            
            # Inserting data into the Financial_Metrics table
            sql = "INSERT INTO Financial_Metrics (org_id, Rating, ROI) VALUES (%s, %s, %s)"
            cursor.execute(sql, (org_id, rating, roi))
            
            # Inserting data into the type_of_org table
            sql = "INSERT INTO type_of_org (org_id, type) VALUES (%s, %s)"
            cursor.execute(sql, (org_id, type))
            
            # Inserting data into the Location table
            sql = "INSERT INTO Location (Org_id, Location) VALUES (%s, %s)"
            cursor.execute(sql, (org_id, location))
            
            connection.commit()
        connection.close()

        return jsonify({'message': 'Organization registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

def extract_float_values(dict_list):
    float_values = []
    for d in dict_list:
        for value in d.values():
            if isinstance(value, float):
                float_values.append(value)
    return float_values

def extract_financial_metrics_for_organization(organization_title):
    conn = get_db_connection()

    try:
        with conn.cursor() as cursor:
            # SQL query to extract financial metrics for a specific organization
            sql = """
                SELECT o.Title, f.currentRatio, f.quickRatio, f.cashRatio, f.daysOfSalesOutstanding,
                       f.netProfitMargin, f.pretaxProfitMargin, f.grossProfitMargin, f.operatingProfitMargin,
                       f.returnOnAssets, f.returnOnCapitalEmployed, f.returnOnEquity, f.assetTurnover,
                       f.fixedAssetTurnover, f.debtEquityRatio, f.debtRatio, f.effectiveTaxRate,
                       f.freeCashFlowOperatingCashFlowRatio, f.freeCashFlowPerShare, f.cashPerShare,
                       f.companyEquityMultiplier, f.ebitPerRevenue, f.enterpriseValueMultiple,
                       f.operatingCashFlowPerShare, f.operatingCashFlowSalesRatio, f.payablesTurnover
                FROM financial_metrics f
                INNER JOIN organization o ON f.org_id = o.Org_id
                WHERE o.Title = %s
            """
            cursor.execute(sql, (organization_title,))
            result = cursor.fetchall()

            # Extracting data into a list of dictionaries
            x=extract_float_values(result)
            

    finally:
        conn.close()

    return x

def predict_with_pca(input_features):
    
    pca_model = load('pca_model.joblib')

    
    rf_model = load('rf_model.joblib')

    
    input_pca = pca_model.transform(input_features.reshape(1, -1))

    
    predicted_rating = rf_model.predict(input_pca)

    

    return predicted_rating[0]

column_list =['currentRatio', 'quickRatio', 'cashRatio', 'daysOfSalesOutstanding',
       'netProfitMargin', 'pretaxProfitMargin', 'grossProfitMargin',
       'operatingProfitMargin', 'returnOnAssets', 'returnOnCapitalEmployed',
       'returnOnEquity', 'assetTurnover', 'fixedAssetTurnover',
       'debtEquityRatio', 'debtRatio', 'effectiveTaxRate',
       'freeCashFlowOperatingCashFlowRatio', 'freeCashFlowPerShare',
       'cashPerShare', 'companyEquityMultiplier', 'ebitPerRevenue',
       'enterpriseValueMultiple', 'operatingCashFlowPerShare',
       'operatingCashFlowSalesRatio', 'payablesTurnover']

def extract_rating(organization_title):
    
    financial_metrics_data = extract_financial_metrics_for_organization(organization_title)
    x= [financial_metrics_data]
    #for x in column_list:
    #   for i in range(25):
    #     print(f" Enter {x}:)
    #     inp =float(input())
    #     lst1.append(inp)
    arr=np.array(x)
    return predict_with_pca(arr)
# organization_title = "Green Initiatives"
# print(extract_rating(organization_title))

@app.route('/extract_rating_out', methods=['POST'])
def extract_rating_out():
    data = request.json
    input_string = data['input_string']
    res = extract_rating(input_string)
    return jsonify({"res":res})

if __name__ == '__main__':
    app.run(debug=True)