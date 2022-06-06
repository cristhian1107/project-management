import mysql.connector
from database.db_user import DBUser


# mydb = mysql.connector.connect(
#                                 user='development',
#                                 password='dev_pwd(001)',
#                                 host='localhost',
#                                 database='project_management'
#                               )

# mycursor = mydb.cursor(dictionary=True)
# mycursor.execute("SELECT * FROM companies")
# myresult = mycursor.fetchall()
# print (myresult)
# mycursor.callproc("users_all")
# myresult = mycursor.fetchall()
# print (myresult)
# mydb.close()

print(DBUser.login('hola', 'mundo'))
